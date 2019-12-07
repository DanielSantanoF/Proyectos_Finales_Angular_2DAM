import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalidadesDto } from '../models/modalidadesDto.dto';
import { Modalidades } from '../models/modalidades.interface';

export const collectionName = 'modalidades';

@Injectable({
  providedIn: 'root'
})
export class ModalidadesService {

  constructor(private dbFirestore: AngularFirestore) { }

  public createModalidades(dto: ModalidadesDto){
    return this.dbFirestore.collection<Modalidades>(collectionName).add(dto.transformarDto());
  }

  public getModalidades() {
    return this.dbFirestore.collection<Modalidades>(collectionName).snapshotChanges();
  }

  public updateModalidades(id: string, dto: ModalidadesDto) {
    return this.dbFirestore.collection<Modalidades>(collectionName).doc(id).update(dto.transformarDto());
  }

  public deleteModalidades(id: string) {
    return this.dbFirestore.collection<Modalidades>(collectionName).doc(id).delete();
  }
}
