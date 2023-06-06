import xml2js from 'xml2js';
import { AMOUNT_TYPE, HTTP_STATUS } from '../common/constant.js';
import messageLanding from '../common/landingPageMessage.json';

export const response = (res, code, key, data, msg) => {
    const result = {
        isSuccess: code === HTTP_STATUS.SUCCESS,
        message: msg || messageLanding[key],
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