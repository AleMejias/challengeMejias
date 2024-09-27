export interface User {
    username:       string;
    rol:            Roles.USER | Roles.ADMIN; 
}
export interface FullUser extends User{
    password:       string;
    token:          string;
}
export enum Roles {
    USER    =   'user',
    ADMIN   =   'admin'
}