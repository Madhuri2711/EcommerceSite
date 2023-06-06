import { ORDER_STATUS } from '../common/constant.js';
import WalletModel from '../models/wallet.js';

class WalletService {
    getWalletDetails = async (user_id) => {
        return WalletModel.find({
            user_id
        }).populate({
            path: 'order_id',
            populate: {
                path: 'products.product_id',
            }
        }).sort({
            created_date: 'desc'
        });
    }

    getWalletBalance = async (user_id) => {
        return WalletModel.find({
            user_id
        });
    }
}

export default WalletService;
