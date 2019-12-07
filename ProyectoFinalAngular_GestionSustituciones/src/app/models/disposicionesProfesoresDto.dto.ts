export class DisposicionesProfesoresDto {
    apellidos: string;
    id_hora_disponible: string;
    id_profesor: string;
    nombre: string;

    constructor(a:string, idH: string, idP: string, n: string){
        this.apellidos = a;
        this.id_hora_disponible = idH;
        this.id_profesor = idP;
        this.nombre = n;
    }

    transformarDto(){
        return {
            apellidos: this.apellidos,
            id_hora_disponible: this.id_hora_disponible,
            id_profesor: this.id_profesor,
            nombre: this.nombre
        };
    }

}