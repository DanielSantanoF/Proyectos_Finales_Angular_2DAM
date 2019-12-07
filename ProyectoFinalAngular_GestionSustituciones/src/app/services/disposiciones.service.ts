import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DisposicionesDto } from '../models/disposicionesDto.dto';
import { Disposiciones } from '../models/disposiciones.interface';
import { DisposicionesProfesoresDto } from '../models/disposicionesProfesoresDto.dto';
import { DisposicionesProfesores } from '../models/disposicionesProfesores.interface';

export const collectionName = 'disposiciones';
export const subCollectionMiembros = 'profesores';

@Injectable({
  providedIn: 'root'
})
export class DisposicionesService {

  constructor( private dbFireStore: AngularFirestore ) { }

  public createDisposiciones(dto: DisposicionesDto){
    return this.dbFireStore.collection<Disposiciones>(collectionName).add(dto.transformarDto());
  }

  public getDisposiciones(){
    return this.dbFireStore.collection<Disposiciones>(collectionName, ref =>
    ref.orderBy('id_dia', 'asc')).snapshotChanges();
  }

  public getDisposicionesPorDiaId(nombre: string){
    return this.dbFireStore.collection<Disposiciones>(collectionName, ref =>
    ref.where('nombre_dia', '==', nombre)).snapshotChanges();
  }

  public updateDisposiciones(id: string, data: DisposicionesDto){
    return this.dbFireStore.collection<Disposiciones>(collectionName).doc(id).update(data.transformarDto());
  }

  public deleteDisposiciones(id: string){
    return this.dbFireStore.collection<Disposiciones>(collectionName).doc(id).delete();
  }

  //SUBCOLLECTION PROFESORES
  public getDispProfByElementIdDia(id_dia: string){
    return this.dbFireStore.collection<Disposiciones>(collectionName, ref => 
      ref.where('id_dia', '==', id_dia)).snapshotChanges();
  }

  public getDisposicionesProfesoreByDayId(idCollection: string){
    return this.dbFireStore.doc(`${collectionName}/${idCollection}`)
    .collection(subCollectionMiembros).snapshotChanges();
  }

  public getDisposicionesProfesoreByDayIdAndHour(idCollection: string, hora: string){
    return this.dbFireStore.doc(`${collectionName}/${idCollection}`)
    .collection(subCollectionMiembros, ref => ref.where('id_hora_disponible', '==', hora)).snapshotChanges();
  }

  public createDisposicionesProfesoresByDayId(idCollection:string, dto: DisposicionesProfesoresDto){
    return this.dbFireStore.doc(`${collectionName}/${idCollection}`)
    .collection(subCollectionMiembros).add(dto.transformarDto());
  }

  public deleteDisposicionesProfesoresByDayId(idCollection:string, idProfesores: string){
    return this.dbFireStore.doc(`${collectionName}/${idCollection}`)
    .collection(subCollectionMiembros).doc(idProfesores).delete();
  }

  public updateDisposicionesProfesoresByDayId(idCollection:string, idProfesores: string, dto: DisposicionesProfesoresDto){
    return this.dbFireStore.doc(`${collectionName}/${idCollection}`)
    .collection(subCollectionMiembros).doc(idProfesores).update(dto.transformarDto())
  }

}
