import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnosService } from '../services/turnos.service';
import { FirestoreResponse } from '../models/firestore-response.interface';
import { Turnos } from '../models/turnos.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TurnosNuevoDialogComponent } from './turnos-nuevo-dialog/turnos-nuevo-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  listaTurnos: FirestoreResponse<Turnos>[];

  constructor(private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private turnosService: TurnosService) { }

  ngOnInit(){
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
  this.loadTurnos();
  }

  loadTurnos() {
    this.turnosService.getTurnos().subscribe(turSnapshot => {
      this.listaTurnos = [];
      turSnapshot.forEach((turData: any) => {
        this.listaTurnos.push({
          id: turData.payload.doc.id,
          data: turData.payload.doc.data()
        });
      });
    });
  }

  redirectTurnos(){
    this.router.navigate(['/turnos']);
  }

  crearTurno(){
    const dialogRef = this.dialog.open(TurnosNuevoDialogComponent, {
      data: {peso: this.listaTurnos[0].data.peso}
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this.router.navigate(['/turnos']);
        } else {
          this._snackBar.open("Error al crear el turno");
        }
      }
    });
  }

}
