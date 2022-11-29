import { CustomGarments } from '../../../models/CustomGarments';
import CustomGarmentsEntity from '../Domain/CustomGarments';
import { customCreator, userFinder } from '../Domain/Repository';
import { saveOneImageBase64 } from '../../product/infrastructure/MultipleImages';
import dataSource from '../../../database';
import { User } from '../../../models/User';

export class Creator implements customCreator {
    public save = async(customization: CustomGarmentsEntity): Promise<void> => {
        try {
            await saveOneImageBase64(
                customization.imageBase64, 
                customization.namePersonalization
            );

            await CustomGarments.insert({
                status: customization.status,
                namePersonalization: customization.namePersonalization,
                description: customization.description,
                user: customization.user,
            });
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}

export class getCustomGarments implements userFinder {
    public getByUser = async(uuid: string) => {
        try {
            const CustomGarmentsByUser = await dataSource
                .createQueryBuilder()
                .select(['user.uuid', 'customization'])
                .from(User, 'user')
                .innerJoin('user.customizations', 'customization')
                .where('user.uuid = :uuid', {uuid})
                .getMany();
            
            return CustomGarmentsByUser;
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

}



