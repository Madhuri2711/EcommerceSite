import BannerModel from '../models/banners.js';

class BannerService  {
    addBanner = (data) => {
       return BannerModel.create(data);
    }
    getBanner = (data) => {
        return BannerModel.find({
            isActive : true
        })
    }
}

export default BannerService;