import { HTTP_STATUS, PRODUCT_FILTER_SORT } from "../common/constant.js";
import ProductService from "../services/product.service.js";
import { response } from "../utility/helpers.js";
import tokenInfo from "../utility/jwt/tokenInfo.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  add = async (req, res) => {
    try {
      const user = tokenInfo(req, res);
      const request = req.body;
      request.created_by = user.id;
      request.created_date = new Date();
      const result = await this.productService.add(request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "product_uploaded", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "product_not_uploaded");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  search = async (req, res) => {
    try {
      const user = tokenInfo(req, res);
      const {
        search,
        category_id,
        sub_cat_id,
        qty,
        min,
        max,
        pageLimit,
        page,
      } = req?.body;
      const filter = {
        $or: [{ name: { $regex: search, $options: "i" } }],

        qty: {
          $gte: qty || 0,
        },
        is_delete: {
          $ne: true,
        },
      };

      if (category_id && category_id !== "") {
        filter.category_id = category_id;
      }

      if (sub_cat_id && sub_cat_id !== "") {
        filter.sub_cat_id = sub_cat_id;
      }

      if (min && max) {
        filter.price = {
          $gte: (min || 0),
          $lte: (max || 9999999),
        };
      } else if (min) {
        filter.price = { $gte: (min || 0) };
      } else if (max) {
        filter.price = { $lte: (max || 9999999) };
      }

      try {
        var product = await this.productService.search(filter, pageLimit, page);
      } catch (error) {
        console.log('error', error);
        response(
          res,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "internal_server_error"
        );
        return;
      }

      if (product) {
        response(res, HTTP_STATUS.SUCCESS, "product_search", product);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "product_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  getById = async (req, res) => {
    try {
      const user = tokenInfo(req, res);
      const _condition = {
        _id: req.params.id,
        is_delete: false,
      };
      const product = await this.productService.getById(_condition);
      if (product) {
        var reviews = await this.productService.getAllTheReview(product._id);
        const comments = await this.productService.getAllComment(product._id);
        response(res, HTTP_STATUS.SUCCESS, "product_get", {
          ...product._doc,
          reviews,
          comments,
        });
        return;
      } else {
        response(res, HTTP_STATUS.BAD_REQUEST, "product_deleted");
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "product_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  update = async (req, res) => {
    try {
      const request = req.body;
      const product_id = req?.params?.id;
      const result = await this.productService.updateProduct(
        product_id,
        request
      );
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "product_updated_success", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "product_not_updated");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  isdelete = async (req, res) => {
    try {
      const id = req.params.id;
      const request = req.body.is_delete;

      const result = await this.productService.isdelete(id, request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "product_delete_success", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "product_not_updated");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
}

export default ProductController;
