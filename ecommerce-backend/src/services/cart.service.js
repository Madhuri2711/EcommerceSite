import CartModel from '../models/carts.js';

class CartService {
    add = (data) => {
        return CartModel.create(data);
    };

    get = (user_id) =>{ 
        return new Promise((resolve) => {
            CartModel
                .find({ user_id })
                .populate({
                    path: 'product_id',
                })
                .exec((err, product) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(product);
                    }
                });
        });
    }

    delete = (id) => {
        return CartModel.findByIdAndDelete(id);
    };

    update = (id, data) => {
        return CartModel.findByIdAndUpdate(id, data, { new: true });
    };
}

export default CartService;
