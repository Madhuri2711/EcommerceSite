import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String },
    img: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number },
});

export default mongoose.model('categories', CategorySchema);
