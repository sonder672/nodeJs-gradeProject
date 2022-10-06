import Repository from '../Domain/Repository';
import { Decrypt } from './Bcrypt';

export default class Login {
    constructor(
        private readonly dataAccessObject: Repository, 
        private readonly decrypt: Decrypt
    ){}

    public signup = async ({email, password}: {email: string, password: string}) => {
        try {
            const existingUser = await this.dataAccessObject.emailAndPasswordFinder(email);
            if (existingUser.length === 0) 
                throw {
                    statusCode: 404,
                    message: 'Wrong email'
                };
            
            const passwordComparer = await this.decrypt.PasswordComparer(
                {passwordEntered: password, passwordRetrieved: existingUser[0].password}
            );

            if (!passwordComparer)
                throw {
                    statusCode: 404,
                    message: 'Wrong password'
                };

            return existingUser[0].uuid;
        } catch(error) {
            throw {
                statusCode: error.statusCode || 500,
                message: error.message || error
            };
        }
    };
}