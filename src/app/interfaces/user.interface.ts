export interface UserInterface {
    token?: string;
    nombres: string;
    apellidos: string;
    cedula: string;
    correo: string;
    telefono: string;
    password?: string;
}
export interface VerifyCodeUserInterface {
    correo: string;
    code: string;
}
