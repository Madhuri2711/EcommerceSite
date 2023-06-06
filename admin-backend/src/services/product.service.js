import ProductModel from "../models/website/products";
import ReviewModel from "../models/website/review.js";
import CommentModel from "../models/website/comment.js";
// import UserModel from '../models/users.js';

class ProductService {
  add = (data) => {
    return ProductModel.create(data);
  };
  search = async (filter, pageLimit, page) => {
    const count = await ProductModel.find(filter);
    return new Promise((resolve) => {
      ProductModel.find(filter)
        .limit(pageLimit)
        .skip((page-1) * pageLimit)
        .sort({ created_date: -1 })
        .exec((err, product) => {
          if (err) {
            console.log(err);
          } else {
            resolve({ count: count?.length || 0, productList: product });
          }
        });
    });
  };

  getById = (filter) => {
    return new Promise((resolve) => {
      ProductModel.findOne(filter).exec((err, product) => {
        if (err) {
          console.log(err);
        } else {
          resolve(product);
        }
      });
    });
  };

  getAllTheReview = (product_id) => {
    return new Promise((resolve) => {
      ReviewModel.find({
        product_id,
      }).exec((err, product) => {
        if (err) {
          console.log(err);
        } else {
          resolve(product);
        }
      });
    });
  };

  getAllComment = (product_id) => {
    return new Promise((resolve) => {
      CommentModel.find({
        product_id,
      }).exec((err, product) => {
        if (err) {
          console.log(err);
        } else {
          resolve(product);
        }
      });
    });
  };

  updateProduct = async (id, data) => {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  };

  isdelete = async(id,data)=>{
      return await ProductModel.findByIdAndUpdate(id,{is_delete:data},{ new: true })
  }
}

export default ProductService;
