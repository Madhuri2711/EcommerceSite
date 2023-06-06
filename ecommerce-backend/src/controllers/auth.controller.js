import jwt from 'jsonwebtoken';
import md5 from 'md5';
import Randomstring from 'randomstring';
import { HTTP_STATUS } from '../common/constant.js';
import AuthService from '../services/auth.service.js';
import { response } from '../utility/helpers.js';
import jwtSecretKey from '../config/jwt.config.js';
import { sendEmail } from '../utility/mailer.js';
import tokenInfo from '../utility/jwt/tokenInfo.js';
import CONFIG from '../config/mail.config.js';

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    signup = async (req, res) => {
        try {
            const request = req.body;
            const userExist = await this.authService.userExist(request.email, request.userName);
            if (userExist.length > 0 && userExist[0].isActive === true) {
                response(res, HTTP_STATUS.BAD_REQUEST, 'user_already_exist');
                return;
            } else if (userExist.length > 0 && userExist[0].isActive === false) {
               const id = userExist[0]._id;
               request.isActive = true
                request.password = md5(req.body.password);
                request.image = 'user-icon.png';
                request.email = request.email?.toLowerCase().trim();
                request.userName = request.userName?.toLowerCase().trim();
                if (request.userName !== "") {
                    const result = await this.authService.update(id, request);
                    sendEmail(
                        result.email,
                        'Create a new account for Inani Hub',
                        null,
                        `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style>*{font-family:'PT Sans'}a{border:none;color:#1b80c4;text-decoration:none}a:hover{text-decoration:underline}a:active,a:focus,a:visited{border:none}</style></head><body style="padding:10px;margin:0;background-color:#fff;color:#555;font-size:13px"><table border="0" cellspacing="0" width="100%" style="margin:0;padding:0;margin:auto"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1"><tr style="background:#f27c35 none repeat scroll 0 0"><td style="padding:0;margin:0;vertical-align:middle"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align:left;margin:0;padding:0;width:150px"><img src="logo.png" alt="" title="" style="margin:0;padding:0;display:block;border:none;height:20px"></td><td valign="middle" style="text-align:right;font-size:16px;margin:0;padding:0;color:#fff">Welcome to Inani Hub</td></tr></table></td></tr><tr><td style="padding:14px 14px 12px 14px">Welcome to INANI!,<br><br>We are so glad to have you join our community.<br><br>Whether you are a buyer or a seller, you are sure to feel valued with our numerous users all transacting by earning extra cash or buying valuable items at a discount.<br><br>Together, we are building a non judgemental community that welcomes everyone.</td></tr><tr><td style="padding:0 14px 12px 14px"><p style="margin:10px 0 3px 0;padding:0"><strong>Thanks &amp; Regards</strong></p><p style="margin:0;padding:0;font-size:12px;color:#868686">The Inani team</p></td></tr></table></td><td></td></tr></table></body></html>`,
                        null,
                        CONFIG.SUPPORT_ADDRESS,
                        CONFIG.SUPPORT_AUTH_PASSWORD,
                        null
                    );
                    response(res, HTTP_STATUS.SUCCESS, 'signup_success', result);
                    return;
                } else {
                    response(res, HTTP_STATUS.BAD_REQUEST, 'user_name_blank');
                    return;
                }
            } else {
                request.password = md5(req.body.password);
                request.image = 'user-icon.png';
                request.email = request.email?.toLowerCase().trim();
                request.userName = request.userName?.toLowerCase().trim();
                if (request.userName !== "") {
                    const result = await this.authService.signup(request);
                    sendEmail(
                        result.email,
                        'Create a new account for Inani Hub',
                        null,
                        `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style>*{font-family:'PT Sans'}a{border:none;color:#1b80c4;text-decoration:none}a:hover{text-decoration:underline}a:active,a:focus,a:visited{border:none}</style></head><body style="padding:10px;margin:0;background-color:#fff;color:#555;font-size:13px"><table border="0" cellspacing="0" width="100%" style="margin:0;padding:0;margin:auto"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1"><tr style="background:#f27c35 none repeat scroll 0 0"><td style="padding:0;margin:0;vertical-align:middle"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align:left;margin:0;padding:0;width:150px"><img src="logo.png" alt="" title="" style="margin:0;padding:0;display:block;border:none;height:20px"></td><td valign="middle" style="text-align:right;font-size:16px;margin:0;padding:0;color:#fff">Welcome to Inani Hub</td></tr></table></td></tr><tr><td style="padding:14px 14px 12px 14px">Welcome to INANI!,<br><br>We are so glad to have you join our community.<br><br>Whether you are a buyer or a seller, you are sure to feel valued with our numerous users all transacting by earning extra cash or buying valuable items at a discount.<br><br>Together, we are building a non judgemental community that welcomes everyone.</td></tr><tr><td style="padding:0 14px 12px 14px"><p style="margin:10px 0 3px 0;padding:0"><strong>Thanks &amp; Regards</strong></p><p style="margin:0;padding:0;font-size:12px;color:#868686">The Inani team</p></td></tr></table></td><td></td></tr></table></body></html>`,
                        null,
                        CONFIG.SUPPORT_ADDRESS,
                        CONFIG.SUPPORT_AUTH_PASSWORD,
                        null
                    );
                    response(res, HTTP_STATUS.SUCCESS, 'signup_success', result);
                    return;
                } else {
                    response(res, HTTP_STATUS.BAD_REQUEST, 'user_name_blank');
                    return;
                }
            }

        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    login = async (req, res) => {
        try {
            const { email, password, app_device_id, device_type } = req.body;
            const result = await this.authService.login(email?.toLowerCase(), md5(password));
            if (result) {
                const token = await jwt.sign({ id: result._id }, jwtSecretKey, {
                    expiresIn: 31536000, // expires in 365 days
                });
                await this.authService.updateUserDeviceId(result._id, { app_device_id, device_type });
                response(res, HTTP_STATUS.SUCCESS, 'login_success', { ...result._doc, token });
                return;
            }
            response(res, HTTP_STATUS.NOT_FOUND, 'login_user_and_password_error');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    adminlogin = async (req, res) => {
        try {
            const { username, password} = req.body;
            const result = await this.authService.adminlogin(username, md5(password));
            if (result) {
                const token = await jwt.sign({ id: result._id }, jwtSecretKey, {
                    expiresIn: 31536000, // expires in 365 days
                });
                await this.authService.updateUserDeviceId(result._id, { app_device_id, device_type });
                response(res, HTTP_STATUS.SUCCESS, 'login_success', { ...result._doc, token });
                return;
            }
            response(res, HTTP_STATUS.NOT_FOUND, 'login_user_and_password_error');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    authSocialLogin = async (req, res) => {
        try {
            const result = await this.authService.authSocialLogin(req.body);
            if (result) {
                const token = await jwt.sign({ id: result._id }, jwtSecretKey, {
                    expiresIn: 31536000, // expires in 365 days
                });
                response(res, HTTP_STATUS.SUCCESS, 'login_success', { ...result._doc, token });
                return;
            }
            response(res, HTTP_STATUS.NOT_FOUND, 'login_user_and_password_error');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }

    update = async (req, res) => {
        try {
            const id = req.params.user_id;
            const request = req.body;
            const result = await this.authService.update(id, request);
            if (result) {
                response(res, HTTP_STATUS.SUCCESS, 'user_update', result);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'user_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    forgotPassword = async (req, res) => {
        try {
            const { body } = req;
            const data = await this.authService.forgotPassword(body.email);
            if (data) {
                const otp = Randomstring.generate({ length: 4, charset: 'numeric' });
                sendEmail(
                    data?.email,
                    'Forgot Password - Inani',
                    null,
                    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style> * { font-family: 'PT Sans' } a { border: none; color: rgb(27, 128, 196); text-decoration: none; }a:hover { text-decoration: underline; }a:active,a:visited,a:focus { border: none; } </style></head><body style="padding:10px; margin:0px; background-color: #FFFFFF; color: #555555; font-size: 13px;"><table border="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; margin: auto;"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1;"><tr style="background: #f27c35 none repeat scroll 0 0;"><td style="padding: 0px; margin: 0; vertical-align: middle;"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align: left; margin: 0; padding: 0; width: 150px;"><img src="logo.png" alt="" title="" style="margin:0; padding:0; display:block; border: none;height:20px" /></td><td valign="middle" style="text-align: right; font-size: 16px; margin: 0; padding: 0; color: #fff;">Forgot Password.</td></tr></table></td></tr><tr><td style="padding: 14px 14px 12px 14px;">Dear user,<br/><br/>Your forgot password OTP is <a href="#">${otp}</a><br/>If you haven't reset, please contact to admin.</td></tr><tr><td style="padding:0px 14px 12px 14px;"><p style="margin:10px 0px 3px 0px; padding: 0;"><strong>Thanks &amp; Regards</strong></p><p style="margin:0px; padding:0; font-size:12px; color:#868686;">Inani Hub</p></td></tr></table></td><td></td></tr></table></body></html>`,
                    null,
                    CONFIG.SUPPORT_ADDRESS,
                    CONFIG.SUPPORT_AUTH_PASSWORD,
                    null
                );
                response(res, HTTP_STATUS.SUCCESS, 'forgot_password', {
                    otp,
                });
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'forgot_user_not_exist');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    resendMail = async (req, res) => {
        try {
            const { body } = req;
            const data = await this.authService.forgotPassword(body.email);
            if (data) {
                const otp = Randomstring.generate({ length: 4, charset: 'numeric' });
                sendEmail(
                    body.email,
                    'Forgot Password - Inani',
                    null,
                    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style> * { font-family: 'PT Sans' } a { border: none; color: rgb(27, 128, 196); text-decoration: none; }a:hover { text-decoration: underline; }a:active,a:visited,a:focus { border: none; } </style></head><body style="padding:10px; margin:0px; background-color: #FFFFFF; color: #555555; font-size: 13px;"><table border="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; margin: auto;"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1;"><tr style="background: #f27c35 none repeat scroll 0 0;"><td style="padding: 0px; margin: 0; vertical-align: middle;"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align: left; margin: 0; padding: 0; width: 150px;"><img src="logo.png" alt="" title="" style="margin:0; padding:0; display:block; border: none;height:20px" /></td><td valign="middle" style="text-align: right; font-size: 16px; margin: 0; padding: 0; color: #fff;">Forgot Password.</td></tr></table></td></tr><tr><td style="padding: 14px 14px 12px 14px;">Dear user,<br/><br/>Your forgot password OTP is <a href="#">${otp}</a><br/>If you haven't reset, please contact to admin.</td></tr><tr><td style="padding:0px 14px 12px 14px;"><p style="margin:10px 0px 3px 0px; padding: 0;"><strong>Thanks &amp; Regards</strong></p><p style="margin:0px; padding:0; font-size:12px; color:#868686;">Inani Hub</p></td></tr></table></td><td></td></tr></table></body></html>`,
                    null,
                    CONFIG.SUPPORT_ADDRESS,
                    CONFIG.SUPPORT_AUTH_PASSWORD,
                    null
                );

                response(res, HTTP_STATUS.SUCCESS, 'resend_email', {
                    otp,
                });
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'user_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    forgotPasswordChange = async (req, res) => {
        try {
            const request = req.body;
            const user = await this.authService.forgotPasswordChange(
                request.email,
                md5(request.password)
            );
            if (user) {
                response(res, HTTP_STATUS.SUCCESS, 'password_changed_success', user);
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'user_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    };

    changePassword = async (req, res) => {
        try {
            const user = tokenInfo(req, res);
            const data = await this.authService.checkPassword(user?.id, md5(req.body.oldPassword), md5(req.body.newPassword))

            if (data) {
                response(res, HTTP_STATUS.SUCCESS, 'user_password_changed_success', data);
                return;
            } else {
                response(res, HTTP_STATUS.NOT_FOUND, 'wrong_password');
                return;
            }
            response(res, HTTP_STATUS.BAD_REQUEST, 'user_bad_request');
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }

    addErrorLog = async (req, res) => {
        try {
            const request = req.body;
            const result = await this.authService.addErrorLog(request);
            response(res, HTTP_STATUS.SUCCESS, 'error_logs_success', result);
            return;
        } catch (err) {
            response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'internal_server_error');
            return;
        }
    }
}

export default AuthController;
