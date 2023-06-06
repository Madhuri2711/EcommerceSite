import MakeOfferModel from '../models/makeOffer.js';
import NotificationModel from '../models/notification.js';
import ProductModel from '../models/products.js';
import UserModel from '../models/users.js';
import notificationMessage from '../common/notificationMessage.json';
import { sendPushNotification } from '../utility/helpers';
import { NOTIFICATION_TYPE, ORDER_STATUS, SCREEN_NOTIFICATION, USER_TYPE } from '../common/constant.js';

class MakeOfferService {
    add = async (data) => {
        const { product_id, price, user_id } = data;

        const existMakeOffer = await MakeOfferModel.findOne({
            product_id,
            customer_id: user_id,
        });

        if (!existMakeOffer) {
            const product = await ProductModel.findById(product_id);
            const customerInfo = await UserModel.findOne({
                _id: user_id
            });
            const notiInput = {
                title: notificationMessage?.makeOfferTitle.replace('{{productTitle}}', product?.name).replace('{{price}}', price).replace('{{userName}}', `@${customerInfo.userName}`),
                description: notificationMessage?.makeOfferDescription,
                price: price,
                type: NOTIFICATION_TYPE?.MAKE_OFFER,
                user_id: product?.created_by,
                img: product?.images?.[0],
                product_owner_id: product?.created_by
            };
            const notification = await NotificationModel.create(notiInput);
            await sendPushNotification(notificationMessage?.makeOfferTitle.replace('{{productTitle}}', product?.name).replace('{{price}}', price).replace('{{userName}}', `@${customerInfo.userName}`), notificationMessage?.makeOfferDescription, product?.created_by);

            const makeOfferInput = {
                seller_id: product?.created_by,
                notification_id: notification?._id,
                customer_id: user_id,
                product_id: product?._id,
                price,
                img: product?.images?.[0]
            };
            return MakeOfferModel.create(makeOfferInput);
        }
        return null;
    };

    acceptDecline = async (data) => {
        const { notification_id, status } = data;

        const makeOffer = await MakeOfferModel.findOneAndUpdate(
            { notification_id },
            { is_offer_active: true },
            { new: true }
        );
        await NotificationModel.findByIdAndUpdate(
            notification_id,
            { type: NOTIFICATION_TYPE?.TEXT },
            { new: true }
        );
        const product = await ProductModel.findById(makeOffer?.product_id);
        const notiInput = {
            title:
                status === ORDER_STATUS.DECLINED
                    ? notificationMessage.declineOfferTitle.replace('{{price}}', makeOffer.price).replace('{{productTitle}}', product?.name)
                    : notificationMessage.acceptOfferTitle.replace('{{price}}', makeOffer.price).replace('{{productTitle}}', product?.name),
            description: status === ORDER_STATUS.DECLINED ? notificationMessage.declinedDescription : '',
            type: NOTIFICATION_TYPE?.TEXT,
            user_id: makeOffer?.customer_id,
            img: product?.images?.[0],
        };

        if (status === ORDER_STATUS.ACCEPT) {
            notiInput.screen = SCREEN_NOTIFICATION.PRODUCT_DETAILS;
            notiInput.product_id = product?._id;
        };

        if (status === ORDER_STATUS.DECLINED) {
            const makeOffer = await MakeOfferModel.findOneAndUpdate(
                { notification_id },
                { is_offer_active: false },
                { new: true }
            );
        }
        await sendPushNotification(notiInput.title, notiInput.description, makeOffer?.customer_id);

        return NotificationModel.create(notiInput);
    };

    filter = async (filter) => {
        return await MakeOfferModel.find(filter);
    };

    newMakeOffer = async (data) => {
        const { notification_id, price, user_id, type } = data;

        const res = await MakeOfferModel.findOneAndUpdate(
            { notification_id },
            { is_offer_active: false },
            { new: true }
        );
        await NotificationModel.findByIdAndUpdate(
            notification_id,
            { type: NOTIFICATION_TYPE?.TEXT },
            { new: true }
        );

        const product = await ProductModel.findById(res.product_id);
        let customerInfo = null;

        let message = '';
        if (type === USER_TYPE.CUSTOMER) {
            customerInfo = await UserModel.findOne({
                _id: res.seller_id
            });
            message = 'Counter offer successfully sent to the buyer.';
        } else {
            customerInfo = await UserModel.findOne({
                _id: res.customer_id
            });
            message = 'Counter offer successfully sent to the seller.';
        }

        const notiInput = {
            title: type === USER_TYPE.CUSTOMER
                ? notificationMessage?.makeOfferTitleSeller.replace('{{productTitle}}', product?.name).replace('{{price}}', price).replace('{{userName}}', `@${customerInfo.userName}`)
                : notificationMessage?.makeOfferTitle.replace('{{productTitle}}', product?.name).replace('{{price}}', price).replace('{{userName}}', `@${customerInfo.userName}`),
            description: notificationMessage?.makeOfferDescription,
            price: price,
            type: NOTIFICATION_TYPE?.MAKE_OFFER,
            user_id: type === USER_TYPE.CUSTOMER ? res.customer_id : res.seller_id,
            img: product?.images?.[0],
            product_owner_id: product?.created_by
        };
        const notification = await NotificationModel.create(notiInput);
        await sendPushNotification(notiInput.title, notiInput.description, notiInput.user_id);

        const makeOfferInput = {
            seller_id: product?.created_by,
            notification_id: notification?._id,
            customer_id: res.customer_id,
            product_id: product?._id,
            price,
            img: product?.images?.[0]
        };
        await MakeOfferModel.create(makeOfferInput);
        return message;
    }
}

export default MakeOfferService;
