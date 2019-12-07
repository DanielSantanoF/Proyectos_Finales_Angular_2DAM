import { Component, OnInit } from '@angular/core';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { Profesores } from 'src/app/models/profesores.interface';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HistoricoProfesoresService } from 'src/app/services/historico-profesores.service';
import { ProfesoresDto } from 'src/app/models/profesoresDto.dto';
import { ProfesoresNuevoDialogComponent } from '../profesores-nuevo-dialog/profesores-nuevo-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesores-listado',
  templateUrl: './profesores-listado.component.html',
  styleUrls: ['./profesores-listado.component.scss']
})
export class ProfesoresListadoComponent implements OnInit {

  listaProfesores: DocumentosFirestore<Profesores>[];
  displayedColumns: string[] = ['nombreComnpleto', 'email', 'telefono', 'activo', 'acciones'];

  constructor(private profesoresService: ProfesoresService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private historicoProfesoresService: HistoricoProfesoresService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
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

  eliminarProfesores(id: string, data: Profesores) {
    this.profesoresService.deleteProfesores(id).then(resp => {
      const dto = new ProfesoresDto(false, data.apellidos, data.email, data.nombre, data.telefono);
      this.historicoProfesoresService.createProfesores(id, dto).then(resp => {
        this._snackBar.open("Profesor eliminado correctamente", "✔️");
      }).catch(err => {
        this._snackBar.open("Error al pasar al profesor al historico", "✖️");
      });
    }).catch(err => {
      this._snackBar.open("Error al eliminar el profesor", "✖️");
    });
  }

  editarProfesores(id: string, data: Profesores) {
    const dialogRef = this.dialog.open(ProfesoresNuevoDialogComponent, {
      data: {
        edit: true,
        activo: data.activo,
        apellidos: data.apellidos,
        email: data.email,
        nombre: data.nombre,
        telefono: data.telefono,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Profesor editado correctamente", "✔️");
        } else {
          this._snackBar.open("Error al editar el profesor", "✖️");
        }
      }
    });
  }

  crearProfesores() {
    const dialogRef = this.dialog.open(ProfesoresNuevoDialogComponent, {
      data: { edit: false }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Profesor creado correctamente", "✔️");
        } else {
          this._snackBar.open("Error al crear el profesor", "✖️");
        }
      }
    });
  }

}
