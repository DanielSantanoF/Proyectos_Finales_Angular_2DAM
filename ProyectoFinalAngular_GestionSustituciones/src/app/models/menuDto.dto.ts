export class MenuDto {
    icono: string;
    nombre: string;
    descripcion: string;
    enlace: string;

    constructor(i: string, n:string, d:string, e:string){
        this.icono = i;
        this.nombre = n;
        this.descripcion = d;
        this.enlace = e;
    }

}