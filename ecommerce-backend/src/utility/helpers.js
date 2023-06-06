import xml2js from 'xml2js';
import admin from 'firebase-admin';
import UserModel from '../models/users';
import { AMOUNT_TYPE, HTTP_STATUS } from '../common/constant.js';
import message from '../common/responseMessage.json';
import messageLanding from '../common/landingPageMessage.json';

export const response = (res, code, key, data, msg) => {
    const result = {
        isSuccess: code === HTTP_STATUS.SUCCESS,
        message: msg || message[key] || messageLanding[key],
        data: code === HTTP_STATUS.SUCCESS ? data : null,
    };
    return res.status(code).json(result);
};

export const xmlToJson = (xml) => {
    var parser = new xml2js.Parser(/* options */);
    return new Promise((resolve, reject) => {
        parser
            .parseStringPromise(xml)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const startAndEndOfWeek = (date) => {

    // If no date object supplied, use current date
    // Copy date so don't modify supplied date
    var now = date ? new Date(date) : new Date();

    // set time to some convenient value
    now.setHours(0, 0, 0, 0);

    // Get the previous Monday
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 2);

    // Get next Sunday
    var sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 8);

    // Return array of date objects
    return {
        monday,
        sunday
    };
}

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

export const sendPushNotification = async (title, body, user_id) => {
    const userData = await UserModel.findOne({
        _id: user_id
    });
    if (userData && userData.app_device_id) {
        const payload = {
            notification: {
                title,
                body
            }
        };
        const registrationToken = userData.app_device_id;
        const options = notification_options;
        admin.messaging().sendToDevice(registrationToken, payload, options)
            .then(response => {
                console.log('Successfully sent message:', response);
            })
            .catch(error => {
                console.log('Error sending message:', error);
            });
    }
    // admin.messaging().send(message).then((res) => {
    //     console.log('Successfully sent message:', res);
    // }).catch((err) => {
    //     console.log('Error sending message:', err);
    // });
}

export const returnWalletAmount = (wallets) => {
    const credit_amount_arr = wallets.filter((w) => w.amount_type === AMOUNT_TYPE.CREDIT);
    const credit_amount_arr_amount = credit_amount_arr.map((c) => parseFloat(c.amount || 0));
    const credit_amount = credit_amount_arr_amount && credit_amount_arr_amount.length > 0 && credit_amount_arr_amount.reduce((a, b) => a + b, 0);

    const debit_amount_arr = wallets.filter((w) => w.amount_type === AMOUNT_TYPE.DEBIT);
    const debit_amount_arr_amount = debit_amount_arr.map((c) => parseFloat(c.amount || 0));
    const debit_amount = debit_amount_arr_amount && debit_amount_arr_amount.length > 0 && debit_amount_arr_amount.reduce((a, b) => a + b, 0);

    const wallet_amount = parseFloat(parseFloat(credit_amount || 0) - parseFloat(debit_amount || 0)).toFixed(2);

    const result = {
        wallet_amount,
        credit_amount: parseFloat(credit_amount || 0).toFixed(2),
        debit_amount: parseFloat(debit_amount || 0).toFixed(2),
        wallet_transaction: wallets
    };

    return result;
}