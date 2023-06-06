import { HTTP_STATUS } from '../common/constant.js';
import BannerService from '../services/publicBanner.service';
import { response } from '../utility/helpers.js';

class BannerController {
    constructor() {
        this.bannerService = new BannerService();
    }


    getBanners = async (req, res) => {
        try {
            const banners = await this.bannerService.getBanner()

            if (banners) {
                response(res, HTTP_STATUS.SUCCESS, 'banner_get', banners);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'banner_bad_request');
            return;
        } catch (error) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }
}

export default BannerController;
