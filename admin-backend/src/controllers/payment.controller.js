import { HTTP_STATUS } from '../common/constant.js';
import PaymentService from '../services/payment.service.js';
import { response } from '../utility/helpers.js';

class CategoryController {
    constructor() {
        this.paymentService = new PaymentService();
    }

    get = async (req, res) => {
        try {
            const result = await this.paymentService.get();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'category_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'category_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updatePaymentCheckout = async (req, res) => {
        try {
            const id = req.params.id;
            const request = req.body;
            const result = await this.paymentService.update(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, "banner_update", result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, "banner_bad_request");
            return;
        } catch (error) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
            return;
        }
    };

}

export default CategoryController;
