import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TurnosDto } from '../models/turnosDto.dto';
import { Turnos } from '../models/turnos.interface';

export const collectionName = 'historico_turnos';

@Injectable({
  providedIn: 'root'
})
export class HistoricoturnosService {

  constructor(private dbFirestore: AngularFirestore) { }

  public setTurnosInHistoricoTurnos(id: string, dto: TurnosDto){
    return this.dbFirestore.collection<Turnos>(collectionName).doc(id).set(dto.transformarDto());
  }

  public createHistoricoTurnos(dto: TurnosDto){
    return this.dbFirestore.collection<Turnos>(collectionName).add(dto.transformarDto());
  }

  public getHistoricoTurnos() {
    return this.dbFirestore.collection<Turnos>(collectionName, ref =>
      ref.orderBy('peso', 'desc')).snapshotChanges();
  }

  public updateHistoricoTurnos(id: string, dto: TurnosDto) {
    return this.dbFirestore.collection<Turnos>(collectionName).doc(id).update(dto.transformarDto());
  }

  public deleteHistoricoTurnos(id: string) {
    return this.dbFirestore.collection<Turnos>(collectionName).doc(id).delete();
  }
}
