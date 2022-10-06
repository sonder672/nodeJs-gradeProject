export interface Encryptor {
    encryptPassword(password: string): Promise<string>;
}

export interface Decrypt {
    PasswordComparer(
        {passwordEntered, passwordRetrieved}: 
        {passwordEntered: string, passwordRetrieved: string}
        ): Promise<boolean>;
}