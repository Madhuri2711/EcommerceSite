import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const BannerSchema = new Schema({
    title: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    created_date: { type: Date, default: Date.now },
});

export default mongoose.model('banners', BannerSchema);



//created_by: { type: mongoose.Schema.ObjectId, ref: 'users' },
// created_by add in schema