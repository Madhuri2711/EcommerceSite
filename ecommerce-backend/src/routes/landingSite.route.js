import express from 'express';
import LandingController from '../controllers/landingSite.controller.js';

const landingRouter = express.Router();
const landingController = new LandingController();

// Blogs
landingRouter.get('/blogs', landingController.getBlogs);
landingRouter.get('/blogs/:blog_id', landingController.getBlogByID);
landingRouter.post('/blog', landingController.addBlog);
landingRouter.delete("/blog/:blog_id", landingController.deleteBlog);
landingRouter.put("/blog/:blog_id", landingController.updateBlog);

// Contacts
landingRouter.get('/contact-us', landingController.getContact);
landingRouter.get('/contact-us/:contact_id', landingController.getContactUsByID);
landingRouter.post('/contact-us', landingController.addContactUs);
landingRouter.delete("/contact-us/:contact_id", landingController.deleteContactUs);
landingRouter.put("/contact-us/:contact_id", landingController.updateContactUs);

// Custom Settings
landingRouter.get('/custom-setting', landingController.getCustomSettings);
landingRouter.get('/custom-setting/:custom_id', landingController.getCustomSettingsByID);
landingRouter.post('/custom-setting', landingController.addCustomSettings);
landingRouter.delete("/custom-setting/:custom_id", landingController.deleteCustomSettings);
landingRouter.put("/custom-setting/:custom_id", landingController.updateCustomSettings);

// FAQ
landingRouter.get('/faq', landingController.getFAQSettings);
landingRouter.get('/faq/:faq_id', landingController.getFAQSettingsByID);
landingRouter.post('/faq', landingController.addFAQSettings);
landingRouter.delete("/faq/:faq_id", landingController.deleteFAQSettings);
landingRouter.put("/faq/:faq_id", landingController.updateFAQSettings);

// News letter subscription
landingRouter.get('/news-letter', landingController.getNewsSettings);
landingRouter.get('/news-letter/:news_id', landingController.getNewsSettingsByID);
landingRouter.post('/news-letter', landingController.addNewsSettings);
landingRouter.delete("/news-letter/:news_id", landingController.deleteNewsSettings);
landingRouter.put("/news-letter/:news_id", landingController.updateNewsSettings);

// Profile
landingRouter.get('/profile', landingController.getProfiles);
landingRouter.get('/profile/:profile_id', landingController.getProfileByID);
landingRouter.post('/profile', landingController.addNewProfile);
landingRouter.delete("/profile/:profile_id", landingController.deleteNewProfile);
landingRouter.put("/profile/:profile_id", landingController.updateNewProfile);

export default landingRouter;
