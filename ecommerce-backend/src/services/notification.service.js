import { NOTIFICATION_TYPE } from '../common/constant.js';
import NotificationModel from '../models/notification.js';

class NotificationService {
    get = async (id) => {
        return NotificationModel.find({ user_id: id }).sort({
            created_date: -1,
        });
    };

    update = (id) => {
        return NotificationModel.findByIdAndUpdate(id, { is_visible: true }, { new: true });
    };

    allVisible = (user_id) => {
        return NotificationModel.updateMany({ user_id }, { $set: { is_visible: true } })
    }

    updateOrderToText = (order_id) => {
        return NotificationModel.update(
            { order_id },
            { is_visible: true, type: NOTIFICATION_TYPE.TEXT }
        );
    };

    getNonVisibleNotificationCount = async (id) => {
        return NotificationModel.find({ user_id: id, is_visible: false });
    };

    createNotification = async (data) => {
        return NotificationModel.create(data);
    }
}

export default NotificationService;
