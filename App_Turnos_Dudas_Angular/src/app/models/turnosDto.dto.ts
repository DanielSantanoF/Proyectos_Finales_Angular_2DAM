export class TurnosDto{
    constructor(
        public id_modalidad: string,
        public nombre_modalidad: string,
        public nombre_usuario: string,
        public peso: number,
        public resuleta: boolean
    ) {}

    transformarDto() {
        return { 
            id_modalidad: this.id_modalidad,
            nombre_modalidad: this.nombre_modalidad,
            nombre_usuario: this.nombre_usuario,
            peso: this.peso,
            resuleta: this.resuleta
        };
    }
}