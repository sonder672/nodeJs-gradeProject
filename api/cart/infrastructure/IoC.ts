import Create from '../app/Create';
import { FindProduct, FindPrice } from '../../product/infrastructure/DataAccessObjec';
import Controller from './Controller';

export const create = new Create(
    new FindProduct(),
    new FindPrice()
);

export const cartController = new Controller();