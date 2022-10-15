import { CategoryNameFinder } from '../domain/Repository';

export default class FindCategoryName {
    constructor(private readonly finder: CategoryNameFinder){}
    
    public existingCategoryName = async(name: string) => {
        const categoryNameExists = await this.finder.getNameOfCategory(name);

        if (categoryNameExists)
            throw {
                statusCode: 400,
                message: 'The name already exists, choose another for your category'
            };
    };
}