import { uploadToBucket } from '../../../util/s3';

export const MultipleImages = async (images) => {
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