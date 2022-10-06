import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import config from 'config';

export default new DataSource({
    type: 'postgres',
    host: config.get('db.host'),
    port: config.get('db.port'),
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.name'),
    entities: [User],
    synchronize: true,
    logging: false
});