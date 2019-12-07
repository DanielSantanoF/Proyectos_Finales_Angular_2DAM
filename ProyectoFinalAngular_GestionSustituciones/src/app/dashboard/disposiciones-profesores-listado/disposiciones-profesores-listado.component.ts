import { Component, OnInit } from '@angular/core';
import { DisposicionesProfesores } from 'src/app/models/disposicionesProfesores.interface';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { DisposicionesService } from 'src/app/services/disposiciones.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DisposicionesProfesoresNuevoDialogComponent } from '../disposiciones-profesores-nuevo-dialog/disposiciones-profesores-nuevo-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disposiciones-profesores-listado',
  templateUrl: './disposiciones-profesores-listado.component.html',
  styleUrls: ['./disposiciones-profesores-listado.component.scss']
})
export class DisposicionesProfesoresListadoComponent implements OnInit {

  id_dia: string;
  listaDisposicionesProfesores: DocumentosFirestore<DisposicionesProfesores>[];
  displayedColumns: string[] = ['nombre', 'horaDisponible', 'acciones'];

  constructor(private disposicionesService: DisposicionesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.id_dia = localStorage.getItem('dayId');
    this.loadDisposicionesProfesoresById(this.id_dia);
  }

  loadDisposicionesProfesoresById(id: string) {
    this.disposicionesService.getDisposicionesProfesoreByDayId(id).subscribe(disposicionesSnapshot => {
      this.listaDisposicionesProfesores = [];
      disposicionesSnapshot.forEach((disposicionesData: any) => {
        this.listaDisposicionesProfesores.push({
          id: disposicionesData.payload.doc.id,
          data: disposicionesData.payload.doc.data()
        });
      });
    });
  }

  eliminarDisposicionesProfesoresById(id: string) {
    this.disposicionesService.deleteDisposicionesProfesoresByDayId(this.id_dia, id).then(resp => {
      this._snackBar.open("Disposición del profesor eliminada correctamente", "✔️");
    }).catch(err => {
      this._snackBar.open("Error al eliminar la disposición del profesor", "✖️");
    });
  }

  editarDisposicionesProfesoresById(id: string, data: DisposicionesProfesores) {
    const dialogRef = this.dialog.open(DisposicionesProfesoresNuevoDialogComponent, {
      data: {
        edit: true,
        id_dia: this.id_dia,
        apellidos: data.apellidos,
        id_hora_disponible: data.id_hora_disponible,
        id_profesor: data.id_profesor,
        nombre: data.nombre,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Disposición del profesor editada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al editar la disposición del profesor", "✖️");
        }
      }
    });
  }

  crearDisposicionesProfesoresById() {
    const dialogRef = this.dialog.open(DisposicionesProfesoresNuevoDialogComponent, {
      data: {
        edit: false,
        id_dia: this.id_dia
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Disposición del profesor creada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al crear la disposición del profesor", "✖️");
        }
      }
    });
  }

}
