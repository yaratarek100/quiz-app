export interface ILogin_Login{
    email:string,
    password:string
}
export interface ILogin_ProfileData{
    _id:string,
    first_name: string,
    last_name: string,
    email: string,
    status: string,
    role: string
}

export interface IRegister{
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    role:string
}