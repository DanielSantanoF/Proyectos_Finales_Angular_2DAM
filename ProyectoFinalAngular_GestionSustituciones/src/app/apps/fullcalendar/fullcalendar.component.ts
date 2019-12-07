import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { SustitucionesService } from 'src/app/services/sustituciones.service';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { Sustituciones } from 'src/app/models/sustituciones.interface';
import { FullcalendarSustitucionNuevoDialogComponent } from '../fullcalendar-sustitucion-nuevo-dialog/fullcalendar-sustitucion-nuevo-dialog.component';
import { FullcalendarCrearSustitucionNuevoDialogComponent } from '../fullcalendar-crear-sustitucion-nuevo-dialog/fullcalendar-crear-sustitucion-nuevo-dialog.component';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#141bcc',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-fullcalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent implements OnInit {

  listaSustituciones: DocumentosFirestore<Sustituciones>[];
  evento;

  lastCloseResult: string;
  actionsAlignment: string;
  config: MatDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      action: '',
      event: []
    }
  };
  numTemplateOpens = 0;

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="editButton"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="deleteButton"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        let action = 'Deleted';
        this.config.data = { event, action };
        this.sustitucionesService.deleteSustituciones(this.config.data.event.id).then(resp => {
          this._snackBar.open("Sustitución eliminada correctamente", "✔️");
        }).catch(err => {
          this._snackBar.open("Error al eliminar la sustitución", "✖️");
        });
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  constructor(public dialog: MatDialog,
    private sustitucionesService: SustitucionesService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadSustituciones();
  }

  loadSustituciones() {
    this.events = [];
    this.sustitucionesService.getSustituciones().subscribe(sustitucionesSnapshot => {
      this.listaSustituciones = [];
      sustitucionesSnapshot.forEach((sustitucionesData: any) => {
        this.listaSustituciones.push({
          id: sustitucionesData.payload.doc.id,
          data: sustitucionesData.payload.doc.data()
        });
      });
      this.listaSustituciones.forEach(((element, index, array) => {
        this.evento = {
          start: addHours(startOfDay(element.data.fecha.toDate()), element.data.fecha.toDate().getHours()),
          end: addHours(startOfDay(element.data.fecha.toDate()), element.data.fecha.toDate().getHours() + 1),
          title: `Sustitución de ${element.data.nombre_profesor_ausente} ${element.data.apellidos_profesor_ausente}`,
          color: colors.blue,
          actions: this.actions,
          apellidos_profesor_ausente: element.data.apellidos_profesor_ausente,
          apellidos_sustituto: element.data.apellidos_sustituto,
          fecha: element.data.fecha,
          id_aula: element.data.id_aula,
          id_profesor_ausente: element.data.id_profesor_ausente,
          id_sustituto: element.data.id_sustituto,
          nombre_aula: element.data.nombre_aula,
          nombre_profesor_ausente: element.data.nombre_profesor_ausente,
          nombre_sustituto: element.data.nombre_sustituto,
          id: element.id,
          hora_sustitucion: element.data.fecha.toDate().getHours()
        }
        this.events.push(this.evento);
      }));
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.config.data = { event, action };
    const dialogRef = this.dialog.open(FullcalendarSustitucionNuevoDialogComponent, this.config);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this.loadSustituciones();
          this._snackBar.open("Sustitución editada correctamente", "✔️");
        } else {
          this._snackBar.open("Error editar la sustitución", "✖️");
        }
      }
    });
  }

  crearSustitucion() {
    const dialogRef = this.dialog.open(FullcalendarCrearSustitucionNuevoDialogComponent);
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this.loadSustituciones();
          this._snackBar.open("Sustitución creada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al crear la sustitución", "✖️");
        }
      }
    });
  }

}
