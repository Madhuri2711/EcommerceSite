import { HTTP_STATUS } from '../common/constant.js';
import LandingSiteService from '../services/landingSite.service.js';
import { response } from '../utility/helpers.js';

class LandingSiteController {
    constructor() {
        this.landingSiteService = new LandingSiteService();
    }

    getBlogs = async (req, res) => {
        try {
            const result = await this.landingSiteService.getBlog();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'blog_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getBlogByID = async (req, res) => {
        try {
            const id = req.params.blog_id;
            const result = await this.landingSiteService.getBlogByID(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'blog_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addBlog = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.landingSiteService.addBlog(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'blog_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updateBlog = async (req, res) => {
        try {
            const id = req.params.blog_id;
            const request = req.body;

            const result = await this.landingSiteService.updateBlog(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'blog_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    deleteBlog = async (req, res) => {
        try {
            const id = req.params.blog_id;
            const result = await this.landingSiteService.deleteBlog(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'blog_delete', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // contact us
    getContact = async (req, res) => {
        try {
            const result = await this.landingSiteService.getContact();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'contact_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getContactUsByID = async (req, res) => {
        try {
            const id = req.params.contact_id;
            const result = await this.landingSiteService.getContactUsByID(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'contact_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addContactUs = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.landingSiteService.addContactUs(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'contact_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updateContactUs = async (req, res) => {
        try {
            const id = req.params.contact_id;
            const request = req.body;

            const result = await this.landingSiteService.updateContactUs(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'contact_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    deleteContactUs = async (req, res) => {
        try {
            const id = req.params.contact_id;
            const result = await this.landingSiteService.deleteContactUs(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'contact_delete', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // Custom Settings
    getCustomSettings = async (req, res) => {
        try {
            const result = await this.landingSiteService.getCustomSettings();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'custom_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getCustomSettingsByID = async (req, res) => {
        try {
            const id = req.params.custom_id;
            const result = await this.landingSiteService.getCustomSettingsByID(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'custom_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addCustomSettings = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.landingSiteService.addCustomSettings(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'custom_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updateCustomSettings = async (req, res) => {
        try {
            const id = req.params.custom_id;
            const request = req.body;

            const result = await this.landingSiteService.updateCustomSettings(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'custom_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    deleteCustomSettings = async (req, res) => {
        try {
            const id = req.params.custom_id;
            const result = await this.landingSiteService.deleteCustomSettings(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'custom_delete', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // FAQ Settings
    getFAQSettings = async (req, res) => {
        try {
            const result = await this.landingSiteService.getFAQSettings();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'faq_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getFAQSettingsByID = async (req, res) => {
        try {
            const id = req.params.faq_id;
            const result = await this.landingSiteService.getFAQSettingsByID(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'faq_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addFAQSettings = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.landingSiteService.addFAQSettings(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'faq_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updateFAQSettings = async (req, res) => {
        try {
            const id = req.params.faq_id;
            const request = req.body;

            const result = await this.landingSiteService.updateFAQSettings(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'faq_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    deleteFAQSettings = async (req, res) => {
        try {
            const id = req.params.faq_id;
            const result = await this.landingSiteService.deleteFAQSettings(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'faq_delete', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // News letter subscription Settings
    getNewsSettings = async (req, res) => {
        try {
            const result = await this.landingSiteService.getNewsSettings();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'news_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getNewsSettingsByID = async (req, res) => {
        try {
            const id = req.params.news_id;
            const result = await this.landingSiteService.getNewsSettingsByID(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'news_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addNewsSettings = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.landingSiteService.addNewsSettings(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'news_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updateNewsSettings = async (req, res) => {
        try {
            const id = req.params.news_id;
            const request = req.body;

            const result = await this.landingSiteService.updateNewsSettings(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'news_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    deleteNewsSettings = async (req, res) => {
        try {
            const id = req.params.news_id;
            const result = await this.landingSiteService.deleteNewsSettings(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'news_delete', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    // Profile
    getProfiles = async (req, res) => {
        try {
            const result = await this.landingSiteService.getProfiles();
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'profile_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    getProfileByID = async (req, res) => {
        try {
            const id = req.params.profile_id;
            const result = await this.landingSiteService.getProfileByID(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'profile_get', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    addNewProfile = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.landingSiteService.addNewProfile(request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'profile_add', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    updateNewProfile = async (req, res) => {
        try {
            const id = req.params.profile_id;
            const request = req.body;

            const result = await this.landingSiteService.updateNewProfile(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'profile_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    deleteNewProfile = async (req, res) => {
        try {
            const id = req.params.profile_id;
            const result = await this.landingSiteService.deleteNewProfile(id);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'profile_delete', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };
}

export default LandingSiteController;
