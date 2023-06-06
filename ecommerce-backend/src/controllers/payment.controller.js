import Stripe from 'stripe';
import { AMOUNT_TYPE, HTTP_STATUS, NOTIFICATION_TYPE } from '../common/constant.js';
import PaymentService from '../services/payment.service.js';
import { response, returnWalletAmount, sendPushNotification } from '../utility/helpers.js';
import stripConfig from '../config/strip.config.js';
import tokenInfo from '../utility/jwt/tokenInfo.js';
import UserModel from '../models/users.js';
import WalletService from '../services/wallet.service.js';
import CONFIG from '../config/mail.config.js';
import CommentService from '../services/comment.service.js';
import { sendEmail } from '../utility/mailer.js';
import notificationMessage from '../common/notificationMessage.json';
import { CLIENT_URL, IMG_URL } from '../config/common.config.js';


class PaymentController {
    constructor() {
        this.paymentService = new PaymentService();
        this.walletService = new WalletService();
        this.commentService = new CommentService();
        this.stripe = new Stripe(stripConfig.SECRET);
        this.testStripe = new Stripe(stripConfig.TEST_SECRET);
    }

    userExistOnStrip = async (user_id) => {
        const userData = await UserModel.findOne({
            _id: user_id,
        });

        var customerId = '';
        if (!userData.strip_customer_id) {
            const customer = await this.stripe.customers.create({
                email: userData.email ?? '',
                name: userData ? `${userData.firstName} ${userData.lastName}` : '',
            });
            customerId = customer.id;
            await UserModel.findByIdAndUpdate(
                user_id,
                { strip_customer_id: customer.id },
                { new: true }
            );
        } else {
            customerId = userData.strip_customer_id;
        }
        return customerId;
    };

    userExistOnTestModeStrip = async (user_id) => {
        const userData = await UserModel.findOne({
            _id: user_id,
        });

        var customerId = '';
        if (!userData.strip_customer_id) {
            const customer = await this.testStripe.customers.create({
                email: userData.email ?? '',
                name: userData ? `${userData.firstName} ${userData.lastName}` : '',
            });
            customerId = customer.id;
            await UserModel.findByIdAndUpdate(
                user_id,
                { strip_customer_id: customer.id },
                { new: true }
            );
        } else {
            customerId = userData.strip_customer_id;
        }
        return customerId;
    };

    // direct checkout flow
    paymentCheckout = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const { amount, currency, order_id } = req.body;

