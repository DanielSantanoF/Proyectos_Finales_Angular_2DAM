export class DisposicionesDto {
    id_dia: string;
    nombre_dia: string;

    constructor(i: string, n: string){
        this.id_dia = i;
        this.nombre_dia = n;
    }

    transformarDto(){
        return {
            id_dia: this.id_dia,
            nombre_dia: this.nombre_dia
        };
    }

}