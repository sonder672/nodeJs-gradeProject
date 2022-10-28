import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import config from 'config';

const region: string = config.get('aws.region');
const accessKeyId: string = config.get('aws.accessKey');
const secretAccessKey: string = config.get('aws.secretKey');

const storage = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

export const uploadToBucket = (tempFilePath: string, imageName: string) => {
    const stream = fs.createReadStream(tempFilePath);
    const bucketName: string = config.get('aws.bucketName');
    const uploadParams = {
        Bucket: bucketName,
        Key: imageName,
        Body: stream
    };
    const command = new PutObjectCommand(uploadParams);

    return storage.send(command);
};

export const getFile = (fileName: string) => {
    if (typeof fileName === 'undefined')
        return;
        
    const bucketName: string = config.get('aws.bucketName');
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName
    });

    return storage.send(command);
};