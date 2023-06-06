import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const ErrorSchema = new Schema({
    screen: { type: String },
    order_id: { type: String },
    description: { type: String },
    created_date: { type: Date, default: Date.now },
});

export default mongoose.model('errors', ErrorSchema);
