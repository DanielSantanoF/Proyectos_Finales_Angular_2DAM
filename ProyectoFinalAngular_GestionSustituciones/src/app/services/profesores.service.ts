import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profesores } from '../models/profesores.interface';
import { ProfesoresDto } from '../models/profesoresDto.dto';

export const collectionName = 'profesores';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor( private dbFireStore: AngularFirestore ) { }

  public createProfesores(dto: ProfesoresDto){
    return this.dbFireStore.collection<Profesores>(collectionName).add(dto.transformarDto());
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

  public getProfesoresByApellidosAndNombre(a:string, n: string){
    return this.dbFireStore.collection<Profesores>(collectionName, ref => 
      ref.where('apellidos', '==', a).where('nombre', '==', n))
      .snapshotChanges();
  }

  public postHistoricoProfesoresToProfesores(id, data: ProfesoresDto){
    return this.dbFireStore.collection<Profesores>(collectionName).doc(id).set(data.transformarDto());
  }

}
