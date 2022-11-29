import { HexadecimalCodeFinder } from '../domain/Repository';

export default class FindHexadecimalCodeName {
    constructor(private readonly finder: HexadecimalCodeFinder){}
    
    public existingHexadecimalCode = async(hexadecimalCode: string) => {
        const hexadecimalCodeExists = await this.finder.getHexadecimalCode(hexadecimalCode);

        if (hexadecimalCodeExists)
            throw {
                statusCode: 422,
                message: 'El color ya existe, elige otro'
            };
    };
}