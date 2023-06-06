import moment from 'moment';
import OrderModel from '../models/orders.js';
import WalletModel from '../models/wallet.js';

const walletPaymentRelease = async () => {
    try {

        const deliveredDateReleasePayment = moment().subtract('day', 3).format('YYYY-MM-DD');
        const deliveryDate = deliveredDateReleasePayment + 'T00:00:00.000Z';

        const orderDetails = await OrderModel.find({
            delivered_date: deliveryDate,
            is_delivered: true,
            is_payment_release_to_seller: false,
        });

        for (let i = 0; i < orderDetails.length; i++) {
            const order = orderDetails[i];

            const amount_release = ((order.total_price - 15 - 1.95) * 85) / 100;

            const wallet_amount = {
                user_id: order.seller_id,
                order_id: order._id,
                amount: amount_release,
            };
            await WalletModel.create(wallet_amount);

            await OrderModel.findByIdAndUpdate(
                order._id,
                {
                    is_payment_release_to_seller: true,
                    payment_released_date: moment(),
                },
                { new: true }
            );
        }
    } catch (err) {
        console.log('err', err);
    }
}

export default walletPaymentRelease;
