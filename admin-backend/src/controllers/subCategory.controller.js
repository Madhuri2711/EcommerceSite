import { HTTP_STATUS } from '../common/constant.js';
import SubCategoryService from '../services/subCategory.service.js';
import { response } from '../utility/helpers.js';

class SubCategoryController {
    constructor() {
        this.subCategoryService = new SubCategoryService();
    }

    add = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.subCategoryService.add(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'sub_category_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'sub_category_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getAll = async (req, res) => {
        try {
            const result = await this.subCategoryService.getAll();
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

    get = async (req, res) => {
        try {
            const id = req.params.id
            const result = await this.subCategoryService.get(id);
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

    update = async (req, res) => {
        try {
            const request = req.body;
            const id = req.params.id
            const result = await this.subCategoryService.update(id,request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'sub_category_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'sub_category_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    delete = async (req, res) => {
        try {
          const id = req?.params?.id;
          const result = await this.subCategoryService.delete(id);
          if (result) {
            response(res, HTTP_STATUS.SUCCESS, "sub_category_deleted", result);
            return;
          }
          response(res, HTTP_STATUS.BAD_REQUEST, "sub_category_request");
          return;
        } catch (error) {
          response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
          return;
        }
      };
}

export default SubCategoryController;
