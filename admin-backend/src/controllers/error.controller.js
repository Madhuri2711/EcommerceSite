import { HTTP_STATUS } from "../common/constant.js";
import ErrorServices from "../services/error.service";
import { response } from "../utility/helpers.js";

class errorController {
  constructor() {
    this.errorServices = new ErrorServices();
  }

  get = async (req, res) => {
    try {
      const result = await this.errorServices.get();
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "get_error", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "Bad_request");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };
}

export default errorController;
