import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import multer from 'multer';
import { storage, fileFilter } from './util/multer';
import path from 'path';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(multer({
    storage,
    fileFilter
}).single('image'));

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'public')));

export default app;