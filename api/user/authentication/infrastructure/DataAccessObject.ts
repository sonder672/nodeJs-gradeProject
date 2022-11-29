import Repository from '../Domain/Repository';
import UserEntity from '../../User';
import { User } from '../../../../models/User';

export default class DataAccessObject implements Repository {
    public emailAndPasswordFinder = async (email: string): Promise<User[]> => {
        try {
            const passwordAndEmailUser = await User.find({
                where: {
                    email,
                },
                select: ['password', 'uuid']
            });
    
            return passwordAndEmailUser;
        } catch(error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };

    public emailFinder = async (email: string): Promise<boolean> => {
        const userEmail = await User.findOneBy({ email });
        if (!userEmail) return false;
        return true;
    };

    public userCreator = async (userEntity: UserEntity): Promise<void> => {
        try {
            await User.insert(userEntity);
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}