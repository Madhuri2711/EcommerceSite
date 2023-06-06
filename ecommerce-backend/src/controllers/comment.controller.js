import { HTTP_STATUS, NOTIFICATION_TYPE, SCREEN_NOTIFICATION } from '../common/constant.js';
import CONFIG from '../config/mail.config.js';
import CommentService from '../services/comment.service.js';
import NotificationService from '../services/notification.service.js';
import ProductService from '../services/product.service.js';
import { response, sendPushNotification } from '../utility/helpers.js';
import tokenInfo from '../utility/jwt/tokenInfo.js';
import { sendEmail } from '../utility/mailer.js';
import notificationMessage from '../common/notificationMessage.json';

class CommentController {
    constructor() {
        this.commentService = new CommentService();
        this.productService = new ProductService();
        this.notificationService = new NotificationService();
    }

    add = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const request = req.body;
            request.user_id = user.id;

            const result = await this.commentService.add(request);
            if (result) {
                const productDetails = await this.productService.getProductDetails(request?.product_id);
                const userInfo = await this.commentService.getUserInfo(productDetails?.created_by);

                if (user.id !== productDetails?.created_by) {

                    const emailTemplate = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style> * { font-family: 'PT Sans' } a { border: none; color: rgb(27, 128, 196); text-decoration: none; }a:hover { text-decoration: underline; }a:active,a:visited,a:focus { border: none; } </style></head><body style="padding:10px; margin:0px; background-color: #FFFFFF; color: #555555; font-size: 13px;"><table border="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; margin: auto;"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1;"><tr style="background: #f27c35 none repeat scroll 0 0;"><td style="padding: 0px; margin: 0; vertical-align: middle;"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align: left; margin: 0; padding: 0; width: 150px;"><img src="logo.png" alt="" title="" style="margin:0; padding:0; display:block; border: none;height:20px" /></td><td valign="middle" style="text-align: right; font-size: 16px; margin: 0; padding: 0; color: #fff;">Comment</td></tr></table></td></tr><tr><td style="padding: 14px 14px 12px 14px;">Dear ${userInfo?.firstName},<br/><br/>A customer has commented on your listed item, Please replay as soon as you have a chance.<br/><br/> <b>Product title</b>: "${productDetails?.name}". <br /> <b>Comment</b>: ${request?.comment}</td></tr><tr><td style="padding:0px 14px 12px 14px;"><p style="margin:10px 0px 3px 0px; padding: 0;"><strong>Thanks &amp; Regards</strong></p><p style="margin:0px; padding:0; font-size:12px; color:#868686;">Inani Hub</p></td></tr></table></td><td></td></tr></table></body></html>`;

                    const notiInput = {
                        title: notificationMessage.productComment.replace('{{productTitle}}', productDetails?.name),
                        description: '',
                        type: NOTIFICATION_TYPE?.TEXT,
                        user_id: productDetails?.created_by,
                        img: productDetails?.images?.[0],
                        product_id: request?.product_id,
                        screen: SCREEN_NOTIFICATION.PRODUCT_DETAILS,
                    };

                    await this.notificationService.createNotification(notiInput);
                    await sendPushNotification("Your product item's comment", notificationMessage.productComment.replace('{{productTitle}}', productDetails?.name), productDetails?.created_by);

                    sendEmail(
                        userInfo.email,
                        "Product's Comment - Inani Hub",
                        null,
                        emailTemplate,
                        null,
                        CONFIG.INFO_ADDRESS,
                        CONFIG.INFO_AUTH_PASSWORD,
                        null
                    );
                }
                response(res, HTTP_STATUS.SUCCESS, 'comment_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'comment_bad_request');
            return;
        } catch (err) {
            console.log(err);
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    update = async (req, res) => {
        try {
            const id = req.params.product_id
            const request = req.body;
            const result = await this.commentService.update(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'comment_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'comment_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

}

export default CommentController;
