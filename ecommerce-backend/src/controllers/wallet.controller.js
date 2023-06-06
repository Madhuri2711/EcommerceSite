import { AMOUNT_TYPE, HTTP_STATUS, NOTIFICATION_TYPE } from '../common/constant.js';
import WalletService from '../services/wallet.service.js';
import { response, returnWalletAmount } from '../utility/helpers.js';
import tokenInfo from '../utility/jwt/tokenInfo.js';

class WalletController {
    constructor() {
        this.walletService = new WalletService();
    }

    getWalletAmount = async (req, res) => {
        try {
            const user = tokenInfo(req, res);

            const wallets = await this.walletService.getWalletDetails(user.id);
            if (wallets) {
                const result = returnWalletAmount(wallets);
                response(res, HTTP_STATUS.SUCCESS, 'wallet_successfully', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'wallet_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getWalletBalance = async (req, res) => {
        try {
            const user = tokenInfo(req, res);

            const wallets = await this.walletService.getWalletBalance(user.id);
            if (wallets) {
                const credit_amount_arr = wallets.filter((w) => w.amount_type === AMOUNT_TYPE.CREDIT);
                const credit_amount_arr_amount = credit_amount_arr.map((c) => parseFloat(c.amount));
                const credit_amount = credit_amount_arr_amount
                    && credit_amount_arr_amount.length > 0
                    && parseFloat(credit_amount_arr_amount.reduce((a, b) => a + b, 0)).toFixed(2);

                const debit_amount_arr = wallets.filter((w) => w.amount_type === AMOUNT_TYPE.DEBIT);
                const debit_amount_arr_amount = debit_amount_arr.map((c) => c.amount);
                const debit_amount = debit_amount_arr_amount
                    && debit_amount_arr_amount.length > 0
                    && parseFloat(debit_amount_arr_amount.reduce((a, b) => a + b, 0)).toFixed(2);

                const wallet_amount = parseFloat(parseFloat(credit_amount || 0) - parseFloat(debit_amount || 0)).toFixed(2);

                const result = {
                    wallet_amount,
                };

                response(res, HTTP_STATUS.SUCCESS, 'wallet_successfully', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'wallet_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }
}

export default WalletController;
