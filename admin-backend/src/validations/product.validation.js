import Joi from 'joi';
import validateRequest from '../utility/jwt/middlewareValidation.js';

export const addProductValidate = (req, res, next) => {
    const schema = Joi.object({
        category_id: Joi.string().required(),
        sub_cat_id: Joi.string().required(),
        brand: Joi.string().required(),
        size: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        discount_price: Joi.number().required(),
        final_price: Joi.number().required(),
        your_earning: Joi.number().required(),
        condition: Joi.string().required(),
        is_bundled_product: Joi.boolean().required(),
        name: Joi.string().required(),
        color: Joi.string().required(),
        product_code: Joi.string().required(),
        year: Joi.string(),
        weight: Joi.number(),
        qty: Joi.number(),
        images:Joi.array().required(),
        is_active:Joi.boolean().required()
    });
    validateRequest(req, res, next, schema);
};
