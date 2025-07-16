import { UserRepository } from "../repository/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    
    private readonly userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    public async createUser ( username: string, email: string, password: string): Promise<any | undefined> {
    
        try {
            console.log('reached the user service');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await this.userRepository.createUser(
                username,
                email,
                hashedPassword
            );

            console.log('User created succesfully');

            return {
                message: 'User created succesfully'
            };

        } catch (error) {
            console.log('Exception ocurred: ', error )
            return undefined;
        }
 
    }

    public async login ( email: string, password: string): Promise<any | undefined> {
    
        try {
            console.log('Reached the verifyUser service');

            const user = await this.userRepository.getUserEmailAndPassword(email);

            const isPasswordCorrect = await bcrypt.compare( password, user.password );

            const privateKey = process.env.PRIVATE_KEY;

            if( isPasswordCorrect && privateKey ) {

                console.log('Generating JWT for user');
                const generatedJwt = jwt.sign( { email: user.email }, privateKey );

                return {
                    message: 'User succesfully logged in',
                    jwt: generatedJwt 
                }
            }
            
            return undefined;
            

        } catch (error) {
            console.log('Exception ocurred: ', error )
            return undefined;
        }
 
    }

    public verifyJwt(){
        
    }
    
}
