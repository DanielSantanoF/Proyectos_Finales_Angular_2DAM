import { CalendarModule, DateAdapter } from 'angular-calendar';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
} from '@angular/material';

import { AppsRoutes } from './apps.routing';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SustitucionesService } from '../services/sustituciones.service';
import { FullcalendarSustitucionNuevoDialogComponent } from './fullcalendar-sustitucion-nuevo-dialog/fullcalendar-sustitucion-nuevo-dialog.component';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { AulasService } from '../services/aulas.service';
import { ProfesoresService } from '../services/profesores.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullcalendarCrearSustitucionNuevoDialogComponent } from './fullcalendar-crear-sustitucion-nuevo-dialog/fullcalendar-crear-sustitucion-nuevo-dialog.component';
import { DisposicionesService } from '../services/disposiciones.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlexLayoutModule,
    ChartsModule,
    PerfectScrollbarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [
    FullcalendarComponent,
    FullcalendarSustitucionNuevoDialogComponent,
    FullcalendarCrearSustitucionNuevoDialogComponent
  ],
  entryComponents: [
    FullcalendarSustitucionNuevoDialogComponent,
    FullcalendarCrearSustitucionNuevoDialogComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}},
    SustitucionesService,
    AulasService,
    ProfesoresService,
    DisposicionesService
  ]
})
export class AppsModule { }
