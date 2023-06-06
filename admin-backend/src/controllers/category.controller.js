import { HTTP_STATUS } from '../common/constant.js';
import CategoryService from '../services/category.service.js';
import { response } from '../utility/helpers.js';

class CategoryController {
    constructor() {
        this.categoryService = new CategoryService();
    }

    add = async (req, res) => {
        try {
            const request = req.body;

            const result = await this.categoryService.add(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'category_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'category_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    get = async (req, res) => {
        try {
            const result = await this.categoryService.get();
            if (result) {
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
    deleteCategory = async (req, res) => {
        try {
          const id = req?.params?.id;
          const result = await this.categoryService.delete(id);
          if (result) {
            response(res, HTTP_STATUS.SUCCESS, "banner_deleted", result);
            return;
          }
          response(res, HTTP_STATUS.BAD_REQUEST, "banner_bad_request");
          return;
        } catch (error) {
          response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
          return;
        }
      };

      updateCategory = async (req, res) => {
        try {
          const id = req.params.id;
          const request = req.body;
          const result = await this.categoryService.update(id, request);
          if (result) {
            response(res, HTTP_STATUS.SUCCESS, "banner_update", result);
            return;
          }
          response(res, HTTP_STATUS.BAD_REQUEST, "banner_bad_request");
          return;
        } catch (error) {
          response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
          return;
        }
      };

      getById = async (req, res) => {
        try {
          const id = req.params.id;
          const result = await this.categoryService.getCategoryById(id);
          if (result) {
            response(res, HTTP_STATUS.SUCCESS, "categoryr_get", result);
            return;
          }
          response(res, HTTP_STATUS.BAD_REQUEST, "category_bad_request");
          return;
        } catch (error) {
          response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
          return;
        }
      };
}

export default CategoryController;
