export class AulasDto {
    localizacion: string;
    nombre: string;

    constructor(l: string, n: string){
        this.localizacion = l;
        this.nombre = n;
    }

    transformarDto(){
        return {
            localizacion: this.localizacion,
            nombre: this.nombre
        };
    }

}