import { Component, OnInit } from '@angular/core';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { Profesores } from 'src/app/models/profesores.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HistoricoProfesoresService } from 'src/app/services/historico-profesores.service';
import { ProfesoresNuevoDialogComponent } from '../profesores-nuevo-dialog/profesores-nuevo-dialog.component';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { ProfesoresDto } from 'src/app/models/profesoresDto.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico-profesores-listado',
  templateUrl: './historico-profesores-listado.component.html',
  styleUrls: ['./historico-profesores-listado.component.scss']
})
export class HistoricoProfesoresListadoComponent implements OnInit {

  listaProfesores: DocumentosFirestore<Profesores>[];
  displayedColumns: string[] = ['nombreComnpleto', 'email', 'telefono', 'activo', 'acciones', 'darDeAlta'];

  constructor(private historicoProfesoresService: HistoricoProfesoresService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private profesoresService: ProfesoresService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadProfesores();
  }

  loadProfesores() {
    this.historicoProfesoresService.getProfesores().subscribe(profesoresSnapshot => {
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
    this.historicoProfesoresService.deleteProfesores(id).then(resp => {
      this._snackBar.open("Profesor eliminado del historico correctamente", "✔️");
    }).catch(err => {
      this._snackBar.open("Error eliminar al profesor del historico", "✖️");
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
          this._snackBar.open("Profesor editado correctamente en el historico", "✔️");
        } else {
          this._snackBar.open("Error al editar el profesor en el historico", "✖️");
        }
      }
    });
  }

  putHistoricoProfesoresToProfesores(id: string, data: Profesores) {
    const dto = new ProfesoresDto(true, data.apellidos, data.email, data.nombre, data.telefono);
    this.profesoresService.postHistoricoProfesoresToProfesores(id, dto).then(resp => {
      this.historicoProfesoresService.deleteProfesores(id).then(resp2 => {
        this._snackBar.open("Profesor pasado a profesores del historico correctamente", "✔️");
      }).catch(err => {
        this._snackBar.open("Error eliminar al profesor del historico", "✖️");
      })
    }).catch(err => {
      this._snackBar.open("Error al pasar al profesor del historico a profesores", "✖️");
    });
  }

}
