import { uploadToBucket, uploadToBucketBase64 } from '../../../util/s3';

export const saveOneImage = async (image) => {
    try {
        const { tempFilePath, name } = image;
        await uploadToBucket(tempFilePath, name);
    } catch (error) {
        throw {
            statusCode: 500,
            meesage: error.message || error
        };
    }
};

export const saveOneImageBase64 = async (imageBase64: string, imageName: string) => {
    try {
        await uploadToBucketBase64(imageBase64, imageName);
    } catch (error) {
        throw {
            statusCode: 500,
            meesage: error.message || error
        };
    }
};


export const saveMultipleImages = async (colorAndImage) => {
    try {
        const manyImages = colorAndImage.map(element => {
            const { imageBase64, imageName } = element;
            return uploadToBucketBase64(imageBase64, imageName);
        });

        await Promise.all([
            manyImages
        ]);
    } catch (error) {
        throw {
            statusCode: 500,
            meesage: error.message || error
        };
    }
};

/* export const getMultipleImages = async (images: Array<string>) => {
    const imagesUploadS3 = images.map(imageComponents => {
        return getFile(imageComponents);
    });

    return await Promise.all(imagesUploadS3);
}; */