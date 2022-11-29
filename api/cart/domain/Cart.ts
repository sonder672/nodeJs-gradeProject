import { Price } from './Price';
import { Quantity } from './Quantity';
import { generateUuid } from '../../../util/uuidv4';

export class Cart {
    readonly uuid: string;
    
    constructor(
        readonly quantity: number,
        readonly productUuid: string,
        readonly price: number,
        readonly image: string
    )
    {
        this.uuid = generateUuid();
        this.quantity = Quantity(this.quantity);
        this.price = Price(this.quantity, this.price);
    }
}