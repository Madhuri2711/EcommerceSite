import BannerModel from '../models/banners.js';

class BannerService  {
    getBanner = (data) => {
        return BannerModel.find({
            isActive : true
        })
    }
}

export default BannerService;