import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { Aulas } from 'src/app/models/aulas.interface';
import { Profesores } from 'src/app/models/profesores.interface';
import { SustitucionesService } from 'src/app/services/sustituciones.service';
import { AulasService } from 'src/app/services/aulas.service';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { SustitucionesDto } from 'src/app/models/sustitucionesDto.dto';
import { Disposiciones } from 'src/app/models/disposiciones.interface';
import { DisposicionesProfesores } from 'src/app/models/disposicionesProfesores.interface';
import { DisposicionesService } from 'src/app/services/disposiciones.service';

@Component({
  selector: 'app-fullcalendar-sustitucion-nuevo-dialog',
  templateUrl: './fullcalendar-sustitucion-nuevo-dialog.component.html',
  styleUrls: ['./fullcalendar-sustitucion-nuevo-dialog.component.scss']
})
export class FullcalendarSustitucionNuevoDialogComponent implements OnInit {

  apellidos_profesor_ausente: string;
  apellidos_sustituto: string;
  fecha: Date;
  id_aula: string;
  id_profesor_ausente: string;
  id_sustituto: string;
  nombre_aula: string;
  nombre_profesor_ausente: string;
  nombre_sustituto: string;
  id: string;
  hora_sustitucion: string;
  diaDeSustitucion: string;

  listaAulas: DocumentosFirestore<Aulas>[];
  listaProfesores: DocumentosFirestore<Profesores>[];
  listaDisposiciones: DocumentosFirestore<Disposiciones>[];
  listaDisposicionesProfesores: DocumentosFirestore<DisposicionesProfesores>[];

  constructor(public dialogRef: MatDialogRef<FullcalendarSustitucionNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sustitucionesService: SustitucionesService,
    private aulasService: AulasService,
    private profesoresService: ProfesoresService,
    private disposicionesService: DisposicionesService) { }

  ngOnInit() {
    this.apellidos_profesor_ausente = this.data.event.apellidos_profesor_ausente;
    this.apellidos_sustituto = this.data.event.apellidos_sustituto;
    this.fecha = this.data.event.fecha.toDate();
    this.setHour(this.fecha.getDay());
    this.id_aula = this.data.event.id_aula;
    this.id_profesor_ausente = this.data.event.id_profesor_ausente;
    this.id_sustituto = this.data.event.id_sustituto;
    this.nombre_aula = this.data.event.nombre_aula;
    this.nombre_profesor_ausente = this.data.event.nombre_profesor_ausente;
    this.nombre_sustituto = this.data.event.nombre_sustituto;
    this.id = this.data.event.id;
    this.setDay(this.fecha.getDay());
    this.loadAulas();
    this.loadProfesores();
  }

  loadProfesores() {
    this.profesoresService.getProfesores().subscribe(profesoresSnapshot => {
      this.listaProfesores = [];
      profesoresSnapshot.forEach((profesoresData: any) => {
        this.listaProfesores.push({
          id: profesoresData.payload.doc.id,
          data: profesoresData.payload.doc.data()
        });
      });
    });
  }

  loadAulas() {
    this.aulasService.getAulas().subscribe(aulasSnapshot => {
      this.listaAulas = [];
      aulasSnapshot.forEach((aulasData: any) => {
        this.listaAulas.push({
          id: aulasData.payload.doc.id,
          data: aulasData.payload.doc.data()
        });
      });
    });
  }

  cerrarDialog() {
    this.dialogRef.close(null);
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  setFecha(event: MatDatepickerInputEvent<Date>) {
    this.fecha = event.value;
    let day = this.fecha.getDay();
    if (day == 1) {
      this.diaDeSustitucion = "Lunes";
    } else if (day == 2) {
      this.diaDeSustitucion = "Martes";
    } else if (day == 3) {
      this.diaDeSustitucion = "Miercoles";
    } else if (day == 4) {
      this.diaDeSustitucion = "Jueves";
    } else if (day == 5) {
      this.diaDeSustitucion = "Viernes";
    } else if (day == 6) {
      this.diaDeSustitucion = "Sábado";
    } else if (day == 7) {
      this.diaDeSustitucion = "Domingo";
    }
    this.loadDisposiciones();
  }

  setDay(day) {
    if (day == 1) {
      this.diaDeSustitucion = "Lunes";
    } else if (day == 2) {
      this.diaDeSustitucion = "Martes";
    } else if (day == 3) {
      this.diaDeSustitucion = "Miercoles";
    } else if (day == 4) {
      this.diaDeSustitucion = "Jueves";
    } else if (day == 5) {
      this.diaDeSustitucion = "Viernes";
    } else if (day == 6) {
      this.diaDeSustitucion = "Sábado";
    } else if (day == 7) {
      this.diaDeSustitucion = "Domingo";
    }
    this.loadDisposiciones();
  }

  setHour(value: any) {
    this.hora_sustitucion = value;
  }

  setDispProf(value: any) {
    this.loadDisposicionesProfesores();
  }

  loadDisposiciones() {
    this.disposicionesService.getDisposicionesPorDiaId(this.diaDeSustitucion).subscribe(dispSnapshot => {
      this.listaDisposiciones = [];
      dispSnapshot.forEach((dispData: any) => {
        this.listaDisposiciones.push({
          id: dispData.payload.doc.id,
          data: dispData.payload.doc.data()
        });
      });
    });
  }

  loadDisposicionesProfesores() {
    this.disposicionesService.getDisposicionesProfesoreByDayIdAndHour(this.listaDisposiciones[0].id, this.hora_sustitucion).subscribe(dpSnapshot => {
      this.listaDisposicionesProfesores = [];
      dpSnapshot.forEach((dpData: any) => {
        this.listaDisposicionesProfesores.push({
          id: dpData.payload.doc.id,
          data: dpData.payload.doc.data()
        });
      });
    });
  }

  doRegistrar() {
    this.listaAulas.forEach(((element, index, array) => {
      if (element.id == this.id_aula) {
        this.nombre_aula = element.data.nombre;
      }
    }));
    this.listaProfesores.forEach(((element, index, array) => {
      if (element.id == this.id_profesor_ausente) {
        this.nombre_profesor_ausente = element.data.nombre;
        this.apellidos_profesor_ausente = element.data.apellidos;
      }
      if (element.id == this.id_sustituto) {
        this.nombre_sustituto = element.data.nombre;
        this.apellidos_sustituto = element.data.apellidos;
      }
    }));
    this.listaDisposicionesProfesores.forEach(((element, index, array) => {
      if (element.id == this.id_sustituto) {
        this.nombre_sustituto = element.data.nombre;
        this.apellidos_sustituto = element.data.apellidos;
      }
    }));
    const dto = new SustitucionesDto(this.apellidos_profesor_ausente, this.apellidos_sustituto, this.fecha,
      this.id_aula, this.id_profesor_ausente, this.id_sustituto, this.nombre_aula, this.nombre_profesor_ausente,
      this.nombre_sustituto);
    this.sustitucionesService.updateSustituciones(this.id, dto).then(resp => {
      this.dialogRef.close(true);
    }).catch(respError => {
      this.dialogRef.close(false);
    });
  }

}
