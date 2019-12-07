import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { ProfesoresDto } from 'src/app/models/profesoresDto.dto';

export interface DatosEntradaDialogData {
  edit: boolean;
  activo: boolean;
  apellidos: string;
  email: string;
  nombre: string;
  telefono: string;
  id: string;
}

@Component({
  selector: 'app-profesores-nuevo-dialog',
  templateUrl: './profesores-nuevo-dialog.component.html',
  styleUrls: ['./profesores-nuevo-dialog.component.scss']
})
export class ProfesoresNuevoDialogComponent implements OnInit {

  editando: boolean;
  activo: boolean;
  apellidos: string;
  email: string;
  nombre: string;
  telefono: string;
  id: string;

  constructor(public dialogRef: MatDialogRef<ProfesoresNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialogData,
    private profesoresService: ProfesoresService) { }

    ngOnInit() {
      this.editando = this.data.edit;
      if(this.editando) {
        this.activo = this.data.activo;
        this.apellidos = this.data.apellidos;
        this.email = this.data.email;
        this.nombre = this.data.nombre;
        this.telefono = this.data.telefono;
        this.id = this.data.id;
      }   
    }

    cerrarDialog(){
      this.dialogRef.close(null);
    }

    doRegistrar(){
      const dto = new ProfesoresDto(this.activo, this.apellidos, this.email, this.nombre, this.telefono);
      if(this.editando === true){
        this.profesoresService.updateProfesores(this.id, dto).then(resp => {
          this.dialogRef.close(true);
        }).catch(respError =>{
          this.dialogRef.close(false);
        });
      } else {
        this.profesoresService.createProfesores(dto).then(resp => {
          this.dialogRef.close(true);
        }).catch(respError =>{
          this.dialogRef.close(false);
        });
      }
    }

}
