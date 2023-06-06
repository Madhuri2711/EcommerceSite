import { HTTP_STATUS } from "../common/constant.js";
import BannerService from "../services/banner.service.js";
import { response } from "../utility/helpers.js";

class BannerController {
  constructor() {
    this.bannerService = new BannerService();
  }

  addBanner = async (req, res) => {
    try {
      const request = req.body;
      const result = await this.bannerService.addBanner(request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "banner_uploaded", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "banner_not_uploaded");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");

      return;
    }
  };

  getBanners = async (req, res) => {
    try {
      const id = req.params.id;
      const banners = await this.bannerService.getBanner(id);

      if (banners) {
        response(res, HTTP_STATUS.SUCCESS, "banner_get", banners);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "banner_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
  deleteBanner = async (req, res) => {
    try {
      const id = req?.params?.id;
      const result = await this.bannerService.delete(id);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "banner_deleted", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "banner_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
  updateBanner = async (req, res) => {
    try {
      const id = req.params.id;
      const request = req.body;
      const result = await this.bannerService.update(id, request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "banner_update", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "banner_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  getAllBanner = async (req, res) => {
    try {
      const banners = await this.bannerService.getAllData();
      if (banners) {
        response(res, HTTP_STATUS.SUCCESS, "Allbanner_get", banners);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "Allbanner_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
}

export default BannerController;
