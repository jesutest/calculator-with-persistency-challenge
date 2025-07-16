import { User } from "../model/User";


export class UserRepository {
    
    constructor() {}

    public async createUser ( username: string, email: string, password: string): Promise<any> {
        try{
            const result: any = await User.create( {
                username: username,
                email: email,
                password: password
            });

            console.log( "User persisted in database" );
            return result;
        }
        catch( e ) {
            console.log( `Error while inserting user record: ${e}` );
        }
    }

    public async getUserEmailAndPassword ( email: string): Promise<any> {
        try{
            const user: any = await User.findOne({
                where: {
                    email: email
                },
                attributes: ['email','password']
            });

            return user;
        }
        catch( e ) {
            console.log( `Error while inserting user record: ${e}` );
        }
    }
}