            const customerId = await this.userExistOnStrip(user.id);
            const ephemeralKey = await this.stripe.ephemeralKeys.create(
                { customer: customerId },
                { apiVersion: '2020-08-27' }
            );

            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: amount * 100,
                currency,
                customer: customerId,
                setup_future_usage: 'on_session',
                payment_method_types: ['card'],
                metadata: {
                    order_id, //here pass the order id will use in future
                },
            });

            const result = {
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customerId,
                publishableKey: stripConfig.PUBLISHABLE,
            };
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'filter_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'filter_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    webPaymentCheckout = async(req,res) =>{
     try {
        console.log("req.body",req.body)
        // const { product, token } = req.body;
        // console.log(`${IMG_URL}${req.body.images[0]}`)
        const user = tokenInfo(req, res);
        const total_price = Math.floor(req.body.totalPrice * 100)
        const customerId = await this.userExistOnTestModeStrip(user.id);
        const session = await this.testStripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: "cad",
                  product_data: {
                    name: req.body.name,
                    // images:[`${IMG_URL}${req.body.images[0]}`],
                    description:req.body.description
                  },
                  unit_amount:total_price,
                },
                quantity: req.body.quantityCounts,
              },

            ],
            // customer_email:"test@gmail.com",
            mode: 'payment',
            success_url: `${CLIENT_URL}payment-success`,
            cancel_url: `${CLIENT_URL}payment-failed`,
          });
          response(res, HTTP_STATUS.SUCCESS, 'filter_get', session);
     } catch (error) {
        response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
     }
    }

    getSavedPaymentCard = async (req, res) => {
        try {
            const user = tokenInfo(req, res);

            const userData = await UserModel.findOne({
                _id: user.id,
            });

            if (userData.strip_customer_id) {
                const paymentMethods = await this.stripe.paymentMethods.list({
                    customer: userData.strip_customer_id,
                    type: 'card',
                });
                response(res, HTTP_STATUS.SUCCESS, 'filter_get', paymentMethods.data);
                return;
            }
            response(res, HTTP_STATUS.SUCCESS, 'not_found_saved_card', { data: [] });
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // save card for future
    addCard = async (req, res) => {
        try {
            const stripe = new Stripe(stripConfig.SECRET);
            const user = tokenInfo(req, res);

            const userData = await UserModel.findOne({
                _id: user.id,
            });

            const setupIntent = await stripe.setupIntents.create({
                customer: userData.strip_customer_id || 'cus_KqstivxPuqdn4F',
            });
            const clientSecret = setupIntent.client_secret;

            if (clientSecret) {
                response(res, HTTP_STATUS.SUCCESS, 'filter_get', { clientSecret });
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'filter_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    //CRUD for cards
    addNewCard = async (req, res) => {
        try {
            const stripe = new Stripe(stripConfig.TEST_SECRET);
            const user = tokenInfo(req, res);
            const { card_number, exp_month, exp_year, cvc, card_holder_name } = req.body;

            const customerId = await this.userExistOnTestModeStrip(user.id);

            const paymentMethodCreate = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number:card_number,
                    exp_month,
                    exp_year,
                    cvc,
                },
                billing_details: {
                    name: card_holder_name,
                },
            });

            const paymentMethod = await stripe.paymentMethods.attach(paymentMethodCreate.id, {
                customer: customerId,
            });
            if (paymentMethod) {
                response(res, HTTP_STATUS.SUCCESS, 'new_card_added', paymentMethod);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'new_card_bad_request');
            return;
        } catch (err) {
            console.log(`###### ADD Card Err #####`,err)
            // console.log("^^^^^^^^^^^^^^^^^card res",res)
            // response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return res.status(500).json(err?.raw);
        }
    };

    GetCardList = async (req, res) => {
        try {
            const stripe = new Stripe(stripConfig.SECRET);
            const user = tokenInfo(req, res);

            const customerId = await this.userExistOnStrip(user.id);

            const paymentMethod = await stripe.paymentMethods.list({
                customer: customerId,
                type: 'card',
            });

            if (paymentMethod) {
                response(res, HTTP_STATUS.SUCCESS, 'card_list', paymentMethod.data);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'get_card_list_issue');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    RemoveCardWithCustomer = async (req, res) => {
        try {
            const stripe = new Stripe(stripConfig.SECRET);
            const payment_id = req.params.card_id;

            const paymentMethod = await stripe.paymentMethods.detach(payment_id);

            if (paymentMethod) {
                response(res, HTTP_STATUS.SUCCESS, 'removed_card_from_customer', paymentMethod.data);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'get_card_list_issue');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addBankDetails = async (req, res) => {
        try {
            const stripe = new Stripe(stripConfig.SECRET);
            const user = tokenInfo(req, res);

            const customerId = await this.userExistOnStrip(user.id);

            const bankAccount = await stripe.customers.createSource(customerId, {
                source: {
                    account_holder_name: 'Yash Sonani',
                    account_holder_type: 'individual',
                    routing_number: '',
                    account_number,
                },
            });

            const paymentMethodCreate = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number: '4242424242424242',
                    exp_month: 1,
                    exp_year: 2023,
                    cvc: '314',
                },
                billing_details: {
                    name: 'Yash Patel',
                    email: 'yash.sonani@servofeat.com',
                },
            });

            const paymentMethod = await stripe.paymentMethods.attach(paymentMethodCreate.id, {
                customer: customerId,
            });

            if (paymentMethod) {
                response(res, HTTP_STATUS.SUCCESS, 'filter_get', paymentMethod);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'filter_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // Add new Bank Details
    addNewBankDetails = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const { account_holder_name, insitution_code, transit_code, account_number } = req.body;
            const request = {
                account_holder_name,
                insitution_code,
                account_number,
                transit_code,
                user_id: user.id,
            }

            const bankAccount = await this.paymentService.add_bank_details(request);

            if (bankAccount) {
                response(res, HTTP_STATUS.SUCCESS, 'new_bank_added', bankAccount);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'new_bank_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }

    getBankDetails = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const bankAccount = await this.paymentService.get_bank_details(user.id);
            response(res, HTTP_STATUS.SUCCESS, 'new_bank_get', bankAccount);
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }

    checkoutPayment = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const { amount } = req?.body;

            const wallets = await this.walletService.getWalletDetails(user.id);
            if (wallets) {
                const result = returnWalletAmount(wallets);

                if (parseFloat(amount) > parseFloat(result?.wallet_amount)) {
                    response(res, HTTP_STATUS.BAD_REQUEST, 'wallet_balance_error');
                    return;
                }

                const bankDetails = await this.paymentService?.get_bank_details(user?.id);

                const customerInfo = await this.commentService?.getUserInfo(user?.id);

                const bankAccount = await this.paymentService.paymentCheckoutRequest({
                    user_id: user?.id,
                    amount,
                    bank_id: bankDetails?._id
                });

                // send mail to inani hub team
                const strHtml = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style> * { font-family: 'PT Sans' } a { border: none; color: rgb(27, 128, 196); text-decoration: none; }a:hover { text-decoration: underline; }a:active,a:visited,a:focus { border: none; } </style></head><body style="padding:10px; margin:0px; background-color: #FFFFFF; color: #555555; font-size: 13px;"><table border="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; margin: auto;"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1;"><tr style="background: #f27c35 none repeat scroll 0 0;"><td style="padding: 0px; margin: 0; vertical-align: middle;"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align: left; margin: 0; padding: 0; width: 150px;"><img src="logo.png" alt="" title="" style="margin:0; padding:0; display:block; border: none;height:20px" /></td><td valign="middle" style="text-align: right; font-size: 16px; margin: 0; padding: 0; color: #fff;">Payment release to seller</td></tr></table></td></tr><tr><td style="padding: 14px 14px 12px 14px;">Please verify the bank details & wallet amount.<br/><br/> <b>User Name</b>: ${customerInfo?.firstName} ${customerInfo?.lastName} <br /> <b>Wallet Amount</b>: ${result?.wallet_amount} <br /> <b>Released Amount</b>: ${amount}<br /> <hr /><b>Account holder Name</b>:  ${bankDetails?.account_holder_name}<br /><b>Institution Code</b>: ${bankDetails?.insitution_code}<br /><b>Transit Code</b>: ${bankDetails?.transit_code}<br /><b>Account Number</b>: ${bankDetails?.account_number}</td></tr><tr><td style="padding:0px 14px 12px 14px;"><p style="margin:10px 0px 3px 0px; padding: 0;"><strong>Thanks &amp; Regards</strong></p><p style="margin:0px; padding:0; font-size:12px; color:#868686;">Inani Hub</p></td></tr></table></td><td></td></tr></table></body></html>`;
                sendEmail(
                    CONFIG.WALLET_ADDRESS,
                    "Payment release to seller - Inani Hub",
                    null,
                    strHtml,
                    null,
                    CONFIG.WALLET_ADDRESS,
                    CONFIG.WALLET_AUTH_PASSWORD,
                    null
                );

                // notification to seller
                const notificationReq = {
                    user_id: user?.id,
                    title: notificationMessage?.paymentReleaseTitle.replace('{{amount}}', amount),
                    description: `Released amount will be credited to your account with in 2-3 days.`,
                    type: NOTIFICATION_TYPE?.TEXT,
                };
                await this.paymentService.addNotification(notificationReq);
                await sendPushNotification(notificationMessage?.paymentReleaseTitle.replace('{{amount}}', amount), `Released amount will be credited to your account with in 2-3 days.`, user?.id);

                //minus amount from wallet
                const wallet_data = {
                    user_id: user.id,
                    amount: amount,
                    created_by: user.id,
                    amount_type: AMOUNT_TYPE.DEBIT
                };
                await this.paymentService.walletPaymentUpdate(wallet_data);

                if (bankAccount) {
                    response(res, HTTP_STATUS.SUCCESS, 'new_bank_get', bankAccount);
                    return;
                }
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'internal_server_error');
            return;
        } catch (err) {
            console.log(err);
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }

    // saveCardAndGenerateSetupIntent = async (req, res) => {
    //     try {
    //         // const stripe = new Stripe(stripConfig.SECRET);
    //         const user = tokenInfo(req, res);

    //         const userData = await UserModel.findOne({
    //             _id: user.id,
    //         });

    //         console.log('userData', userData);

    //         var customerId = '';
    //         if (!userData.strip_customer_id) {
    //             const customer = await this.stripe.customers.create({
    //                 email: userData.email ?? '',
    //                 name: userData ? `${userData.firstName} ${userData.lastName}` : '',
    //             });
    //             console.log('customer', customer);
    //             customerId = customer.id;
    //             await UserModel.findByIdAndUpdate(
    //                 user.id,
    //                 { strip_customer_id: customer.id },
    //                 { new: true }
    //             );
    //         } else {
    //             customerId = userData.strip_customer_id;
    //         }

    //         const ephemeralKey = await this.stripe.ephemeralKeys.create(
    //             { customer: customerId },
    //             { apiVersion: '2020-08-27' }
    //         );

    //         const setupIntent = await this.stripe.setupIntents.create({
    //             customer: customerId,
    //         });

    //         // const paymentIntent = await stripe.paymentIntents.create({
    //         //     amount: 100,
    //         //     currency: 'inr',
    //         //     customer: customerId,
    //         //     setup_future_usage: 'off_session',
    //         //     payment_method_types: ['card'],
    //         // });

    //         const result = {
    //             // paymentIntent: paymentIntent.client_secret,
    //             ephemeralKey: ephemeralKey.secret,
    //             customer: customerId,
    //             publishableKey: stripConfig.PUBLISHABLE,
    //             setupIntent: setupIntent.client_secret,
    //         };
    //         if (result) {
    //             response(res, HTTP_STATUS.SUCCESS, 'filter_get', result);
    //         }
    //         response(res, HTTP_STATUS.BAD_REQUEST, 'filter_bad_request');
    //     } catch (err) {
    //         console.log('err', err);
    //         response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
    //     }
    // };

    // paymentCheckout = async (req, res) => {
    //     try {
    //         const { paymentMethodId } = req.body;
    //         const user = tokenInfo(req, res);

    //         const userData = await UserModel.findOne({
    //             _id: user.id,
    //         });

    //         const paymentIntent = await this.stripe.paymentIntents.create({
    //             amount: 50,
    //             currency: 'inr',
    //             customer: userData.strip_customer_id,
    //             payment_method: paymentMethodId,
    //             off_session: true,
    //             confirm: true,
    //         });

    //         const ephemeralKey = await this.stripe.ephemeralKeys.create(
    //             { customer: userData.strip_customer_id },
    //             { apiVersion: '2020-08-27' }
    //         );

    //         const result = {
    //             paymentIntent: paymentIntent.client_secret,
    //             customer: userData.strip_customer_id,
    //             ephemeralKey: ephemeralKey.secret,
    //             publishableKey: stripConfig.PUBLISHABLE,
    //         };
    //         if (result) {
    //             response(res, HTTP_STATUS.SUCCESS, 'filter_get', result);
    //         }
    //         response(res, HTTP_STATUS.BAD_REQUEST, 'filter_bad_request');
    //     } catch (err) {
    //         console.log('err', err);
    //         response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
    //     }
    // };
}

export default PaymentController;
