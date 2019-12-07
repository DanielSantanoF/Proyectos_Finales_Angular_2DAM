export class UserDto {

    constructor(
        public nombre: string,
        public email: string,
        public photo: string
    ) {}

    transformarDto() {
        return { 
            nombre: this.nombre, 
            email: this.email,
            photo: this.photo
        };
    }
    
}