import { getFile, uploadToBucket } from '../../../util/s3';

export const saveMultipleImages = async (images) => {
    const imagesUploadS3 = images.map(image => {
        return uploadToBucket(image.tempFilePath, image.name);
    });
    
    try {
        await Promise.all([
            imagesUploadS3
        ]);
    } catch (error) {
        throw {
            statusCode: 500,
            meesage: error.message || error
        };
    }
};

export const getMultipleImages = async (images: Array<string>) => {
    const imagesUploadS3 = images.map(imageComponents => {
        return getFile(imageComponents);
    });

    return await Promise.all(imagesUploadS3);
};