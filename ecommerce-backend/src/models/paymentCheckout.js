import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const PaymentCheckoutSchema = new Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: 'users' },
    amount: { type: Number },
    bank_id: { type: mongoose.Schema.ObjectId, ref: 'bank_details' },
    released_date: { type: Date, default: Date.now },
    is_payment_success_to_user: { type: Boolean, default: false },
});

export default mongoose.model('payment_checkout', PaymentCheckoutSchema);
