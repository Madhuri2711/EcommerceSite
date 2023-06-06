import mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const CustomSettingSchema = new Schema({
    landingTitle: { type: String },
    landingDescription: { type: String },
    getStartedButtonText: { type: String },
    productDescription: { type: String },
    productCEOText: { type: String },
    productCEONameText: { type: String },
    downloadAppTitle: { type: String },
    downloadAppInfo: { type: String },
    stepOneTitle: { type: String },
    stepOneInfo: { type: String },
    stepTwoTitle: { type: String },
    stepTwoInfo: { type: String },
    stepThreeTitle: { type: String },
    stepThreeInfo: { type: String },
    howItworksTitle: { type: String },
    SellerTitle: { type: String },
    SellerStepsInfo: { type: [String] },
    BuyerTitle: { type: String },
    BuyerStepsInfo: { type: [String] },
    contactUsTitle: { type: String },
    getInTouchTitle: { type: String },
    contactUsInfo: { type: String },
    updated_date: { type: Date, default: Date.now },
});

export default mongoose.model('customSettings', CustomSettingSchema);
