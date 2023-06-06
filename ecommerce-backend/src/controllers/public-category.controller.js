import { HTTP_STATUS } from '../common/constant.js';
import CategoryService from '../services/category.service.js';
import { response } from '../utility/helpers.js';

class publicCategoryController {
    constructor() {
        this.categoryService = new CategoryService();
    }


    get = async (req, res) => {
        try {
            const result = await this.categoryService.get();
            if (result) {
                console.log(result)
                response(res, HTTP_STATUS.SUCCESS, 'category_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'category_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };
}

export default publicCategoryController;
