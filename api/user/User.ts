import { Password } from './Password';
import { Email } from './Email';
import { generateUuid } from '../../util/uuidv4';

export default class User {
    readonly uuid: string;

    constructor(
        readonly email: string, 
        readonly password: string,
        readonly name: string,
        readonly lastName: string)
    {
        this.email = Email(email);
        this.password = Password(password);
        this.uuid = generateUuid();
    }
}