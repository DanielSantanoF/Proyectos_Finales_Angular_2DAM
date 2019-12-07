export class ModalidadesDto{
    constructor(
        public nombre_acortado: string,
        public nombre_extendido: string,
        public nombre_profesor: string
    ) {}

    transformarDto() {
        return { 
            nombre_acortado: this.nombre_acortado,
            nombre_extendido: this.nombre_extendido,
            nombre_profesor: this.nombre_profesor
        };
    }
}