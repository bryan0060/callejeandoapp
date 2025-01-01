import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Importar RouterModule
import { routes } from './app/app.routes';  // Importar las rutas
import { AppComponent } from './app/app.component';

// Usar RouterModule con las rutas directamente en bootstrapApplication
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes))  // Configurar el enrutamiento
  ]
});
