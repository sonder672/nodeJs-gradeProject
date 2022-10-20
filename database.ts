import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { Category } from './models/Category';
import { Product } from './models/Product';
import config from 'config';
import { ProductImages } from './models/ProductImages';

export default new DataSource({
    type: 'postgres',
    host: config.get('db.host'),
    port: config.get('db.port'),
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    entities: [User, Category, Product, ProductImages],
    synchronize: true,
    logging: false
});