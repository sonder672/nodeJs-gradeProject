import ProductEntity from './Product';

export interface ProductUpdater {
    updateProduct({ uuid, product }: { uuid: string; product: ProductEntity }): Promise<void>
}

export interface ProductFinder {
    getProduct(uuid: string)
}

export interface ProductCreator {
    saveProduct(product: ProductEntity): Promise<void>
}

export interface ListOfProducts {
    getAllProducts()
    getAllActiveProducts()
    getProductsByCategory(categoryUuid: string)
}

export interface PriceFinder {
    getPrice(uuid: string): Promise<number>;
}

export interface NameFinder {
    getName(uuid: string): Promise<string>;
}