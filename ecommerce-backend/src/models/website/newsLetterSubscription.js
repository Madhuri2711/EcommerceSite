import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const NewsLetterSubscriptionSchema = new Schema({
    email: { type: String },
    created_date: { type: Date, default: Date.now },
});

export default mongoose.model('newsLetterSubscription', NewsLetterSubscriptionSchema);
