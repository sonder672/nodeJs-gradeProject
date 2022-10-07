import { Category } from '../../models/Category';

export interface CategoryUpdater {
    updateCategory(category: { uuid: string, name: string }): Promise<void>
}

export interface CategoryFinder {
    getCategory(uuid: string): Promise<Category[]>
}

export interface CategoryNameFinder {
    getNameOfCategory(name: string): Promise<boolean>
}

export interface CategoryCreator {
    saveCategory(category: { uuid: string, name: string }): Promise<void>
}

export interface ListOfCategories {
    getAllCategories(): Promise<Category[]>
}