import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AulasService } from 'src/app/services/aulas.service';
import { AulasDto } from 'src/app/models/aulasDto.dto';

export interface DatosEntradaDialogData {
  edit: boolean;
  localizacion: string;
  nombre: string;
  id: string;
}

@Component({
  selector: 'app-aulas-nuevo-dialog',
  templateUrl: './aulas-nuevo-dialog.component.html',
  styleUrls: ['./aulas-nuevo-dialog.component.scss']
})
export class AulasNuevoDialogComponent implements OnInit {

  editando: boolean;
  localizacion: string;
  nombre: string;
  id: string;

  constructor(public dialogRef: MatDialogRef<AulasNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialogData,
    private aulasService: AulasService) { }

  ngOnInit() {
    this.editando = this.data.edit;
      if(this.editando) {
        this.localizacion = this.data.localizacion;
        this.nombre = this.data.nombre;
        this.id = this.data.id;
      }
  }

  cerrarDialog(){
    this.dialogRef.close(null);
  }

  doRegistrar(){
    const dto = new AulasDto(this.localizacion, this.nombre);
    if(this.editando === true){
      this.aulasService.updateAulas(this.id, dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
    } else {
      this.aulasService.createAulas(dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
    }
  }

}
