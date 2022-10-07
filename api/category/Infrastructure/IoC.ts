import Create from '../App/Create';
import Update from '../App/Update';
import Categories from '../App/Categories';
import { Creator, Updater, AllCategories, CategoryName } from './DataAccessObject';
import Controller from './Controller';

export const createCategoryService = new Create(
    new Creator(), 
    new CategoryName()
);

export const categoriesService = new Categories(new AllCategories());

export const updateCategoryService = new Update(
    new Updater(),
    new CategoryName()
);

export const categoryController = new Controller();