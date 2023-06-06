import PaymentModel from "../models/website/paymentCheckout";

class CategoryService {
    get = () => {
        return PaymentModel.find().populate('bank_id').populate('user_id');
    };

    update = async (id, data) => {
        return await PaymentModel.findByIdAndUpdate(id, data, { new: true });
    };
}

export default CategoryService;
