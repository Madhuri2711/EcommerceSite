import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
// import cartReducer from "./cartReducer";
// import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import AuthReducer from "../../slices/auth";
import MessageReducer from "../../slices/message";
import productsReducer from "../../slices/product";
import categoryReducer from "../../slices/category";
import subcategoryReducer from "../../slices/sub.category";
import cartReducer from "../../slices/cart";
import userReducer from "../../slices/user.details";
import addressReducer from "../../slices/address";
import wishlistReducer from "../../slices/wishlist";
import compareProductReducer from "../../slices/compare";
import compareProductCountReducer from "../../slices/compareproductcount";
import notificationReducer from "../../slices/notification";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  // cartData: cartReducer,
  // wishlistData: wishlistReducer,
  compareData: compareReducer,
  auth: AuthReducer,
  message: MessageReducer,
  products: productsReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  cart: cartReducer,
  user: userReducer,
  address: addressReducer,
  wishlist: wishlistReducer,
  compare: compareProductReducer,
  compareCount: compareProductCountReducer,
  notification: notificationReducer,

});

export default rootReducer;
