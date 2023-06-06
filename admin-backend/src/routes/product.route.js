import express from "express";
import ProductController from "../controllers/product.controller.js";
import { addProductValidate } from "../validations/product.validation.js";

const productRouter = express.Router();
const productController = new ProductController();

productRouter.post("/add", addProductValidate, productController.add);
productRouter.post("/search", productController.search);
productRouter.get("/:id", productController.getById);
productRouter.put("/update/:id", productController.update);
productRouter.put("/isdelete/:id", productController.isdelete);


export default productRouter;
