import firebase from 'firebase';

export class SustitucionesDto {
    apellidos_profesor_ausente: string;
    apellidos_sustituto: string;
    fecha: Date;
    id_aula: string;
    id_profesor_ausente: string;
    id_sustituto: string;
    nombre_aula: string;
    nombre_profesor_ausente: string;
    nombre_sustituto: string;

    constructor(apa:string, as:string, f:Date, idpa: string, ida:string, ids:string, na: string, npa:string, ns:string){
        this.apellidos_profesor_ausente = apa;
        this.apellidos_sustituto = as;
        this.fecha = f;
        this.id_aula = ida;
        this.id_profesor_ausente = idpa;
        this.id_sustituto = ids;
        this.nombre_aula = na;
        this.nombre_profesor_ausente = npa;
        this.nombre_sustituto = ns;
    }

    transformarDto(){
        return {
            apellidos_profesor_ausente: this.apellidos_profesor_ausente,
            apellidos_sustituto: this.apellidos_sustituto,
            fecha: firebase.firestore.Timestamp.fromDate(this.fecha),
            id_aula: this.id_aula,
            id_profesor_ausente: this.id_profesor_ausente,
            id_sustituto: this.id_sustituto,
            nombre_aula: this.nombre_aula,
            nombre_profesor_ausente: this.nombre_profesor_ausente,
            nombre_sustituto: this.nombre_sustituto
        };
    }

}