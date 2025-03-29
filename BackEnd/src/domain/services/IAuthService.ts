import { ILogin, IUser } from "../entities/IAuth";

export interface IAuthService {
    register(data: IUser) : Promise<{success:boolean, message: string, user?: IUser}>
    verifyEmail(id: string) :Promise<{success: boolean, message: string, user?: IUser}> 
    login(data: ILogin) :Promise<{success:boolean, message: string, token?:{accessToken:string,refreshToken:string}, userData?: Partial<IUser>}>
    forgetPassword(email: string): Promise<{success:boolean, message:string}>
    setFortgotPassword(pass: string, email: string) :Promise<{success:boolean,message:string}> 
}