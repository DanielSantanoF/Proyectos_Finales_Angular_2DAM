import { Component, OnInit } from '@angular/core';
import { HistoricoturnosService } from 'src/app/services/historicoturnos.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { Turnos } from 'src/app/models/turnos.interface';

@Component({
  selector: 'app-historico-turnos-listado',
  templateUrl: './historico-turnos-listado.component.html',
  styleUrls: ['./historico-turnos-listado.component.scss']
})
export class HistoricoTurnosListadoComponent implements OnInit {

  es_profesor: boolean;
  listaTurnos: FirestoreResponse<Turnos>[];
  displayedColumns: string[] = ['modalidad', 'alumno', 'resuelta', 'acciones'];
  
  constructor(private historicoTurnosService: HistoricoturnosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('es_Profesor') == "Y"){
      this.es_profesor = true;
    } else {
      this.router.navigate(['/']);
    }
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadTurnos();
  }

  loadTurnos() {
    this.historicoTurnosService.getHistoricoTurnos().subscribe(turSnapshot => {
      this.listaTurnos = [];
      turSnapshot.forEach((turData: any) => {
        this.listaTurnos.push({
          id: turData.payload.doc.id,
          data: turData.payload.doc.data()
        });
      });
    });
  }

  eliminarTurnos(id: string){
    this.historicoTurnosService.deleteHistoricoTurnos(id).then( resp => {
      this._snackBar.open("Turno eliminado del historico correctamente");
    }).catch( err => {
      this._snackBar.open("Error al eliminar el turno del historico");
    });
  }

}
