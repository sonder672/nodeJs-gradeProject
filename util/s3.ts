import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

export const uploadToBucketBase64 = (base64: string, imageName: string) => {
    const imageInBase64 = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ''), 'base64'
    );
    const type = base64.split(';')[0].split('/')[1];
    
    const bucketName: string = config.get('aws.bucketName');
    const uploadParams = {
        Bucket: bucketName,
        Key: imageName,
        Body: imageInBase64,
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    };
    const command = new PutObjectCommand(uploadParams);

    return storage.send(command);
};
/* 
export const getFile = (fileName: string) => {
    if (typeof fileName === 'undefined')
        return;
        
    const bucketName: string = config.get('aws.bucketName');
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName
    });

    return storage.send(command);
}; */