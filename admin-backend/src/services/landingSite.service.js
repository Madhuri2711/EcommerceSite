import BlogModel from '../models/website/blog.js';
import ContactModel from '../models/website/contactus.js';
import CustomSettingsModel from '../models/website/customSettings.js';
import FAQModel from '../models/website/faq.js';
import NewsLetterSubscriptionModel from '../models/website/newsLetterSubscription.js';
import ProfileModel from '../models/website/profile.js';

class LandingPageService {
    // blogs us API
    getBlog = () => {
        return BlogModel.find();
    };
    getBlogByID = (_id) => {
        return BlogModel.findOne({
            _id,
        });
    };
    addBlog = (data) => {
        return BlogModel.create(data);
    };
    deleteBlog = (id) => {
        return BlogModel.findByIdAndDelete(id);
    };
    updateBlog = (id, data) => {
        return BlogModel.findByIdAndUpdate(id, data, { new: true });
    };

    // contact us API
    getContact = () => {
        return ContactModel.find();
    };
    getContactUsByID = (_id) => {
        return ContactModel.findOne({
            _id,
        });
    };
    addContactUs = (data) => {
        return ContactModel.create(data);
    };
    deleteContactUs = (id) => {
        return ContactModel.findByIdAndDelete(id);
    };
    updateContactUs = (id, data) => {
        return ContactModel.findByIdAndUpdate(id, data, { new: true });
    };

    // Custom Settings API
    getCustomSettings = () => {
        return CustomSettingsModel.find();
    };
    getCustomSettingsByID = (_id) => {
        return CustomSettingsModel.findOne({
            _id,
        });
    };
    addCustomSettings = (data) => {
        return CustomSettingsModel.create(data);
    };
    deleteCustomSettings = (id) => {
        return CustomSettingsModel.findByIdAndDelete(id);
    };
    updateCustomSettings = (id, data) => {
        return CustomSettingsModel.findByIdAndUpdate(id, data, { new: true });
    };

    // FAQ API
    getFAQSettings = () => {
        return FAQModel.find();
    };
    getFAQSettingsByID = (_id) => {
        return FAQModel.findOne({
            _id,
        });
    };
    addFAQSettings = (data) => {
        return FAQModel.create(data);
    };
    deleteFAQSettings = (id) => {
        return FAQModel.findByIdAndDelete(id);
    };
    updateFAQSettings = (id, data) => {
        return FAQModel.findByIdAndUpdate(id, data, { new: true });
    };

    // News letter subscription API
    getNewsSettings = () => {
        return NewsLetterSubscriptionModel.find();
    };
    getNewsSettingsByID = (_id) => {
        return NewsLetterSubscriptionModel.findOne({
            _id,
        });
    };
    addNewsSettings = (data) => {
        return NewsLetterSubscriptionModel.create(data);
    };
    deleteNewsSettings = (id) => {
        return NewsLetterSubscriptionModel.findByIdAndDelete(id);
    };
    updateNewsSettings = (id, data) => {
        return NewsLetterSubscriptionModel.findByIdAndUpdate(id, data, { new: true });
    };

    // Profile API
    getProfiles = () => {
        return ProfileModel.find();
    };
    getProfileByID = (_id) => {
        return ProfileModel.findOne({
            _id,
        });
    };
    addNewProfile = (data) => {
        return ProfileModel.create(data);
    };
    deleteNewProfile = (id) => {
        return ProfileModel.findByIdAndDelete(id);
    };
    updateNewProfile = (id, data) => {
        return ProfileModel.findByIdAndUpdate(id, data, { new: true });
    };
}

export default LandingPageService;
