import { Category } from '../../models/Category';
import CategoryEntity from './Category';

export interface CategoryUpdater {
    updateCategory({uuid, category}: {uuid: string, category: CategoryEntity }): Promise<void>
}

export interface CategoryFinder {
    getCategory(uuid: string): Promise<boolean>
}

export interface CategoryNameFinder {
    getNameOfCategory(name: string): Promise<boolean>
}

export interface CategoryCreator {
    saveCategory(category: CategoryEntity): Promise<void>
}

export interface ListOfCategories {
    getAllCategories(): Promise<Category[]>
}