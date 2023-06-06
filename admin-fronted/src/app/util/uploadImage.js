import AWS from 'aws-sdk';
import awsConfig from '../config/awsConfig';

AWS.config.update({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey
})

const myBucket = new AWS.S3({
    params: { Bucket: awsConfig.bucketName },
    region: awsConfig.region,
})

const uploadImage = (file) => {
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: awsConfig.bucketName,
        Key: file.name
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
        })
        .send((err) => {
            if (err) console.log(err)
        })
}

export default uploadImage;