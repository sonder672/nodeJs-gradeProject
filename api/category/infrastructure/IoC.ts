import Create from '../app/Create';
import Update from '../app/Update';
import Categories from '../app/Categories';
import { Creator, Updater, AllCategories, CategoryName, FindCategory } from './DataAccessObject';
import Controller from './Controller';

export const createCategoryService = new Create(
    new Creator(), 
    new CategoryName()
);

export const categoriesService = new Categories(new AllCategories());

export const updateCategoryService = new Update(
    new Updater(),
    new CategoryName(),
    new FindCategory()
);

export const categoryController = new Controller();