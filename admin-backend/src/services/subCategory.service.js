import SubCategoryModel from "../models/website/subCategory";

class SubCategoryService {
  add = (data) => {
    return SubCategoryModel.create(data);
  };

  getAll = () => {
    return SubCategoryModel.find()
  };
  update = async (id, data) => {
    return await SubCategoryModel.findByIdAndUpdate(id, data, { new: true });
  };
  delete = (id) => {
    return SubCategoryModel.findByIdAndDelete(id);
  };
  get = (_id) => {
    return SubCategoryModel.findOne({
        _id,
    })
};
}

export default SubCategoryService;
