import ProductModel from '../models/products.js'
import ReviewModel from '../models/review.js'
import CommentModel from '../models/comment.js'
import UserModel from '../models/users.js'

class ProductService {
  add = (data) => {
    return ProductModel.create(data)
  }

  makeBundle = async (data) => {
    const { products } = data
    const product = await ProductModel.find(
      { _id: { $in: products } },
      { images: 1 },
    )
    const images = product?.map((p) => p?.images[0])
    data.images = images
    data.is_bundled_product = true
    data.is_active = true
    return ProductModel.create(data)
  }

  add_review = (data) => {
    return ReviewModel.create(data)
  }

  get = async (filter, pageLimit, skip) => {
    const count = await ProductModel.find(filter)

    return new Promise((resolve) => {
        ProductModel.find(filter)
            .populate({
                path: 'category_id',
                select: 'name',
            })
            .sort({ created_date: -1 })
            .limit(pageLimit)
            .skip(skip)
            .populate({
                path: 'sub_cat_id',
                select: 'name',
            })
            .populate({
                path: 'products',
            })
            .exec((err, product) => {
                if (err) {
                    console.log(err);
                } else {
                    // resolve({ count: count?.length || 0, productList: product });
                    resolve(product);
                }
            });
    });
  }

  getById = (filter) => {
    return new Promise((resolve) => {
      ProductModel.findOne(filter)
        .populate({
          path: 'category_id',
          select: 'name',
        })
        .populate({
          path: 'sub_cat_id',
          select: 'name',
        })
        .populate({
          path: 'products',
        })
        .populate({
          path: 'created_by',
          select: ['firstName', 'lastName', 'images', 'created_date'],
        })
        .exec((err, product) => {
          if (err) {
            console.log(err)
          } else {
            resolve(product)
          }
        })
    })
  }

  getAllTheReview = (product_id) => {
    return new Promise((resolve) => {
      ReviewModel.find({
        product_id,
      })
        .populate({
          path: 'user_id',
          select: ['firstName', 'lastName', 'email'],
        })
        .exec((err, product) => {
          if (err) {
            console.log(err)
          } else {
            resolve(product)
          }
        })
    })
  }

  getAllComment = (product_id) => {
    return new Promise((resolve) => {
      CommentModel.find({
        product_id,
      })
        .populate({
          path: 'user_id',
          select: ['firstName', 'lastName', 'email', 'image'],
        })
        .exec((err, product) => {
          if (err) {
            console.log(err)
          } else {
            resolve(product)
          }
        })
    })
  }

  compare = (product_id) => {
    return ProductModel.find({ _id: { $in: product_id } })
  }

  search = async (filter, sort, pageLimit, skip) => {
    const count = await ProductModel.find(filter).sort(sort)
    return new Promise((resolve) => {
      ProductModel.find(filter)
        .limit(pageLimit)
        .skip(skip)
        .sort(sort)
        .exec((err, product) => {
          if (err) {
            console.log(err)
          } else {
            resolve({ count: count?.length || 0, productList: product })
          }
        })
    })
  }

  autoSuggest = async (filter) => {
    return new Promise((resolve) => {
      ProductModel.find(filter)
        .limit(10)
        .skip(0)
        .exec((err, product) => {
          const suggestedProduct = product?.map((data) => data?.name)
          if (err) {
            console.log(err)
          } else {
            resolve(suggestedProduct)
          }
        })
    })
  }

  update = async (id) => {
    const data = await UserModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true },
    )
    return data
  }

  getProductDetails = (_id) => {
    return ProductModel.findOne({
      _id,
    })
  }

  isProductReviewExist = async (user_id, product_id) => {
    return ReviewModel.find({
      user_id,
      product_id,
    })
  }

  deleteProduct = async (id, user) => {
    const product = await ProductModel.findOne({
      _id: id,
      created_by: user,
    })
    if (product) {
      await ProductModel.findByIdAndUpdate(
        id,
        { qty: 0, is_delete: true },
        { new: true },
      )
    }
    return 1
  }

  updateProduct = async (id, data) => {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true })
  }
}

export default ProductService
