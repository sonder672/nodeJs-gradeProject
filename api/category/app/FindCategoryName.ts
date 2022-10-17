import { CategoryNameFinder } from '../domain/Repository';

export default class FindCategoryName {
    constructor(private readonly finder: CategoryNameFinder){}
    
    public existingCategoryName = async(name: string) => {
        const categoryNameExists = await this.finder.getNameOfCategory(name);

        if (categoryNameExists)
            throw {
                statusCode: 422,
                message: 'El nombre ya existe, elige otro para tu categoría'
            };
    };
}