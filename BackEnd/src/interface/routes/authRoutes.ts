import express from 'express';
import { AuthController } from '../controllers/authController';
import { AuthService } from '../../application/useCases/auth';
import { JWT } from '../../application/services/jwt/jwtCreate';

const Ijwt = new JWT()
const authService = new AuthService(Ijwt)
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser.bind(authController));
authRouter.post('/verifyEmail', authController.verifyEmail.bind(authController));
authRouter.post('/login', authController.login.bind(authController))
authRouter.post('/forgetPassword',authController.forgetPassword.bind(authController));
authRouter.put('/setFortgotPassword/:id',authController.setFortgotPassword.bind(authController));
authRouter.post('/refresh-token', authController.refreshToken.bind(authController))

export default authRouter