import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { Category } from './models/Category';
import { Product } from './models/Product';
import config from 'config';
import { ProductImages } from './models/ProductImages';
import { Lead } from './models/Lead';
import { ProductColor } from './models/ProductColor';
import { Role } from './models/Role';
import { CustomGarments } from './models/CustomGarments';

export default new DataSource({
    type: 'postgres',
    host: config.get('db.host'),
    port: config.get('db.port'),
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    entities: [User, Category, Product, ProductImages, Lead, ProductColor, Role, CustomGarments],
    synchronize: true,
    logging: false
});