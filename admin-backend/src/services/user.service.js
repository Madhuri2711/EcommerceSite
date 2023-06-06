import UserModel from "../models/website/users";
import ProductModel from "../models/website/products";
import BankDetailsModel from "../models/website/bankDetails";
import CommentModel from "../models/website/comment.js";
import AddressModel from "../models/website/address.js";
import CartModel from "../models/website/carts";
import WalletModel from "../models/website/wallet";
import OrdersModel from "../models/website/orders";
import ReviewModel from "../models/website/review";
import WhishlistModel from "../models/website/whishlist";
import MakeOfferModel from "../models/website/makeOffer";
import NotificationModel from "../models/website/notification";

class UserService {
  get = async (filter, pageLimit, page) => {
    const count = await UserModel.find(filter);
    const usersList = await UserModel.find(filter)
      .limit(pageLimit)
      .skip((page - 1) * pageLimit);
    return { count: count?.length || 0, usersList };
  };

  activeAndDeactive = async (id, data) => {
    return await UserModel.findByIdAndUpdate(
      id,
      { isActive: data },
      { new: true }
    );
  };

  update = async (id, data) => {
    return await UserModel.findByIdAndUpdate(
      id,
      { is_delete: data, isActive: false },
      { new: true }
    );
  };


  getUserId = async (_id) => {
    return await UserModel.findOne({
      _id,
    });
  };

  getUserProduct = async (_id) => {
    return await ProductModel.find({
      created_by: _id,
    });
  };
  getBankDetails = async (_id) => {
    return await BankDetailsModel.find({
      user_id: _id,
    });
  };
  getComment = async (_id) => {
    return await CommentModel.find({
      user_id: _id,
    }).populate('product_id');
  };

  getAddress = async (_id) => {
    return await AddressModel.find({
      user_id: _id,
    });
  };

  getcart = async (_id) => {
    return await CartModel.find({
      user_id: _id,
    });
  };

  getWallet = async (_id) => {
    return await WalletModel.find({
      user_id: _id,
    });
  };

  getOrder = async (_id) => {
    return await OrdersModel.find({
      user_id: _id,
    }).populate({
      path: 'seller_id',
      select: ['firstName', 'lastName', 'userName'],
    })
      .populate({
        path: 'user_id',
        select: ['firstName', 'lastName', 'userName'],
      })
      .populate({
        path: 'products.product_id',
        populate: [
          {
            path: 'category_id',
            select: 'name',
          },
          {
            path: 'sub_cat_id',
            select: 'name',
          },
        ],
      });;
  };

  getReview = async (_id) => {
    return await ReviewModel.find({
      user_id: _id,
    }).populate('product_id');
  };

  getWhishlist = async (_id) => {
    return await WhishlistModel.find({
      user_id: _id,
    }).populate('product_id');
  };

  getMakeoffer = async (_id) => {
    return await MakeOfferModel.find({
      customer_id: _id,
    }).populate('product_id');
  };

  getNotification = async (_id) => {
    return await NotificationModel.find({
      user_id: _id,
    });
  };
}

export default UserService;
