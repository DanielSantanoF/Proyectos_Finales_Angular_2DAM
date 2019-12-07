import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfesoresListadoComponent } from './profesores-listado/profesores-listado.component';
import { HistoricoProfesoresListadoComponent } from './historico-profesores-listado/historico-profesores-listado.component';
import { AulasListadoComponent } from './aulas-listado/aulas-listado.component';
import { DisposicionesListadoComponent } from './disposiciones-listado/disposiciones-listado.component';
import { DisposicionesProfesoresListadoComponent } from './disposiciones-profesores-listado/disposiciones-profesores-listado.component';
import { SustitucionesListadoComponent } from './sustituciones-listado/sustituciones-listado.component';
import { SustitucionesPdfMakeComponent } from './sustituciones-pdf-make/sustituciones-pdf-make.component';

export const DashboardRoutes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'profesores', component: ProfesoresListadoComponent},
  { path: 'historicoProfesores', component: HistoricoProfesoresListadoComponent},
  { path: 'aulas', component: AulasListadoComponent},
  { path: 'disposiciones', component: DisposicionesListadoComponent},
  { path: 'disposicionesProfesores', component: DisposicionesProfesoresListadoComponent},
  { path: 'sustituciones', component: SustitucionesListadoComponent},
  { path: 'generarPdfSustituciones', component: SustitucionesPdfMakeComponent}
];
