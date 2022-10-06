import { Decrypt, Encryptor } from '../App/Bcrypt';
import bcrypt from 'bcrypt';

export class PasswordFilter implements Encryptor, Decrypt {
    public PasswordComparer = async ({passwordEntered, passwordRetrieved}: {passwordEntered: string, passwordRetrieved: string}): Promise<boolean> => {
        const compared = await bcrypt.compare(passwordEntered, passwordRetrieved);
        if (!compared) return false;
        
        return true;
    };

    public encryptPassword = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt);

        return hash;
    };
}