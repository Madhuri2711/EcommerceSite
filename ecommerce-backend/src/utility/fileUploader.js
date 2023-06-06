import multer from 'multer';
import path from 'path';
import Product from '../models/products';


// Create a multer storage configuration
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../uploads');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        callback(null, `image-${uniqueSuffix}${extension}`);
    }
});

// Create a multer upload middleware
const upload = multer({ storage: imgconfig });
export default upload;

// Assuming you have an Express app and a route for uploading an image and associating it with a product
// app.post('/product/:id/upload', upload.single('image'), async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const image = {
//             data: req.file.buffer, // Get the image data from the request buffer
//             contentType: req.file.mimetype // Get the image content type
//         };

//         // Find the product by ID
//         const product = await Product.findById(productId);

//         // Add the uploaded image to the product's images array
//         product.images.push(image);

//         // Save the product with the new image
//         await product.save();

//         res.status(200).json({ message: 'Image uploaded and associated with the product!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to upload image.' });
//     }
// });




// import aws from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import path from 'path';
// import AWS from '../config/aws.config.js';

// const { region, secretAccessKey, accessKeyId, bucketName } = AWS;
// aws.config.update({
//     secretAccessKey,
//     accessKeyId,
//     region
// });

// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: bucketName,
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //use Date.now() for unique file keys
//         }
//     })
// });

// export default upload;