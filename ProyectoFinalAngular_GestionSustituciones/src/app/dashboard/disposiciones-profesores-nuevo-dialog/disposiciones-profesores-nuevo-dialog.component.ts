import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DisposicionesService } from 'src/app/services/disposiciones.service';
import { DisposicionesProfesoresDto } from 'src/app/models/disposicionesProfesoresDto.dto';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { Profesores } from 'src/app/models/profesores.interface';

export interface DatosEntradaDialogData {
  edit: boolean;
  id_dia: string;
  apellidos: string;
  id_hora_disponible: string;
  id_profesor: string;
  nombre: string;
  id: string;
}

@Component({
  selector: 'app-disposiciones-profesores-nuevo-dialog',
  templateUrl: './disposiciones-profesores-nuevo-dialog.component.html',
  styleUrls: ['./disposiciones-profesores-nuevo-dialog.component.scss']
})
export class DisposicionesProfesoresNuevoDialogComponent implements OnInit {

  editando: boolean;
  id_dia: string;
  apellidos: string;
  id_hora_disponible: string;
  id_profesor: string;
  nombre: string;
  id: string;

  listaProfesores: DocumentosFirestore<Profesores>[];

  constructor(public dialogRef: MatDialogRef<DisposicionesProfesoresNuevoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DatosEntradaDialogData,
    private disposicionesService: DisposicionesService,
    private profesoresService: ProfesoresService) { }

  ngOnInit() {
    this.id_dia = this.data.id_dia;
    this.editando = this.data.edit;
    if (this.editando) {
      this.apellidos = this.data.apellidos;
      this.id_hora_disponible = this.data.id_hora_disponible;
      this.id_profesor = this.data.id_profesor;
      this.nombre = this.data.nombre;
      this.id = this.data.id;
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

  cerrarDialog() {
    this.dialogRef.close(null);
  }

  doRegistrar() {
    this.listaProfesores.forEach(((element, index, array) => {
      if (element.id == this.id_profesor) {
        this.nombre = element.data.nombre;
        this.apellidos = element.data.apellidos;
      }
    }));
    if (this.editando === true) {
      const dto = new DisposicionesProfesoresDto(this.apellidos, this.id_hora_disponible, this.id_profesor, this.nombre);
      this.disposicionesService.updateDisposicionesProfesoresByDayId(this.id_dia, this.id, dto).then(resp => {
        this.dialogRef.close(true);
      }).catch(respError => {
        this.dialogRef.close(false);
      });
    } else {
      this.profesoresService.getProfesoresByApellidosAndNombre(this.apellidos, this.nombre).subscribe(resp => {
        const dto = new DisposicionesProfesoresDto(this.apellidos, this.id_hora_disponible, resp[0].payload.doc.id, this.nombre);
        this.disposicionesService.createDisposicionesProfesoresByDayId(this.id_dia, dto).then(resp => {
          this.dialogRef.close(true);
        }).catch(respError => {
          this.dialogRef.close(false);
        });
      })
    }
  }

}
