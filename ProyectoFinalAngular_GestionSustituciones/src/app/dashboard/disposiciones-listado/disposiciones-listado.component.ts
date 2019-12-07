import { Component, OnInit } from '@angular/core';
import { Disposiciones } from 'src/app/models/disposiciones.interface';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { DisposicionesService } from 'src/app/services/disposiciones.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DisposicionesNuevoDialogComponent } from '../disposiciones-nuevo-dialog/disposiciones-nuevo-dialog.component';

@Component({
  selector: 'app-disposiciones-listado',
  templateUrl: './disposiciones-listado.component.html',
  styleUrls: ['./disposiciones-listado.component.scss']
})
export class DisposicionesListadoComponent implements OnInit {

  listaDisposiciones: DocumentosFirestore<Disposiciones>[];
  displayedColumns: string[] = ['nombre', 'acciones'];

  constructor(private disposicionesService: DisposicionesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadDisposiciones();
  }

  loadDisposiciones(){
    this.disposicionesService.getDisposiciones().subscribe(disposicionesSnapshot => {
      this.listaDisposiciones = [];
      disposicionesSnapshot.forEach((disposicionesData: any) => {
        this.listaDisposiciones.push({
          id: disposicionesData.payload.doc.id,
          data: disposicionesData.payload.doc.data()
        });
      });
    });
  }

  eliminarDisposiciones(id: string){
    this.disposicionesService.deleteDisposiciones(id).then(resp =>  {
      this._snackBar.open("Disposición eliminada correctamente", "✔️");
    }).catch(err =>  {
      this._snackBar.open("Error al eliminar la disposición", "✖️");
    });
  }

  verDisposicionesProfesores(id: string){
    localStorage.setItem('dayId', id);
    this.router.navigate([`disposicionesProfesores`]);
  }

  editarDisposiciones(id:string, data: Disposiciones){
    const dialogRef = this.dialog.open(DisposicionesNuevoDialogComponent, {
      data: {edit: true,
        id_dia: data.id_dia,
        nombre_dia: data.nombre_dia,
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(resp =>{
      if(resp != null){
        if(resp){
            this._snackBar.open("Disposicion editada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al editar la dispisición", "✖️");
        }
      }
    });
  }

  crearDisposiciones(){
    const dialogRef = this.dialog.open(DisposicionesNuevoDialogComponent, {
      data: {edit: false}
    });
    dialogRef.afterClosed().subscribe(resp =>{
      if(resp != null){
        if(resp){
            this._snackBar.open("Disposición creada correctamente", "✔️");
        } else {
          this._snackBar.open("Error al crear la disposición", "✖️");
        }
      }
    });
  }

}
