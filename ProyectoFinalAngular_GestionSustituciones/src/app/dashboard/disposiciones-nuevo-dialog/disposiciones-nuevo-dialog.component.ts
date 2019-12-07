import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DisposicionesService } from 'src/app/services/disposiciones.service';
import { DisposicionesDto } from 'src/app/models/disposicionesDto.dto';

export interface DatosEntradaDialogData {
  edit: boolean;
  id_dia: string;
  nombre_dia: string;
  id: string;
}

@Component({
  selector: 'app-disposiciones-nuevo-dialog',
  templateUrl: './disposiciones-nuevo-dialog.component.html',
  styleUrls: ['./disposiciones-nuevo-dialog.component.scss']
})
export class DisposicionesNuevoDialogComponent implements OnInit {

  editando: boolean;
  id_dia: string;
  nombre_dia: string;
  id: string;

  constructor(public dialogRef: MatDialogRef<DisposicionesNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialogData,
    private disposicionesService: DisposicionesService) { }

  ngOnInit() {
    this.editando = this.data.edit;
      if(this.editando) {
        this.id_dia = this.data.id_dia;
        this.nombre_dia = this.data.nombre_dia;
        this.id = this.data.id;
      }
  }

  cerrarDialog(){
    this.dialogRef.close(null);
  }

  doRegistrar(){
    if(this.id_dia == "0"){
      this.nombre_dia = "Lunes";
    } else if(this.id_dia == "1"){
      this.nombre_dia = "Martes";
    } else if(this.id_dia == "2"){
      this.nombre_dia = "Miercoles";
    } else if(this.id_dia == "3"){
      this.nombre_dia = "Jueves";
    } else if(this.id_dia == "4"){
      this.nombre_dia = "Viernes";
    } else if(this.id_dia == "5"){
      this.nombre_dia = "Sábado";
    } else if(this.id_dia == "6"){
      this.nombre_dia = "Domingo";
    } else {
      this.nombre_dia = "NaN";
    }
    const dto = new DisposicionesDto(this.id_dia, this.nombre_dia);
    if(this.editando === true){
      this.disposicionesService.updateDisposiciones(this.id, dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
    } else {
      this.disposicionesService.createDisposiciones(dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
    }
  }

}
