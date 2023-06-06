import Joi from 'joi';
import validateRequest from '../utility/jwt/middlewareValidation.js';

export const loginValidate = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        app_device_id: Joi.string().allow(''),
        device_type: Joi.string().allow(''),
    });
    validateRequest(req, res, next, schema);
};
