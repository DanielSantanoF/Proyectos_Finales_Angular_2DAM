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
  MatCheckboxModule,
  DateAdapter,
  MatNativeDateModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
//FIREBASE
//npm install @angular/fire firebase --save
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
//MAS MODULOS
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
//npm i ngx-clipboard
import { ClipboardModule } from 'ngx-clipboard';
import { ProfesoresService } from '../services/profesores.service';
import { ProfesoresListadoComponent } from './profesores-listado/profesores-listado.component'
import { HistoricoProfesoresService } from '../services/historico-profesores.service';
import { ProfesoresNuevoDialogComponent } from './profesores-nuevo-dialog/profesores-nuevo-dialog.component';
import { HistoricoProfesoresListadoComponent } from './historico-profesores-listado/historico-profesores-listado.component';
import { AulasListadoComponent } from './aulas-listado/aulas-listado.component';
import { AulasNuevoDialogComponent } from './aulas-nuevo-dialog/aulas-nuevo-dialog.component';
import { AulasService } from '../services/aulas.service';
import { DisposicionesListadoComponent } from './disposiciones-listado/disposiciones-listado.component';
import { SustitucionesService } from '../services/sustituciones.service';
import { DisposicionesService } from '../services/disposiciones.service';
import { DisposicionesProfesoresListadoComponent } from './disposiciones-profesores-listado/disposiciones-profesores-listado.component';
import { DisposicionesProfesoresNuevoDialogComponent } from './disposiciones-profesores-nuevo-dialog/disposiciones-profesores-nuevo-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomDateAdapter } from '../adadpters/custom-date-adapter';
import { DisposicionesNuevoDialogComponent } from './disposiciones-nuevo-dialog/disposiciones-nuevo-dialog.component';
import { SustitucionesListadoComponent } from './sustituciones-listado/sustituciones-listado.component';
import { SustitucionesNuevoDialogComponent } from './sustituciones-nuevo-dialog/sustituciones-nuevo-dialog.component';
import { SustitucionesPdfMakeComponent } from './sustituciones-pdf-make/sustituciones-pdf-make.component';
//npm install --save pdfmake Libreria para generar el pdf de las sustituciones

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
    ChartsModule,
    NgxDatatableModule,
    FlexLayoutModule,
    //FIRE BASE
    AngularFireModule.initializeApp(environment.firebase, 'Gestion_Sustituciones_ST'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    ClipboardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: DateAdapter, useClass: CustomDateAdapter},
    MatDatepickerModule,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
    ProfesoresService,
    HistoricoProfesoresService,
    AulasService,
    SustitucionesService,
    DisposicionesService
  ],
  entryComponents: [
    ProfesoresNuevoDialogComponent,
    AulasNuevoDialogComponent,
    DisposicionesProfesoresNuevoDialogComponent,
    DisposicionesNuevoDialogComponent,
    SustitucionesNuevoDialogComponent
  ],
  declarations: [DashboardComponent, ProfesoresListadoComponent, ProfesoresNuevoDialogComponent, HistoricoProfesoresListadoComponent, AulasListadoComponent, AulasNuevoDialogComponent, DisposicionesListadoComponent, DisposicionesProfesoresListadoComponent, DisposicionesProfesoresNuevoDialogComponent, DisposicionesNuevoDialogComponent, SustitucionesListadoComponent, SustitucionesNuevoDialogComponent, SustitucionesPdfMakeComponent]
})
export class DashboardModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-ES');
  }
}
