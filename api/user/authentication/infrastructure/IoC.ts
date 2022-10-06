import SaveUser from '../App/SaveUser';
import Login from '../App/Login';
import { PasswordFilter } from './PasswordFilter';
import DataAccessObject from './DataAccessObject';
import Controller from './Controller';

export const saveUser = new SaveUser(
    new DataAccessObject(),
    new PasswordFilter()
);

export const logIn = new Login(
    new DataAccessObject(),
    new PasswordFilter()
);

export const authenticationController = new Controller();