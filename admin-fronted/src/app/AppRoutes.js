import React, { Component, Suspense, lazy, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
import AddProduct from "./dashboard/AddProduct";
import AllUsers from "./dashboard/AllUsers";
import Banner from "./dashboard/Banner";
import BannerList from "./dashboard/BannerList";

import Blogs from "./dashboard/Blogs";
import BlogList from "./dashboard/BlogsList";
import Category from "./dashboard/Category";
import CategoryList from "./dashboard/CategoryList";
import Custom_Content from "./dashboard/Custom_Content";
import EditBanner from "./dashboard/EditBanner";
import EditBlog from "./dashboard/EditBlog";
import EditCategory from "./dashboard/EditCategory";
import EditFaq from "./dashboard/EditFaq";
import EditInquiry from "./dashboard/EditInquiry";
import EditNews_Subscribers from "./dashboard/EditNews_Subscribers";
import EditProduct from "./dashboard/EditProduct";
import EditSubCategory from "./dashboard/EditSubCategory";
import Faq from "./dashboard/Faq";
import FaqList from "./dashboard/FaqList";
import Inquiry from "./dashboard/Inquiry";
import InquiryList from "./dashboard/InquiryList";
import News_SubscribersList from "./dashboard/News_SubscribersList";
import News_Sunscription from "./dashboard/News_Subscription";
import Products from "./dashboard/Products";
import SubCategory from "./dashboard/SubCategory";
import SubCategoryList from "./dashboard/SubCategoryList";
import TestImage from "./dashboard/TestImage";
import ForgotPassword from "./admin-pages/ForgotPassword";
import forgotPasswordChange from "./admin-pages/forgotPasswordChange";

// import UserList from "./dashboard/UserList";
import UserList from "./dashboard/UserList";
import AdminProfileUpdate from "./shared/AdminProfileUpdate";
import EmailSetting from "./shared/EmailSetting";
import { BASE_URL } from "../lib/constant";
import axios from "axios";
import TableExample from "./dashboard/Users";
import Users from "./dashboard/Users";
import ErrorLogs from "./dashboard/ErrorLogs";
import Orders from "./dashboard/Orders";
import EditOrder from "./dashboard/EditOrder";
import Payment_Checkout from "./dashboard/Payment_Checkout";
import BankDetails from "./dashboard/BankDetails";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";

import "../app/util/interceptors";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const Buttons = lazy(() => import("./basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./basic-ui/Dropdowns"));
const Typography = lazy(() => import("./basic-ui/Typography"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

const Mdi = lazy(() => import("./icons/Mdi"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));
const Lockscreen = lazy(() => import("./user-pages/Lockscreen"));

const BlankPage = lazy(() => import("./general-pages/BlankPage"));
class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/icons/mdi" component={Mdi} />
          {/* <Route exact path="/dashboard" component={ Dashboard } />

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } /> */}

          <Route path="/login" component={Login} />
          {/* <Route path="/user-pages/register-1" component={ Register1 } />
          <Route path="/user-pages/lockscreen" component={ Lockscreen } /> */}

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route
            path="/forgotPasswordChange"
            component={forgotPasswordChange}
          />

          {/* <Route path="/general-pages/blank-page" component={ BlankPage } /> */}
          <PrivateRoute path="/" component={InquiryList} exact></PrivateRoute>
          <PrivateRoute path="/inquiry" component={Inquiry}></PrivateRoute>
          <PrivateRoute
            path="/admin/inquiry/update/:id"
            component={EditInquiry}
          ></PrivateRoute>
          <PrivateRoute
            path="/inquirylist"
            component={InquiryList}
          ></PrivateRoute>

          <PrivateRoute path="/faq" component={Faq} />
          <PrivateRoute path="/admin/faq/update/:id" component={EditFaq} />
          <PrivateRoute path="/faqlist" component={FaqList} />

          <PrivateRoute path="/blogs" component={Blogs} />
          <PrivateRoute path="/admin/blog/update/:id" component={EditBlog} />
          <PrivateRoute path="/bloglist" component={BlogList} />

          <PrivateRoute path="/news-subscriber" component={News_Sunscription} />
          <PrivateRoute
            path="/news-subscriberslist"
            component={News_SubscribersList}
          />
          <PrivateRoute
            path="/admin/news-subscribers/update/:id"
            component={EditNews_Subscribers}
          />
          <PrivateRoute path="/custom-content" component={Custom_Content} />

          <PrivateRoute path="/banner" component={Banner} />
          <PrivateRoute
            path="/admin/banner/update/:id"
            component={EditBanner}
          />
          <PrivateRoute path="/bannerlist" component={BannerList} />

          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute
            path="/admin/category/update/:id"
            component={EditCategory}
          />
          <PrivateRoute path="/categorylist" component={CategoryList} />

          <PrivateRoute path="/sub-category" component={SubCategory} />
          <PrivateRoute
            path="/admin/sub-category/update/:id"
            component={EditSubCategory}
          />
          <PrivateRoute path="/sub-categorylist" component={SubCategoryList} />

          <PrivateRoute path="/add/product" component={AddProduct} />
          <PrivateRoute
            path="/admin/product/update/:id"
            component={EditProduct}
          />
          <PrivateRoute path="/products" component={Products} />

          {/* <PrivateRoute path="/users" component={UserList} /> */}
          <PrivateRoute exact path="/user/:id" component={AllUsers} />
          <PrivateRoute
            exact
            path="/profile-update"
            component={AdminProfileUpdate}
          />
          <PrivateRoute exact path="/email-settings" component={EmailSetting} />
          <PrivateRoute exact path="/users" component={Users}></PrivateRoute>
          <PrivateRoute
            exact
            path="/errorlogs"
            component={ErrorLogs}
          ></PrivateRoute>
          <PrivateRoute exact path="/orders" component={Orders}></PrivateRoute>
          <PrivateRoute path="/admin/order/update/:id" component={EditOrder} />
          <PrivateRoute
            path="/admin/payment/checkout/:id"
            component={BankDetails}
          />
          <PrivateRoute
            exact
            path="/payment_checkout"
            component={Payment_Checkout}
          />

          {/* <Redirect to="/dashboard" /> */}
        </Switch>
      </Suspense>
    );
  }
}

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token");
  if (token !== null && token !== undefined) {
    return (
      <>
        <Route
          exact={true}
          path={props.path}
          component={props.component}
          render={() => <Redirect to={"/inquirylist"} />}
        />
      </>
    );
  } else {
    return <Redirect to={"/login"} />;
  }
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// function PrivateRoute({ component: Component, ...rest }) {
//   const verifyToken = async (username, password) => {
//     const token = localStorage.getItem("token");
//     if (token && token !== undefined && token !== null) {
//       try {
//         const res = await axios.get(`${BASE_URL}/admin/verifyToken`);
//         return res?.data?.data?.is_verified;
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return localStorage.getItem("commonPassword") === "Olanna01" ||
//           verifyToken(
//             localStorage.getItem('token'),
//           ) ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//             }}
//           />
//         );
//       }}
//     />
//   );
// }

export default AppRoutes;
