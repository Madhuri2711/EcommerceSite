import mongoose from "mongoose";
import { SCREEN_NOTIFICATION } from "../../common/constant";
var Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  name: { type: String },
  img: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  type: { type: String },
  user_id: { type: mongoose.Schema.ObjectId, ref: "users" },
  // order_id: { type: mongoose.Schema.ObjectId, ref: "orders" },
  is_visible: { type: Boolean, default: false },
  created_date: { type: Date, default: Date.now() },
  screen: {
    type: String,
    enum: [
      SCREEN_NOTIFICATION.PRODUCT_DETAILS,
      SCREEN_NOTIFICATION.SELLER_ORDERS,
    ],
  },
  product_id: { type: mongoose.Schema.ObjectId, ref: "products" },
});

export default mongoose.model("notification", NotificationSchema);
