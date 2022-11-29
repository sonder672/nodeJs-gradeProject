import CategoryEntity from './Category';

export interface CategoryUpdater {
    updateCategory({uuid, category}: {uuid: string, category: CategoryEntity }): Promise<void>
}

export interface CategoryUuidFinder {
    getCategory(uuid: string)
}

export interface CategoryNameFinder {
    getNameOfCategory(name: string)
}

export interface CategoryCreator {
    saveCategory(category: CategoryEntity): Promise<void>
}

export interface ListOfCategories {
    getAllCategories()
    getCategoriesToMatch()
}