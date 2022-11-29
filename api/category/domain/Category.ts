import { generateUuid } from '../../../util/uuidv4';

export default class Category {
    readonly uuid: string;
    
    constructor(readonly name: string, readonly image) {
        this.uuid = generateUuid();
    }
}