import CustomGarments from '../Domain/CustomGarments';
import { customCreator } from '../Domain/Repository';

export default class Create {
    constructor(
        private readonly creator: customCreator,
    ){}

    public save = async({imageBase64, description, user}: { imageBase64: string, description?: string, user?: string }): Promise<string> => {
        try {
            const customizationEntity = new CustomGarments(
                true, 
                imageBase64,
                description, 
                user
            );
            
            await this.creator.save(customizationEntity);

            return customizationEntity.namePersonalization;
        } catch (error) {
            throw {
                statusCode: error.statusCode,
                message: error.message || error
            };
        }
    };
}