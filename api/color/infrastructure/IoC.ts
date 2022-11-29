import Create from '../app/Create';
import Colors from '../app/Colors';
import { Creator, AllColors, HexadecimalCode } from './DataAccessObject';
import Controller from './Controller';

export const createColorService = new Create(
    new Creator(), 
    new HexadecimalCode()
);

export const colorsService = new Colors(new AllColors());

export const colorController = new Controller();