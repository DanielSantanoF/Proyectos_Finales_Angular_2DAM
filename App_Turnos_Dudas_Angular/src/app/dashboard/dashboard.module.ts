import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatChipsModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MAT_CHIPS_DEFAULT_OPTIONS,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TurnosListadoComponent } from './turnos-listado/turnos-listado.component';
import { ModalidadesListadoComponent } from './modalidades-listado/modalidades-listado.component';
import { ModalidadesService } from '../services/modalidades.service';
import { ModalidadesNuevoDialogComponent } from './modalidades-nuevo-dialog/modalidades-nuevo-dialog.component';
import { TurnosService } from '../services/turnos.service';
import { TurnosNuevoDialogComponent } from './turnos-nuevo-dialog/turnos-nuevo-dialog.component';
import { HistoricoTurnosListadoComponent } from './historico-turnos-listado/historico-turnos-listado.component';
import { HistoricoturnosService } from '../services/historicoturnos.service';
import { ModalidadesTurnosListadoComponent } from './modalidades-turnos-listado/modalidades-turnos-listado.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    ChartsModule,
    FormsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [DashboardComponent, TurnosListadoComponent, ModalidadesListadoComponent, ModalidadesNuevoDialogComponent, TurnosNuevoDialogComponent, HistoricoTurnosListadoComponent, ModalidadesTurnosListadoComponent],
  entryComponents: [
    ModalidadesNuevoDialogComponent,
    TurnosNuevoDialogComponent
  ],
  providers: [
    MatDatepickerModule,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
    AuthService,
    ModalidadesService,
    TurnosService,
    HistoricoturnosService
  ]
})
export class DashboardModule {}
