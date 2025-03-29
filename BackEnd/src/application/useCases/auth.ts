import { ILogin, IUser } from "../../domain/entities/IAuth";
import { AuthRepository } from "../../infrastructure/persistance/repository/authRepository";
import { UserRepository } from "../../infrastructure/persistance/repository/userRepositoty";
import { IAuthService } from "../../domain/services/IAuthService";
import { Ijwt } from "../../domain/utils/Ijwt";
import { sendEmailVerification, sendForgotPasswordEmail } from "../../application/services/email/email";
import bcrypt from 'bcrypt';

export class AuthService implements IAuthService{
    private authRepo: AuthRepository
    private userRepo: UserRepository
    private jwt: Ijwt

    constructor(jwt:Ijwt) {
        this.jwt = jwt
        this.authRepo = new AuthRepository();
        this.userRepo = new UserRepository();
    }

    // creating temp user and sending an email to the user for verfication.
    async register(data: IUser) : Promise<{success:boolean, message: string, user?: IUser}> {
        try {
            const email: string = data.email;

            const userFound = await this.authRepo.findByEmail(email);

            if (userFound) {
                return { success: false, message: 'Account already registered with this email address.' };
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);
            const tempUserData = {
                ...data,
                password: hashedPassword
            };

            const tempUser = await this.authRepo.createTempUser(tempUserData);
         
            const tempUserFound:any=await this.authRepo.findTempUser(email)
          
            if (tempUserFound) {
                try {
                    await sendEmailVerification(email,tempUserFound._id);
                    return { success: true, message: 'A verification email has been sent. Please check your inbox to verify your email address.' };
                } catch (emailError) {
                    console.error('Error sending verification email:', emailError);
                    return { success: false, message: 'Error sending verification email. Please try again later.' };
                }
            }
            return { success: false, message: 'There was an issue creating your account. Please try again later.' };
        } catch (error) {
            console.error('Error in registration process:', error);
            return { success: false, message: 'An unexpected error occurred. Please try again later.' };
        }
    }

    // verifying the email and creating new user 
    async verifyEmail(id: string) :Promise<{success: boolean, message: string, user?: IUser}> {
        try {
            const tempUserFound:any = await this.authRepo.findTempUserById(id);
            console.log(tempUserFound,id," temp user found id in verify email and id 5555555555")
            if (!tempUserFound) {
                return { success: false, message: 'Register again' };
            }
            const userFound = await this.authRepo.verifyEmail(tempUserFound.email);

            if (!userFound) {
                return { success: false, message: 'Email not found or already verified.' };
            }
            const userData: IUser = {
                username: userFound.username,
                phone: userFound.phone,
                email: userFound.email,
                password: userFound.password
            };

            const result = await this.authRepo.createNewUser(userData);

            if (result) {
                await this.authRepo.deleteTempUser(userFound.email);
                return { success: true, message: 'Email verified successfully and user created.' };
            } else {
                return { success: false, message: 'Failed to create a new user.' };
            }
        } catch (error) {
            console.error('Error in verifyEmail:', error);
            return { success: false, message: 'An error occurred during email verification.' };
        }
    }

    async login(data: ILogin) :Promise<{success:boolean, message: string, token?:{accessToken:string,refreshToken:string}, userData?: Partial<IUser>}> {
        try {
            const { email, password } = data
            const userFound = await this.authRepo.findByEmail(email);
            if (!userFound) {
                return { success: false, message: 'Invalid Email or Password' }
            }

            const passwordMatch = await bcrypt.compare(password, userFound.password);
            if (!passwordMatch) {
                return { success: false, message: 'Invalid Email or Password' }
            }
            const token = await this.jwt.generateToken({ id: userFound._id?.toString() || "", email: userFound.email });

            const userData = {
                id: userFound._id,
                email: userFound.email,
                name: userFound.username,
                phone: userFound.phone,
                avatar: userFound.avatar || "",
                bio: userFound.bio || ""
            }
            return { success: true, message: "login in successful", token, userData }

        } catch (error) {
            console.error('Error in login:', error);
            return { success: false, message: 'An error occurred during login.' };
        }
    }

    async forgetPassword(email: string): Promise<{success:boolean, message:string}>{
        try {
            const userFound = await this.authRepo.findByEmail(email);
            if (userFound) {
                await sendForgotPasswordEmail(email);
                return {
                    success: true,
                    message: 'A password reset email has been sent. Please follow the instructions to reset your password.'
                };
            } else {
                return {
                    success: false,
                    message: 'No account associated with this email address was found.'
                };
            }
        } catch (error) {
            console.error('Error in forgetPassword:', error);
            return {
                success: false,
                message: 'An unexpected error occurred while processing your request. Please try again later.'
            };
        }
    }

    async setFortgotPassword(pass: string, email: string) :Promise<{success:boolean,message:string}> {
        try {
            console.log(email)
            const userFound = await this.authRepo.findByEmail(email);
            if (!userFound) {
                return { success: false, message: 'Something went wrong, Please try again after time.' }
            } else {
                const hashedPassword = await bcrypt.hash(pass, 10);
                const result = await this.authRepo.resetPassword(hashedPassword, email);
                if (result.success) {
                    return result
                } else {
                    return result
                }
            }
        } catch (error) {
            console.error('Error in setFortgotPassword:', error);
            return {
                success: false,
                message: 'An unexpected error occurred while processing your request. Please try again later.'
            };
        }
    }



}