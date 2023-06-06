import moment from 'moment';
import OrderModel from "../models/website/orders";
import ProductModel from "../models/website/products";
import AddressModel from "../models/website/address";
import UserModel from '../models/website/users';

class OrderService {
  get = async () => {
    return await OrderModel.find().populate({
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
      });
  };

  getOrderById = async (_id) => {
    return await OrderModel.findOne({
      _id
    });
  }

  getCustomerAndSellerInfo = async (order_data) => {
    const { seller_id } = order_data;
    const product_id_arr = order_data.products.map((p) => p.product_id);
    const qty_arr = order_data.products.map((p) => p.qty);
    var weight = 0;
    if (product_id_arr && product_id_arr.length > 0 && qty_arr && qty_arr.length > 0) {
      const product = await ProductModel.findById(product_id_arr[0]);
      weight = parseFloat(product.weight) * parseInt(qty_arr[0]);
    }

    console.log('order_data', order_data);

    const customer_info = {
      ...order_data?.address,
    };

    var seller_info = await AddressModel.findOne({
      user_id: seller_id,
      is_default: true,
    });

    if (!seller_info) {
      seller_info = await AddressModel.findOne({
        user_id: seller_id,
      });
    }

    // console.log('customer_info', customer_info);

    return {
      seller: seller_info,
      customer: customer_info._doc,
      weight,
    };
  };

  update = async (id, data) => {
    return await OrderModel.findByIdAndUpdate(
      id,
      { address: data },
      { new: true }
    );
  };

  getSellerMail = (_id) => {
    return UserModel.findOne({
      _id,
    });
  };

  getEmailInformation = async (orderInfo) => {
    const buyerName = `${orderInfo.address?.first_name} ${orderInfo.address?.last_name}`;
    const buyerAddress = `${orderInfo.address?.address}, ${orderInfo.address?.city}, ${orderInfo.address?.state}, ${orderInfo.address?.country}, ${orderInfo.address?.postal_code}`;
    const orderDate = moment(orderInfo.ordered_date).format('MMMM DD, YYYY');

    const productInformation = await OrderModel.findOne({
      _id: orderInfo._id,
    }).populate({
      path: 'products.product_id',
    });

    const productName = productInformation && productInformation.products && productInformation.products.length > 0 && productInformation?.products[0]?.product_id?.name;

    return {
      buyerName,
      buyerAddress,
      orderDate,
      productName
    }
  }
}

export default OrderService;
