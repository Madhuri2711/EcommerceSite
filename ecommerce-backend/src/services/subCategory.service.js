import SubCategoryModel from '../models/subCategory.js';

class SubCategoryService {
    add = (data) => {
        return SubCategoryModel.create(data);
    };

    get = () => {
        return SubCategoryModel.find().sort({
            name: 1
        });
    };
}

export default SubCategoryService;
