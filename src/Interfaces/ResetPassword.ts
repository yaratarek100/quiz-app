
export interface IForgetPassword {
    email:string
}

export interface IResetPassword {
    email: string;
    otp: string;
    password: string;

}