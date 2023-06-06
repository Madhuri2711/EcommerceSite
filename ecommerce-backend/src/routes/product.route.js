import express from 'express';
import ProductController from '../controllers/product.controller.js';
import { addProductValidate } from '../validations/product.validation.js';
import upload from '../utility/fileUploader.js';
import multer from 'multer';
const uploads = multer({dest:"uploads/"});

const productRouter = express.Router();
const productController = new ProductController();

// Add a new product
productRouter.post('/add',uploads.single('img') ,  productController.add);

// Add a product review
productRouter.post('/review', upload.array('images'), productController.review);

// Get product by id
productRouter.get('/:id', productController.getById);

// Get a products list
productRouter.post('/', productController.get);

// product compare
productRouter.post('/compare', productController.compare)

// Product search
productRouter.post('/search', productController.search)

productRouter.post('/auto-suggest', productController.autoSuggest)

productRouter.put('/view/:seller_id', productController.view)

productRouter.post('/make-bundle', productController.makeBundle)

// Delete product
productRouter.delete('/:id', productController.delete)

// Update a new product
productRouter.put('/update/:id', upload.array('images'), productController.update);

productRouter.get('/upload-image', (req,res)=>{
    console.log("kkkkkkkkkk")
});

export default productRouter;
