import { HTTP_STATUS } from '../common/constant.js';
import SubCategoryService from '../services/subCategory.service.js';
import { response } from '../utility/helpers.js';

class publicSubCategoryController {
    constructor() {
        this.subCategoryService = new SubCategoryService();
    }

  

    get = async (req, res) => {
        try {
            const result = await this.subCategoryService.get();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'sub_category_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'sub_category_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };
}

export default publicSubCategoryController;
