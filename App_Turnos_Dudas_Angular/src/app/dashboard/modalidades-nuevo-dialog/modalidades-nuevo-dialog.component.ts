import { Component, OnInit, Inject } from '@angular/core';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalidadesDto } from 'src/app/models/modalidadesDto.dto';

export interface DatosEntradaDialogData {
  edit: boolean;
  nombre_acortado: string;
  nombre_extendido: string;
  nombre_profesor: string;
  id: string;
}

@Component({
  selector: 'app-modalidades-nuevo-dialog',
  templateUrl: './modalidades-nuevo-dialog.component.html',
  styleUrls: ['./modalidades-nuevo-dialog.component.scss']
})
export class ModalidadesNuevoDialogComponent implements OnInit {

  editando: boolean;
  nombre_acortado: string;
  nombre_extendido: string;
  nombre_profesor: string;
  id: string;

  constructor(public dialogRef: MatDialogRef<ModalidadesNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialogData,
    private modalidadesService: ModalidadesService) { }

  ngOnInit() {
    this.editando = this.data.edit;
    if(this.editando){
      this.nombre_acortado = this.data.nombre_acortado;
      this.nombre_extendido = this.data.nombre_extendido;
      this.nombre_profesor = this.data.nombre_profesor;
    }
  }

  cerrarDialog(){
    this.dialogRef.close(null);
  }

  doRegistrar(){
    const dto = new ModalidadesDto(this.nombre_acortado, this.nombre_extendido, this.nombre_profesor);
    if(this.editando === true){
      this.modalidadesService.updateModalidades(this.id, dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
    } else {
      this.modalidadesService.createModalidades(dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
    }
  }

}
