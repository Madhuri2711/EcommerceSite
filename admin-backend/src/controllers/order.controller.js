import { HTTP_STATUS } from "../common/constant.js";
import CanadaPostService from "../services/canadaPost.service.js";
import OrderService from "../services/order.service";
import { response, xmlToJson } from "../utility/helpers.js";

class UserController {
  constructor() {
    this.orderService = new OrderService();
    this.canadaPostService = new CanadaPostService();
  }

  get = async (req, res) => {
    try {
      const result = await this.orderService.get();
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "order_get", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "order_bad_request");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  resendShippingLabel = async (req, res) => {
    try {
      const id = req.params.orderid;
      const order = await this.orderService.getOrderById(id);

      console.log('order', order);

      const delivery_obj = await this.orderService.getCustomerAndSellerInfo(order);

      console.log('delivery_obj', delivery_obj);

      // Canada post request to pickup the order from seller and deliver to customer
      const deliveryServiceResponse = await this.canadaPostService.createShipment(
        delivery_obj.seller,
        delivery_obj.customer,
      );

      console.log('deliveryServiceResponse', deliveryServiceResponse);

      if (deliveryServiceResponse.status === 200) {
        const jsonResponse = await xmlToJson(deliveryServiceResponse.data);
        const contract_info = jsonResponse['non-contract-shipment-info'];
        const shipment_id = contract_info['shipment-id']?.[0];
        const tracking_id = contract_info['tracking-pin']?.[0];
        const linkArr = contract_info?.links?.[0]?.link;
        const label_url_arr = linkArr?.filter((link) => link.$.rel === 'label');
        var label_url = '';
        if (label_url_arr && label_url_arr.length > 0) {
          label_url = label_url_arr[0]?.$.href;
        }
        await this.orderService.update(order._id, {
          shipping_canada_post_id: shipment_id,
          shipping_tracking_id: tracking_id,
          shipping_label_to_seller: label_url,
        });

        const seller_info = await this.orderService.getSellerMail(order.seller_id);

        const seller_label_inforamtion = await this.orderService.getEmailInformation(order);

        await this.canadaPostService.getLabelFromCanadaPost(
          label_url,
          shipment_id,
          seller_info.email,
          `${seller_info.firstName} ${seller_info.lastName}`,
          seller_label_inforamtion.productName,
          seller_label_inforamtion.orderDate,
          seller_label_inforamtion.buyerName,
          seller_label_inforamtion.buyerAddress
        );
      } else {
        // const paymentIntent = await stripe.paymentIntents.retrieve({
        //     client_secret: request.client_secret
        // });
        // if (paymentIntent) {
        //     const refund = await stripe.refunds.create({
        //         payment_intent: 'pi_Aabcxyz01aDfoo',
        //     });
        // }
        response(res, HTTP_STATUS.BAD_REQUEST, 'canada_post_error', order);
        return;
      }

      if (order) {
        response(res, HTTP_STATUS.SUCCESS, "order_get", order);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "order_bad_request");
      return;
    } catch (err) {
      console.log('err', err);
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const request = req.body.address
      const result = await this.orderService.update(id, request);
      if (result) {
        response(res, HTTP_STATUS.SUCCESS, "order_update", result);
        return;
      }
      response(res, HTTP_STATUS.BAD_REQUEST, "order_bad_request");
      return;
    } catch (err) {
      response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "internal_server_error");
      return;
    }
  }
}


export default UserController