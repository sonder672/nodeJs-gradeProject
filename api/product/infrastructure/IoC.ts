import { CreateProduct } from './DataAccessObject/CreateProduct';
import { AllProducts } from './DataAccessObject/AllProducts';
import { UpdateProduct, FindProduct } from './DataAccessObjec';
import { FindCategory } from '../../category/infrastructure/DataAccessObject';
import Create from '../app/Create';
import Update from '../app/Update';
import Products from '../app/Products';
import ProductController from './Controller';

export const createProductService = new Create(new CreateProduct(), new FindCategory());

export const updateProductService = new Update(
    new UpdateProduct(), 
    new FindProduct(),
    new FindCategory()
);
    
export const productsService = new Products(new AllProducts());

export const productController = new ProductController();