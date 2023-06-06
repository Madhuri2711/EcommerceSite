import NotificationModel from '../models/notification.js';
import { NOTIFICATION_TYPE } from '../common/constant.js';

export const sendNotification = (data) => {
    data.type = NOTIFICATION_TYPE?.TEXT
    return NotificationModel.create(data);

}