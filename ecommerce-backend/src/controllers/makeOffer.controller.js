import { HTTP_STATUS, ORDER_STATUS } from '../common/constant.js';
import MakeOfferService from '../services/makeOffer.service.js';
import { response } from '../utility/helpers.js';
import tokenInfo from '../utility/jwt/tokenInfo.js';

class MakeOfferController {
    constructor() {
        this.makeOfferService = new MakeOfferService();
    }

    add = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const request = req.body;
            request.user_id = user.id;
            const result = await this.makeOfferService.add(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'makeOffer_add', result);
                return;
            }
            if (result === null) {
                response(res, HTTP_STATUS.BAD_REQUEST, 'already_added_offer');
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'makeOffer_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    acceptDecline = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const request = {
                ...req.body,
                notification_id: req?.params?.notification_id,
                user_id: user?.id
            };
            const result = await this.makeOfferService.acceptDecline(request);
            if (result) {
                if (req.body.status === ORDER_STATUS?.ACCEPT) {
                    response(res, HTTP_STATUS.SUCCESS, 'make_offer_accept', result);
                    return;
                } else {
                    response(res, HTTP_STATUS.SUCCESS, 'make_offer_decline', result);
                    return;
                }
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'makeOffer_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    newMakeOffer = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const request = {
                ...req.body,
                notification_id: req?.params?.notification_id,
                user_id: user?.id
            };
            const result = await this.makeOfferService.newMakeOffer(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'NO', {}, result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'makeOffer_bad_request');
            return;
        } catch (err) {
            console.log('err', err);
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }

}

export default MakeOfferController;
