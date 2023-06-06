import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const ProfileSchema = new Schema({
    facebookLink: { type: String },
    instagramLink: { type: String },
    twitterLink: { type: String },
    linkedInLink: { type: String },
    contactEmail: { type: String },
    contactNumber: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('profile', ProfileSchema);
