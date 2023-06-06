import { ORDER_STATUS } from '../common/constant.js';
import OrderModel from '../models/orders.js';
import WalletModel from '../models/wallet.js';
import NotificationModel from '../models/notification.js';

class AddressService {
    getOrderDetails = async (_id) => {
        await OrderModel.findByIdAndUpdate(_id, {
            is_payment_release_to_seller: true
        }, { new: true })

        return OrderModel.findOne({
            _id
        });
    }

    paymentRelease = (data) => {
        return WalletModel.create(data);
    };

    addNotification = (data) => {
        return NotificationModel.create(data);
    }
}

export default AddressService;
