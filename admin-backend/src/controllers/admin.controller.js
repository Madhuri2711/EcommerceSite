import { HTTP_STATUS } from "../common/constant.js";
import AdminService from "../services/admin.service";
import { response } from "../utility/helpers.js";
import jwtSecretKey from "../config/jwt.config";
import md5 from "md5";
import jwt from "jsonwebtoken";
import CONFIG from "../config/mail.config.js";
import Randomstring from "randomstring";
import { adminEmail, sendEmail } from "../utility/mailer.js";
import UserModel from "../models/website/users";
import hbs from 'nodemailer-express-handlebars';
import { BASE_URL } from "../config/db.config.js";
class AdminController {
  constructor() {
    this.adminService = new AdminService();
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await this.adminService.login(
        email?.toLowerCase(),
        md5(password)
      );
      if (result) {
        if (result?.is_admin) {
          const token = await jwt.sign({ id: result._id }, jwtSecretKey, {
            expiresIn: 31536000, // expires in 365 days
          });
          response(res, HTTP_STATUS.SUCCESS, "login_success", {
            ...result._doc,
            token,
          });
          return;
        } else {
          response(res, HTTP_STATUS.NOT_FOUND, "User_Is_NotAdmin");
          return;
        }
      }
      response(res, HTTP_STATUS.NOT_FOUND, "login_user_and_password_error");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  forgotPassword = async (req, res) => {
    try {
      const { body } = req;
      const data = await this.adminService.forgotPassword(body.email);
      if (data) {
        const randomString = Randomstring.generate();
        const result = await UserModel.findOneAndUpdate(
          { email: body.email },
          { $set: { token: randomString } },
          { new: true }
        );
        const url = `${BASE_URL}/forgotPasswordChange`;
        sendEmail(
          body.email,
          "Forgot Password - Inani",
          null,
          `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&amp;display=swap" rel="stylesheet"><style> * { font-family: 'PT Sans' } a { border: none; color: rgb(27, 128, 196); text-decoration: none; }a:hover { text-decoration: underline; }a:active,a:visited,a:focus { border: none; } </style></head><body style="padding:10px; margin:0px; background-color: #FFFFFF; color: #555555; font-size: 13px;"><table border="0" cellspacing="0" width="100%" style="margin: 0; padding: 0; margin: auto;"><tr><td></td><td width="650"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="border:2px solid #e1e1e1;"><tr style="background: #f27c35 none repeat scroll 0 0;"><td style="padding: 0px; margin: 0; vertical-align: middle;"><table width="100%" border="0" cellspacing="10" cellpadding="0"><tr><td style="text-align: left; margin: 0; padding: 0; width: 150px;"><img src="logo.png" alt="" title="" style="margin:0; padding:0; display:block; border: none;height:20px" /></td><td valign="middle" style="text-align: right; font-size: 16px; margin: 0; padding: 0; color: #fff;">Inani Hub.</td></tr></table></td></tr><tr><td style="padding: 14px 14px 12px 14px;">Dear user,<br/><br/>.</td></tr><tr><td style="padding:0px 14px 12px 14px;"><p style="margin:10px 0px 3px 0px; padding: 0;"><strong>Thanks &amp; Regards</strong></p><p style="margin:0px; padding:0; font-size:12px; color:#868686;">Inani Hub</p></td></tr></table></td><td></td></tr></table></body></html>`,
          null,
          CONFIG.SUPPORT_ADDRESS,
          CONFIG.SUPPORT_AUTH_PASSWORD,
          null
        );

        response(res, HTTP_STATUS.SUCCESS, "forgot_password", {
          message: "Please Check Your Email Send ",
        });
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "forgot_user_not_exist");
      return;
    } catch (err) {
      console.log(err);
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  forgotPasswordChange = async (req, res) => {
    try {
      const request = req.body;
      const token = req.query.token;
      const user = await this.adminService.forgotPasswordChange(
        token,
        md5(request.password)
      );
      if (user) {
        const result = await UserModel.findOneAndUpdate(
          { token: user?.token },
          { $set: { token: "" } },
          { new: true }
        );
        response(res, HTTP_STATUS.SUCCESS, "password_changed_success", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_bad_request");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  verifyToken = async (req, res) => {
    const email = req.query.username;
    const password = req.query.password;
    try {
      const verify = await this.adminService.verifyToken(email, password);
      if (verify) {
        let is_verified = true;
        response(res, HTTP_STATUS.SUCCESS, "user_verified-success", {
          is_verified,
          verify,
        });
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_not_found");
      return;
    } catch (err) {
      console.log(err);
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  getAdmin = async (req, res) => {
    try {
      const result = await this.adminService.getAdmin();
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "get_admin", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  updateAdmin = async (req, res) => {
    try {
      const id = req.params.id;
      const request = req.body;
      const result = await this.adminService.update(id, request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "admin_update", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "admin_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  adminsendmail = async (req, res) => {
    const { maillist, subject, text, html, receiverName, companyName, cc, bcc } = req.body;
    try {

      maillist.toString();
      adminEmail(
        maillist,
        `${subject}`,
        `${text}`,
        null,
        CONFIG.SUPPORT_ADDRESS,
        CONFIG.SUPPORT_AUTH_PASSWORD,
        receiverName,
        companyName,
        cc,
        bcc
      );

      response(res, HTTP_STATUS.SUCCESS, "Admin_send_mail", {
        message: "Please Check Your Email Send ",
      });
      return;
    } catch (err) {
      console.log(err);
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
}

export default AdminController;
