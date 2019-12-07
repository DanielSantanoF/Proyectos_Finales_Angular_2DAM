import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TurnosDto } from '../models/turnosDto.dto';
import { Turnos } from '../models/turnos.interface';

export const collectionName = 'turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private dbFirestore: AngularFirestore) { }

  public createTurnos(dto: TurnosDto){
    return this.dbFirestore.collection<Turnos>(collectionName).add(dto.transformarDto());
  }

  public getTurnos() {
    return this.dbFirestore.collection<Turnos>(collectionName, ref =>
      ref.orderBy('peso', 'asc')).snapshotChanges();
  }

  public updateTurnos(id: string, dto: TurnosDto) {
    return this.dbFirestore.collection<Turnos>(collectionName).doc(id).update(dto.transformarDto());
  }

  public deleteTurnos(id: string) {
    return this.dbFirestore.collection<Turnos>(collectionName).doc(id).delete();
  }

  public getTurnosByIdModalidades(id: string){
    return this.dbFirestore.collection<Turnos>(collectionName, ref =>
      ref.where('id_modalidad', '==', id)).snapshotChanges();
  }
}
