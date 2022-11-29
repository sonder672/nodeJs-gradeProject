import { generateUuid } from '../../../util/uuidv4';

export default class CustomGarments {
    readonly namePersonalization: string;

    constructor(
        readonly status: boolean,
        readonly imageBase64: string,
        readonly description?: string, 
        readonly user?: string)
    {
        this.namePersonalization = 'custom' + generateUuid();
    }
}