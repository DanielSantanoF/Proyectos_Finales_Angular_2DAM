import { Component, OnInit } from '@angular/core';
import { AulasService } from 'src/app/services/aulas.service';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { Aulas } from 'src/app/models/aulas.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AulasNuevoDialogComponent } from '../aulas-nuevo-dialog/aulas-nuevo-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aulas-listado',
  templateUrl: './aulas-listado.component.html',
  styleUrls: ['./aulas-listado.component.scss']
})
export class AulasListadoComponent implements OnInit {

  listaAulas: DocumentosFirestore<Aulas>[];
  displayedColumns: string[] = ['nombre', 'localizacion', 'acciones'];

  constructor(private aulasService: AulasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadAulas();
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

  eliminarAulas(id: string) {
    this.aulasService.deleteAulas(id).then(resp => {
      this._snackBar.open("Aula eliminada correctamente", "✔️");
    }).catch(err => {
      this._snackBar.open("Error al eliminar el aula", "✖️");
    });
  }

  editarAulas(id: string, data: Aulas) {
    const dialogRef = this.dialog.open(AulasNuevoDialogComponent, {
      data: {
        edit: true,
        localizacion: data.localizacion,
        nombre: data.nombre,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Aula editada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al editar el aula", "✖️");
        }
      }
    });
  }

  crearAulas() {
    const dialogRef = this.dialog.open(AulasNuevoDialogComponent, {
      data: { edit: false }
    });
    dialogRef.afterClosed().subscribe(resp => {
      if (resp != null) {
        if (resp) {
          this._snackBar.open("Aula creada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al crear el aula", "✖️");
        }
      }
    });
  }

}
