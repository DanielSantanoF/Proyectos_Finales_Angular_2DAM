export class ProfesoresDto {
    activo: boolean;
    apellidos: string;
    email: string;
    nombre: string;
    telefono: string;

    constructor(a: boolean, ap: string, em: string, nom: string, tel: string){
        this.activo = a;
        this.apellidos = ap;
        this.email = em;
        this.nombre = nom;
        this.telefono = tel;
    }

    transformarDto(){
        return {
            activo: this.activo,
            apellidos: this.apellidos,
            email: this.email,
            nombre: this.nombre,
            telefono: this.telefono
        };
    }

}