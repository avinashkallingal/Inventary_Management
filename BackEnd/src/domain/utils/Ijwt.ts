import { userPayload } from "../entities/Iuser";

export interface Ijwt {
    generateToken  ( user: userPayload):{ accessToken:string, refreshToken:string } 
}