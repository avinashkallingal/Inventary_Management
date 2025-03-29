import jwt from 'jsonwebtoken';
import config from '../../../infrastructure/config/config';
import { userPayload } from '../../../domain/entities/Iuser';
import { Ijwt } from '../../../domain/utils/Ijwt';


export class JWT implements Ijwt{

    generateToken = (user: userPayload):{ accessToken:string, refreshToken:string } => {

        console.log(user,"token generated");
    
        const payload = {
            id: user.id,
            email: user.email,
        }
    
        const options = {
            expiresIn: 900
        }
    
        const accessToken = jwt.sign(payload, config.JWT_KEY as string, options);
        const refreshToken = jwt.sign(payload, config.JWT_KEY as string, { expiresIn: '7d' });
    
        console.log(accessToken,refreshToken," access token and refresh token in jwt fuction")
        return { accessToken, refreshToken }
    }
}
