import React from "react";
import ReactS3 from 'react-s3';

const awsConfig = {
    accessKeyId: 'AKIAXI4V2IQIN5EGK7OA',
    secretAccessKey: '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',
    region: 'ca-central-1',
    bucketName: 'inani-hub',
    host: 'https://inani-hub.s3.ca-central-1.amazonaws.com/'
};

const TestImage = () => {

    const uploadImage = (event) => {
        let file = event.target.files[0];
        ReactS3.uploadFile(file,awsConfig)
            .then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <h2>Image Upload</h2>
            <input
                type="file"
                onChange={uploadImage} />
        </>
    );
}
export default TestImage;