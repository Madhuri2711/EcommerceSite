import CategoryModel from "../models/website/category";

class CategoryService {
  add = (data) => {
    return CategoryModel.create(data);
  };

  get = () => {
    return CategoryModel.find();
  };

  delete = (id) => {
    return CategoryModel.findByIdAndDelete(id);
  };

  update = async (id, data) => {
    return await CategoryModel.findByIdAndUpdate(id, data, { new: true });
  };

  getCategoryById = async (_id) => {
    return await CategoryModel.findOne({
      _id,
    });
  };
}

export default CategoryService;
