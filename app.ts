import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'public')));

export default app;