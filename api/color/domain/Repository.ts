import Color from './Color';

export interface HexadecimalCodeFinder {
    getHexadecimalCode(hexadecimalCode: string)
}

export interface ColorCreator {
    saveColor(color: Color)
}

export interface ListOfColor {
    getAllColors()
}