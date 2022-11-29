import { Product } from '../../../models/Product';
import { ProductFinder, ProductUpdater, PriceFinder, NameFinder } from '../domain/Repository';
import ProductEntity from '../domain/Product';

export class UpdateProduct implements ProductUpdater {
    public updateProduct = async({ uuid, product }: { uuid: string; product: ProductEntity }): Promise<void> => {
        try {
            await Product.update({ uuid }, {
                name: product.name,
                available: product.available,
                price: product.price,
                stock: product.stock,
                category: product.category,
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

}

export class FindProduct implements ProductFinder {
    public getProduct = async(uuid: string): Promise<Product | null> => {
        try {
            return Product.findOneBy({ uuid });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class FindPrice implements PriceFinder {
    public getPrice = async (uuid: string): Promise<number> => {
        try {
            const productPrice = await Product.find({
                select: ['price'],
                where: { uuid }
            });

            return productPrice[0].price;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class FindName implements NameFinder {
    public getName = async (uuid: string): Promise<string> => {
        try {
            const productPrice = await Product.find({
                select: ['name'],
                where: { uuid }
            });

            return productPrice[0].name;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}