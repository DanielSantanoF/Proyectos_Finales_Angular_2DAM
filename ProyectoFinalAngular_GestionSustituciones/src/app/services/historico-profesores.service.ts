import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfesoresDto } from '../models/profesoresDto.dto';
import { Profesores } from '../models/profesores.interface';

export const collectionName = 'historicoProfesores';

@Injectable({
  providedIn: 'root'
})
export class HistoricoProfesoresService {

  constructor( private dbFireStore: AngularFirestore ) { }

  public createProfesores(id: string, data: ProfesoresDto){
    return this.dbFireStore.collection<Profesores>(collectionName).doc(id).set(data.transformarDto());
  }

  public getProfesores(){
    return this.dbFireStore.collection<Profesores>(collectionName).snapshotChanges();
  }

  public updateProfesores(id: string, data: ProfesoresDto){
    return this.dbFireStore.collection<Profesores>(collectionName).doc(id).update(data.transformarDto());
  }

  public deleteProfesores(id: string){
    return this.dbFireStore.collection<Profesores>(collectionName).doc(id).delete();
  }

}
