import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AulasDto } from '../models/aulasDto.dto';
import { Aulas } from '../models/aulas.interface';

export const collectionName = 'aulas';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  constructor( private dbFireStore: AngularFirestore ) { }

  public createAulas(dto: AulasDto){
    return this.dbFireStore.collection<Aulas>(collectionName).add(dto.transformarDto());
  }

  public getAulas(){
    return this.dbFireStore.collection<Aulas>(collectionName).snapshotChanges();
  }

  public updateAulas(id: string, data: AulasDto){
    return this.dbFireStore.collection<Aulas>(collectionName).doc(id).update(data.transformarDto());
  }

  public deleteAulas(id: string){
    return this.dbFireStore.collection<Aulas>(collectionName).doc(id).delete();
  }

}
