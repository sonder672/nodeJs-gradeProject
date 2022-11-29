import { ColorCreator, HexadecimalCodeFinder, ListOfColor } from '../domain/Repository';
import ColorEntity from '../domain/Color';
import { ProductColor } from '../../../models/ProductColor';

export class Creator implements ColorCreator {
    public saveColor = async (color: ColorEntity) => {
        try {
            await ProductColor.insert({
                hexadecimalCode: color.hexadecimalCode,
                colorName: color.colorName
            });

            /* return ProductColor.getId; */
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class HexadecimalCode implements HexadecimalCodeFinder {
    public getHexadecimalCode = async (hexadecimalCode: string): Promise<ProductColor | null> => {
        try {
            return ProductColor.findOneBy({ hexadecimalCode });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class AllColors implements ListOfColor {
    public getAllColors = async (): Promise<ProductColor[]> => {
        try {
            const colors = await ProductColor.find();

            return colors;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}