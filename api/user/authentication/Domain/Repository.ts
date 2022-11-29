import { User } from '../../../../models/User';
import UserEntity from '../../User';

export default interface Repository {
    emailFinder(email: string): Promise<boolean>;
    emailAndPasswordFinder(email: string): Promise<User[]>;
    userCreator(userEntity: UserEntity): Promise<void>;
// eslint-disable-next-line semi
}