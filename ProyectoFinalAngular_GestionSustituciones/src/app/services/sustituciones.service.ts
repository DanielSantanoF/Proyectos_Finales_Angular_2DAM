import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SustitucionesDto } from '../models/sustitucionesDto.dto';
import { Sustituciones } from '../models/sustituciones.interface';

export const collectionName = 'sustituciones';

@Injectable({
  providedIn: 'root'
})
export class SustitucionesService {

  constructor( private dbFireStore: AngularFirestore ) { }

  public createSustituciones(dto: SustitucionesDto){
    return this.dbFireStore.collection<Sustituciones>(collectionName).add(dto.transformarDto());
  }

  public getSustituciones(){
    return this.dbFireStore.collection<Sustituciones>(collectionName, ref =>
      ref.orderBy('fecha', 'desc')).snapshotChanges();
  }

  public updateSustituciones(id: string, data: SustitucionesDto){
    return this.dbFireStore.collection<Sustituciones>(collectionName).doc(id).update(data.transformarDto());
  }

  public deleteSustituciones(id: string){
    return this.dbFireStore.collection<Sustituciones>(collectionName).doc(id).delete();
  }

}
