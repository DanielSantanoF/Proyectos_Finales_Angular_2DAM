import { Component, OnInit } from '@angular/core';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Modalidades } from 'src/app/models/modalidades.interface';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { ModalidadesNuevoDialogComponent } from '../modalidades-nuevo-dialog/modalidades-nuevo-dialog.component';

@Component({
  selector: 'app-modalidades-listado',
  templateUrl: './modalidades-listado.component.html',
  styleUrls: ['./modalidades-listado.component.scss']
})
export class ModalidadesListadoComponent implements OnInit {

  es_profesor: boolean;
  listaModalidades: FirestoreResponse<Modalidades>[];
  displayedColumns: string[] = ['nombre', 'profesor', 'acciones'];
  
  constructor(private modalidadesService: ModalidadesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadModalidades();
    if(localStorage.getItem('es_Profesor') == "Y"){
      this.es_profesor = true;
    }
  }

  loadModalidades() {
    this.modalidadesService.getModalidades().subscribe(modSnapshot => {
      this.listaModalidades = [];
      modSnapshot.forEach((modData: any) => {
        this.listaModalidades.push({
          id: modData.payload.doc.id,
          data: modData.payload.doc.data()
        });
      });
    });
  }

  crearModalidades(){
    const dialogRef = this.dialog.open(ModalidadesNuevoDialogComponent, {
      data: {edit: false}
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Modalidad creada correctamente");
        } else {
          this._snackBar.open("Error al crear la modalidad");
        }
      }
    });
  }

  editarModalidades(id: string, data: Modalidades){
    const dialogRef = this.dialog.open(ModalidadesNuevoDialogComponent, {
      data: {
        edit: true,
        nombre_acortado: data.nombre_acortado,
        nombre_extendido: data.nombre_extendido,
        nombre_profesor: data.nombre_profesor,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Modalidad editada correctamente");
        } else {
          this._snackBar.open("Error al editar la modalidad");
        }
      }
    });
  }

  eliminarModalidades(id: string){
    this.modalidadesService.deleteModalidades(id).then(resp => {
      this._snackBar.open("Modalidad eliminada correctamente");
    }).catch( err => {
      this._snackBar.open("Error al aliminar la modalidad");
    });
  }

  verTurnosModalidades(id: string, data: Modalidades){
    localStorage.setItem('nombreModalidad', data.nombre_extendido);
    localStorage.setItem('idModalidad', id);
    this.router.navigate([`turnosModalidad`]);
  }

}
