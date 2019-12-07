export class ProfesoresSignInDto {
    email: string;
    nombre: string;

    constructor(em: string, nom: string){
        this.email = em;
        this.nombre = nom;
    }

    transformarDto(){
        return {
            email: this.email,
            nombre: this.nombre
        };
    }

}