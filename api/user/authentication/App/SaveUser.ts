import User from '../../User';
import Repository from '../Domain/Repository';
import { Encryptor } from './Bcrypt';

export default class SaveUser {
    constructor(
        private readonly dataAccessObject: Repository, 
        private readonly encryptor: Encryptor
    ){}

    public signin = async ({ email, password, name, lastName }: {email: string, password: string, name: string, lastName: string}) => {
        try {
            const userEntity = new User(
                email,
                password,
                name,
                lastName
            );
    
            const emailExists = await this.dataAccessObject.emailFinder(userEntity.email);
    
            if (emailExists) 
                throw {
                    statusCode: 400,
                    message: 'Existing email, choose another'
                };
    
            const newPassword = await this.encryptor.encryptPassword(userEntity.password);
            // eslint-disable-next-line
            this.dataAccessObject.userCreator({
                uuid: userEntity.uuid,
                email: userEntity.email,
                password: newPassword,
                name: userEntity.name,
                lastName: userEntity.lastName
            });

            return true;
        } catch (error) {
            throw {
                statusCode: error.statusCode || 500,
                message: error.message || error
            };
        }
    };
}