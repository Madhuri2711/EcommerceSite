import BannerModel from '../models/website/banner.js';

class BannerService  {
    addBanner = (data) => {
       return BannerModel.create(data);
    }
    getBanner = (_id) => {
        return BannerModel.findOne({
            _id,
        })
    };
    delete = (id) =>{
            return BannerModel.findByIdAndDelete(id)
    }

    update = async(id,data) =>{
        return await BannerModel.findByIdAndUpdate(id, data, { new: true })
    }

    getAllData = async() =>{
        return await BannerModel.find()
    }
}

export default BannerService;