import { Password } from './Password';
import { Email } from './Email';
import { generateUuid } from '../../util/uuidv4';

export default class User {
    readonly uuid: string;
    readonly role = 1;

    constructor(
        readonly email: string, 
        public password: string,
        readonly name: string,
        readonly lastName: string)
    {
        this.email = Email(email);
        this.password = Password(password);
        this.uuid = generateUuid();
    }
}