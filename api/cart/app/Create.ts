import FindProductUuid from '../../product/app/FindProductUuid';
import { ProductFinder, PriceFinder } from '../../product/domain/Repository';
import { Cart } from '../domain/Cart';

export default class Create {
    constructor(
        private readonly findProduct: ProductFinder,
        private readonly findProductPrice: PriceFinder
    ){}

    public saveCart = async ({quantity, productUuid}: {quantity: number, productUuid: string}): Promise<Cart> => {
        try {
            const product = new FindProductUuid(this.findProduct);
            await product.existingProductUuid(productUuid);

            const productPrice = await this.findProductPrice.getPrice(productUuid);

            const cart = new Cart(
                quantity,
                productUuid,
                productPrice
            );

            return cart;
        } catch (error) {
            throw {
                statusCode: error.statusCode || 500,
                message: error.message
            };
        }
    };
}