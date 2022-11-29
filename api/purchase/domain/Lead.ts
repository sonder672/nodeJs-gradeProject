import { generateUuid } from '../../../util/uuidv4';
import { Cart } from '../../cart/domain/Cart';

export default class Lead {
    readonly uuid: string;
    
    constructor(
        readonly cartContent: Cart,
        readonly number: number
    ) 
    {
        this.uuid = generateUuid();
        this.cartContent = cartContent;
        this.number = number;
    }
}