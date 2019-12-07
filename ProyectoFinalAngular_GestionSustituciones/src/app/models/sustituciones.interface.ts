import firebase from 'firebase';

export interface Sustituciones {
    apellidos_profesor_ausente: string;
    apellidos_sustituto: string;
    fecha: firebase.firestore.Timestamp;
    id_aula: string;
    id_profesor_ausente: string;
    id_sustituto: string;
    nombre_aula: string;
    nombre_profesor_ausente: string;
    nombre_sustituto: string;
}