import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    name: { type: String },
    email: { type: String },
    message: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('contactus', ContactSchema);
