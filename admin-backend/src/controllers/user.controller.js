import { HTTP_STATUS } from "../common/constant.js";
import UserService from "../services/user.service.js";
import { response } from "../utility/helpers.js";
import tokenInfo from "../utility/jwt/tokenInfo.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  get = async (req, res) => {
    try {
      const {
        search,
        pageLimit,
        page
      } = req?.body;
      const filter = {
        $or: [{ firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        ],
      };

      const result = await this.userService.get(filter, pageLimit, page);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "user_get", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_bad_request");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  activeAndDeactive = async (req, res) => {
    try {
      const id = req.params.id;
      const request = req.body.isActive;
      const result = await this.userService.activeAndDeactive(id, request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "user_update", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  isDelete = async (req, res) => {
    try {
      const id = req.params.id;
      const request = req.body.is_delete;
      const result = await this.userService.update(id, request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "user_delete", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_bad_request");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserId(id);
      if (user) {
        const product = await this.userService.getUserProduct(user._id);
        const bank_details = await this.userService.getBankDetails(user._id);
        const comment = await this.userService.getComment(user._id);
        const address = await this.userService.getAddress(user._id);
        const cart = await this.userService.getcart(user._id);
        const wallet = await this.userService.getWallet(user._id);
        const orderlist = await this.userService.getOrder(user._id);
        const review = await this.userService.getReview(user._id);
        const whishlist = await this.userService.getWhishlist(user._id);
        const makeoffer = await this.userService.getMakeoffer(user._id);
        const notification = await this.userService.getNotification(user._id);

        response(res, HTTP_STATUS.SUCCESS, "user_detals", {
          ...user._doc,
          product,
          bank_details,
          comment,
          address,
          cart,
          wallet,
          orderlist,
          review,
          whishlist,
          makeoffer,
          notification,
        });
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "user_bad_request");
      return;
    } catch (error) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
}

export default UserController;
