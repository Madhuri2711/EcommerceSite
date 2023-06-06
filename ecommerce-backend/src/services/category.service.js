import CategoryModel from '../models/category.js';

class CategoryService {
    add = (data) => {
        return CategoryModel.create(data);
    };

    get = (data) => {
        return CategoryModel.find({
            isActive: true,
        }).sort({
            order: 1
        });
    };
}

export default CategoryService;
