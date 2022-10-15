import { ProductFinder } from '../domain/Repository';

export default class FindProductUuid {
    constructor(private readonly uuidFinder: ProductFinder){}
    
    public existingProductUuid = async(uuid: string) => {
        const productExists = await this.uuidFinder.getProduct(uuid);

        if (!productExists)
            throw {
                statusCode: 404,
                message: 'the identifier does not correspond to any product'
            };
    };
}