import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Profesores } from '../models/profesores.interface';
import { ProfesoresSignInDto } from '../models/profesoresSignInDto.dto';
import { ProfesoresDto } from '../models/profesoresDto.dto';

export const collectionNameProfesores = 'profesores';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, 
    private dbFireStore: AngularFirestore) { }

    googleLogin(){
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
  
    setLocalData(uid: string, nombre: string, email: string, photo: string){
      localStorage.setItem('uid', uid);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('email', email);
      localStorage.setItem('photo', photo);
    }

    logout(){
      localStorage.removeItem('uid');
      localStorage.removeItem('nombre');
      localStorage.removeItem('email');
      localStorage.removeItem('photo');
      localStorage.removeItem('dayId');
      return this.afAuth.auth.signOut();
    }

    getLocalData(key: string){
      return localStorage.getItem(key);
    }

    public getUser(){
      const uid = localStorage.getItem('uid');
      return this.dbFireStore.collection(collectionNameProfesores).doc<Profesores>(uid).valueChanges();
    }

    public updateProfesoresLogueado(id, data: ProfesoresSignInDto){
      return this.dbFireStore.collection<Profesores>(collectionNameProfesores).doc(id).update(data.transformarDto());
    }

    public saveProfesoresLogueado(id, data: ProfesoresDto){
      return this.dbFireStore.collection<Profesores>(collectionNameProfesores).doc(id).set(data.transformarDto());
    }


}
