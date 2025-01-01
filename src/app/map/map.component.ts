import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeocodingService } from '../services/geocoding.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private searchSubject: Subject<string> = new Subject<string>();  // Observable para la búsqueda
  public suggestions: any[] = [];  // Para almacenar las sugerencias de búsqueda

  constructor(private geocodingService: GeocodingService) {}

  ngOnInit(): void {
    this.initMap();

    // Suscripción para manejar las búsquedas con debounce (espera entre entradas)
    this.searchSubject.pipe(
      debounceTime(500),  // Espera 500ms después de que el usuario deje de escribir
      switchMap((query) => this.geocodingService.search(query))  // Llama al servicio para obtener resultados
    ).subscribe((results) => {
      // Filtrar los resultados que contienen "Antioquia" en su nombre
      this.suggestions = results.filter(result => result.display_name.toLowerCase().includes('antioquia'));
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([6.2442, -75.5812], 13); // Coordenadas de Medellín

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  // Este método se llama cuando el usuario escribe algo en la barra de búsqueda
  searchAddress(event: any): void {
    const query = event.target.value;  // Captura lo que el usuario escribe
    if (query.trim()) {
      this.searchSubject.next(query);  // Emite la consulta para obtener sugerencias
    } else {
      this.suggestions = [];  // Limpia las sugerencias cuando no hay texto
    }
  }

  // Este método se llama cuando el usuario selecciona una sugerencia
  selectSuggestion(location: any): void {
    
    this.map.setView([location.lat, location.lon], 15);  // Centra el mapa en la sugerencia
    const marker = L.marker([location.lat, location.lon]);
    marker.bindPopup(location.display_name).openPopup();
    marker.addTo(this.map);
    this.suggestions = [];  // Limpia las sugerencias después de seleccionar

    // ESTOS METODOS NO FUNCIONAN, AUN FALTA SABER COMO ELIMINAR LOS MARCADORES Y NO QUE SE QUEDEN MARCADOS SIEMPRE
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
  }
}
