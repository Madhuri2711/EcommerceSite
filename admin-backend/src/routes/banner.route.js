import express from "express";
import BannerController from "../controllers/banner.controller.js";
import upload from "../utility/fileUploader.js";

const bannerRouter = express.Router();
const bannerController = new BannerController();

// Add a new product
bannerRouter.post("/add", bannerController.addBanner);
bannerRouter.get("/:id", bannerController.getBanners);
bannerRouter.delete("/:id", bannerController.deleteBanner);
bannerRouter.put("/:id",  bannerController.updateBanner);
bannerRouter.get("/", bannerController.getAllBanner);
export default bannerRouter;
