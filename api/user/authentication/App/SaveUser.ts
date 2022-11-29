import User from '../../User';
import Repository from '../Domain/Repository';
import { Encryptor } from './Bcrypt';

export default class SaveUser {
    constructor(
        private readonly dataAccessObject: Repository, 
        private readonly encryptor: Encryptor
    ){}

    public signin = async ({ email, password, name, lastName }: {email: string, password: string, name: string, lastName: string}) => {
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
                message: 'Correo electrónico existente, escoja otro'
            };

        const newPassword = await this.encryptor.encryptPassword(userEntity.password);
        userEntity.password = newPassword;
        // eslint-disable-next-line
        this.dataAccessObject.userCreator(userEntity);

        return true;
    };
}