import multer, { FileFilterCallback } from 'multer';
import path from 'path';
//import crypto from 'crypto';

export const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'public', 'uploads'),
    filename: (_request, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}`;

        return callback(null, fileName);
    },
});

export const fileFilter = (_req, file: Express.Multer.File, callback: FileFilterCallback): void => {
    const filteTypes = /png/;
    const mimetype = filteTypes.test(file.mimetype);
    const extName = filteTypes.test(path.extname(file.originalname));

    if (mimetype && extName) 
        return callback(null, true);

    return callback(null, false);
};