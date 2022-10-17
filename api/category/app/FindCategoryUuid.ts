import { CategoryUuidFinder } from '../domain/Repository';

export default class FindCategoryUuid {
    constructor(private readonly uuidFinder: CategoryUuidFinder){}
    
    public existingCategoryUuid = async(uuid: string) => {
        const categoryExists = await this.uuidFinder.getCategory(uuid);

        if (!categoryExists)
            throw {
                statusCode: 404,
                message: 'el identificador no corresponde a ninguna categoría'
            };
    };
}