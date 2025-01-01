import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private http: HttpClient) { }

  // Realiza la búsqueda a nivel nacional en Colombia
  search(query: string): Observable<any[]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=CO`;
    return this.http.get<any[]>(url);
  }
}
