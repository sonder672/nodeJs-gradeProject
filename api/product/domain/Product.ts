import { generateUuid } from '../../../util/uuidv4';
import { Available } from './ValueObjects/Available';
import { Price } from './ValueObjects/Price';
import { Stock } from './ValueObjects/Stock';

export default class Product {
    readonly uuid: string;
    readonly available: boolean;

    constructor(
        readonly name: string,
        readonly price: number,
        readonly stock: number,
        readonly categoryUuid: string
    ) 
    {
        this.uuid = generateUuid();
        this.price = Price(this.price);
        this.stock = Stock(this.stock);
        this.available = Available(this.stock);
    }
}