import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const BlogSchema = new Schema({
    title: { type: String },
    description: { type: String },
    coverImage: { type: String },
    otherImage: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('blog', BlogSchema);
