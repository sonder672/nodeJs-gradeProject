import Color from '../domain/Color';
import { ColorCreator, HexadecimalCodeFinder } from '../domain/Repository';
import FindHexadecimalCodeName from './FindHexadecimalCodeName';

export default class Create {
    constructor(
        private readonly creator: ColorCreator, 
        private readonly hexadecimalCodeFinder: HexadecimalCodeFinder
    ){}

    public saveColor = async(hexadecimalCode: string, name: string) => {
        try {
            const hexadecimal = new FindHexadecimalCodeName(this.hexadecimalCodeFinder);
            await hexadecimal.existingHexadecimalCode(hexadecimalCode);

            const colorEntity = new Color(hexadecimalCode, name);
            const color = await this.creator.saveColor(colorEntity);

            return color;
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}