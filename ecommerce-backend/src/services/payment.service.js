import BankDetailsModel from '../models/bankDetails.js';
import PaymentCheckoutModel from '../models/paymentCheckout.js';
import WalletModel from '../models/wallet.js';
import NotificationModel from '../models/notification.js';

class PaymentService {
    add_bank_details = (data) => {
        return BankDetailsModel.create(data);
    };

    get_bank_details = (user_id) => {
        return BankDetailsModel.findOne({
            user_id
        });
    };

    paymentCheckoutRequest = (request) => {
        return PaymentCheckoutModel.create(request);
    }

    addNotification = (data) => {
        return NotificationModel.create(data);
    }

    walletPaymentUpdate = (data) => {
        return WalletModel.create(data);
    }
}

export default PaymentService;