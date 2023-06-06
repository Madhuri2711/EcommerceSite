import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const FAQSchema = new Schema({
    question: { type: String },
    answer: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('faq', FAQSchema);
