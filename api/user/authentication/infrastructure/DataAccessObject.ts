import Repository from '../Domain/Repository';
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

    public userCreator = async (user: { uuid:string, email: string, password: string, name: string, lastName: string }): Promise<void> => {
        try {
            await User.insert(user);
        } catch (error) {
            throw {
                statusCode: 500,
                message: error.message || error
            };
        }
    };
}