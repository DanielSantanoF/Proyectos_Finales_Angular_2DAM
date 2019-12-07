import { Component, OnInit } from '@angular/core';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { Turnos } from 'src/app/models/turnos.interface';
import { TurnosService } from 'src/app/services/turnos.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HistoricoturnosService } from 'src/app/services/historicoturnos.service';
import { TurnosNuevoDialogComponent } from '../turnos-nuevo-dialog/turnos-nuevo-dialog.component';
import { TurnosDto } from 'src/app/models/turnosDto.dto';

@Component({
  selector: 'app-modalidades-turnos-listado',
  templateUrl: './modalidades-turnos-listado.component.html',
  styleUrls: ['./modalidades-turnos-listado.component.scss']
})
export class ModalidadesTurnosListadoComponent implements OnInit {

  nombre_us: string;
  id_modalidad: string;
  es_profesor: boolean;
  listaTurnos: FirestoreResponse<Turnos>[];
  nombre_modalidad_listado: string;
  displayedColumns: string[] = ['modalidad', 'alumno', 'resuelta', 'acciones'];

  constructor(private turnosService: TurnosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private historicoTurnosService: HistoricoturnosService) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.id_modalidad = localStorage.getItem('idModalidad');
    this.nombre_modalidad_listado = localStorage.getItem('nombreModalidad');
    this.loadTurnos();
    if(localStorage.getItem('es_Profesor') == "Y"){
      this.es_profesor = true;
    }
    this.nombre_us = localStorage.getItem('nombre');
  }

  loadTurnos() {
    this.turnosService.getTurnosByIdModalidades(this.id_modalidad).subscribe(turSnapshot => {
      this.listaTurnos = [];
      turSnapshot.forEach((turData: any) => {
        this.listaTurnos.push({
          id: turData.payload.doc.id,
          data: turData.payload.doc.data()
        });
      });
    });
  }

  marcarComoResuelta(id: string, data: Turnos){
    const dto = new TurnosDto(data.id_modalidad, data.nombre_modalidad, data.nombre_usuario, data.peso, true);
    this.turnosService.updateTurnos(id, dto).then( resp => {
      this.turnosService.deleteTurnos(id).then( resp2 => {
        this.historicoTurnosService.setTurnosInHistoricoTurnos(id, dto).then( resp3 => {
          this._snackBar.open("Turno marcado como resuleto");
        }).catch( err => {
          this._snackBar.open("Error al pasar al historico");
        });
      }).catch( err => {
        this._snackBar.open("Error al eliminar la duda de turnos para pasarla al historico");
      });
    }).catch( err => {
      this._snackBar.open("Error al marcar el turno como resuleto");
    });
  }

  eliminarTurnos(id: string){
    this.turnosService.deleteTurnos(id).then( resp => {
      this._snackBar.open("Turno eliminado correctamente");
    }).catch( err => {
      this._snackBar.open("Error al eliminar el turno");
    });
  }

  crearTurno(){
    const dialogRef = this.dialog.open(TurnosNuevoDialogComponent, {
      data: {peso: this.listaTurnos[0].data.peso}
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Turno creado correctamente");
        } else {
          this._snackBar.open("Error al crear el turno");
        }
      }
    });
  }

}
