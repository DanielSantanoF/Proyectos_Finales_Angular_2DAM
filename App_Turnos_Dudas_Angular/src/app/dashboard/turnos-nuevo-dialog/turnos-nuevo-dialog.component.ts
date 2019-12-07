import { Component, OnInit, Inject } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirestoreResponse } from 'src/app/models/firestore-response.interface';
import { Modalidades } from 'src/app/models/modalidades.interface';
import { ModalidadesService } from 'src/app/services/modalidades.service';
import { TurnosDto } from 'src/app/models/turnosDto.dto';
import { Turnos } from 'src/app/models/turnos.interface';

export interface DatosEntradaDialogData {
  peso: number
}

@Component({
  selector: 'app-turnos-nuevo-dialog',
  templateUrl: './turnos-nuevo-dialog.component.html',
  styleUrls: ['./turnos-nuevo-dialog.component.scss']
})
export class TurnosNuevoDialogComponent implements OnInit {

  id_modalidad: string;
  nombre_modalidad: string;
  nombre_usuario: string;
  peso: number;

  modalidad: FirestoreResponse<Modalidades>;

  listaTurnos: FirestoreResponse<Turnos>[];
  listaModalidades: FirestoreResponse<Modalidades>[];

  constructor(public dialogRef: MatDialogRef<TurnosNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialogData,
    private turnosService: TurnosService,
    private modalidadesService: ModalidadesService) { }

  ngOnInit() {
    this.peso = this.data.peso + 1;
    console.log(this.peso)
    this.loadModalidades();
    this.loadTurnos();
  }

  loadModalidades() {
    this.modalidadesService.getModalidades().subscribe(modSnapshot => {
      this.listaModalidades = [];
      modSnapshot.forEach((modData: any) => {
        this.listaModalidades.push({
          id: modData.payload.doc.id,
          data: modData.payload.doc.data()
        });
      });
    });
  }

  loadTurnos() {
    this.turnosService.getTurnos().subscribe(turSnapshot => {
      this.listaTurnos = [];
      turSnapshot.forEach((turData: any) => {
        this.listaTurnos.push({
          id: turData.payload.doc.id,
          data: turData.payload.doc.data()
        });
      });
    });
  }

  cerrarDialog(){
    this.dialogRef.close(null);
  }

  doRegistrar(){
    this.id_modalidad = this.modalidad.id;
    this.nombre_modalidad = this.modalidad.data.nombre_extendido;
    this.nombre_usuario = localStorage.getItem('nombre');
    const dto = new TurnosDto(this.id_modalidad, this.nombre_modalidad, this.nombre_usuario, this.peso, false);
      this.turnosService.createTurnos(dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError =>{
        this.dialogRef.close(false);
      });
  }

}
