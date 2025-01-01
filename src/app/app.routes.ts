import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { MisRutasComponent } from './mis-rutas/mis-rutas.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: NoEncontradoComponent},
    {path: 'misrutas', component: MisRutasComponent},
];
