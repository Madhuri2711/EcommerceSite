import jwt from 'jsonwebtoken';
import tokenSecret from '../../config/jwt.config.js';
import { response } from '../../utility/helpers.js';
import { HTTP_STATUS } from '../../common/constant.js';
import responseMessage from '../../common/responseMessage.json';

const authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const token = req.headers.authorization;
    if (token == null)
        return response(res, HTTP_STATUS.NOT_AUTHORISED, responseMessage.not_authorised);

    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) return res.sendStatus(HTTP_STATUS.FORBIDDEN);
        req.user = user;
        // next(); // pass the execution off to whatever request the client intended
    });

    next();
};

export default authenticateToken;
