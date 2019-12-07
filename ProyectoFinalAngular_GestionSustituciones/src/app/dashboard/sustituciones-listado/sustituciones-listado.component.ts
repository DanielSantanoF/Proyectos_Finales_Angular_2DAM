import { Component, OnInit } from '@angular/core';
import { Sustituciones } from 'src/app/models/sustituciones.interface';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { SustitucionesService } from 'src/app/services/sustituciones.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SustitucionesNuevoDialogComponent } from '../sustituciones-nuevo-dialog/sustituciones-nuevo-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sustituciones-listado',
  templateUrl: './sustituciones-listado.component.html',
  styleUrls: ['./sustituciones-listado.component.scss']
})
export class SustitucionesListadoComponent implements OnInit {

  listaSustituciones: DocumentosFirestore<Sustituciones>[];
  displayedColumns: string[] = ['nombreProfesorAusente', 'nombreProfesorSustituto', 'fechaSustituir', 'horaSustituir', 'aula', 'acciones'];

  constructor(private sustitucionesService: SustitucionesService,
    public dialog: MatDialog,
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
    this.sustitucionesService.getSustituciones().subscribe(sustitucionesSnapshot => {
      this.listaSustituciones = [];
      sustitucionesSnapshot.forEach((sustitucionesData: any) => {
        this.listaSustituciones.push({
          id: sustitucionesData.payload.doc.id,
          data: sustitucionesData.payload.doc.data()
        });
      });
    });
  }

  eliminarSustituciones(id: string) {
    this.sustitucionesService.deleteSustituciones(id).then(resp => {
      this._snackBar.open("Sustitución eliminada correctamente", "✔️");
    }).catch(err => {
      this._snackBar.open("Error al eliminar la sustitución", "✖️");
    });
  }

  editarSustituciones(id: string, data: Sustituciones) {
    const dialogRef = this.dialog.open(SustitucionesNuevoDialogComponent, {
      data: {
        edit: true,
        apellidos_profesor_ausente: data.apellidos_profesor_ausente,
        apellidos_sustituto: data.apellidos_sustituto,
        fecha: data.fecha,
        id_aula: data.id_aula,
        id_profesor_ausente: data.id_profesor_ausente,
        id_sustituto: data.id_sustituto,
        nombre_aula: data.nombre_aula,
        nombre_profesor_ausente: data.nombre_profesor_ausente,
        nombre_sustituto: data.nombre_sustituto,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Sustitución editada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al editar la sustitución", "✖️");
        }
      }
    });
  }

  crearSustituciones() {
    const dialogRef = this.dialog.open(SustitucionesNuevoDialogComponent, {
      data: { edit: false }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Sustitución creada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al crear la sustitución", "✖️");
        }
      }
    });
  }

}
