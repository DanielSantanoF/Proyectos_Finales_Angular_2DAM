import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TurnosListadoComponent } from './turnos-listado/turnos-listado.component';
import { ModalidadesListadoComponent } from './modalidades-listado/modalidades-listado.component';
import { HistoricoTurnosListadoComponent } from './historico-turnos-listado/historico-turnos-listado.component';
import { ModalidadesTurnosListadoComponent } from './modalidades-turnos-listado/modalidades-turnos-listado.component';

export const DashboardRoutes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'turnos', component: TurnosListadoComponent },
  { path: 'modalidades', component: ModalidadesListadoComponent },
  { path: 'historicoTurnos', component: HistoricoTurnosListadoComponent },
  { path: 'turnosModalidad', component: ModalidadesTurnosListadoComponent }
];
