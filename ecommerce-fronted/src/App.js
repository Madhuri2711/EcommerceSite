
import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import PrivateRoute from "./components/route/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

//Admin
import AdminLogin from "./admin/AdminLogin";
import AdminSidebar from "./admin/AdminSidebar";
import ManageUsers from "./admin/ManageUsers";
import Cities from "./admin/Cities";

// Blog
import BlogDetail from "./components/BlogDetail";
import Faq from "./pages/other/Faq";
import PrivacyPolicy from "./pages/other/PrivacyPolicy";
import TermsAndCondition from "./pages/other/TermsAndCondition";
import Blog from "./pages/other/Blog";


// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeFashionEight = lazy(() => import("./pages/home/HomeFashionEight"));
const HomeKidsFashion = lazy(() => import("./pages/home/HomeKidsFashion"));
const HomeCosmetics = lazy(() => import("./pages/home/HomeCosmetics"));
const HomeFurniture = lazy(() => import("./pages/home/HomeFurniture"));
const HomeFurnitureTwo = lazy(() => import("./pages/home/HomeFurnitureTwo"));
const HomeFurnitureThree = lazy(() =>
  import("./pages/home/HomeFurnitureThree")
);
const HomeFurnitureFour = lazy(() => import("./pages/home/HomeFurnitureFour"));
const HomeFurnitureFive = lazy(() => import("./pages/home/HomeFurnitureFive"));
const HomeFurnitureSix = lazy(() => import("./pages/home/HomeFurnitureSix"));
const HomeFurnitureSeven = lazy(() =>
  import("./pages/home/HomeFurnitureSeven")
);
const HomeElectronics = lazy(() => import("./pages/home/HomeElectronics"));
const HomeElectronicsTwo = lazy(() =>
  import("./pages/home/HomeElectronicsTwo")
);
const HomeElectronicsThree = lazy(() =>
  import("./pages/home/HomeElectronicsThree")
);
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));
const HomeBookStoreTwo = lazy(() => import("./pages/home/HomeBookStoreTwo"));
const HomePlants = lazy(() => import("./pages/home/HomePlants"));
const HomeFlowerShop = lazy(() => import("./pages/home/HomeFlowerShop"));
const HomeFlowerShopTwo = lazy(() => import("./pages/home/HomeFlowerShopTwo"));
const HomeOrganicFood = lazy(() => import("./pages/home/HomeOrganicFood"));
const HomeOrganicFoodTwo = lazy(() =>
  import("./pages/home/HomeOrganicFoodTwo")
);
const HomeOnepageScroll = lazy(() => import("./pages/home/HomeOnepageScroll"));
const HomeGridBanner = lazy(() => import("./pages/home/HomeGridBanner"));
const HomeAutoParts = lazy(() => import("./pages/home/HomeAutoParts"));
const HomeCakeShop = lazy(() => import("./pages/home/HomeCakeShop"));
const HomeHandmade = lazy(() => import("./pages/home/HomeHandmade"));
const HomePetFood = lazy(() => import("./pages/home/HomePetFood"));
const HomeMedicalEquipment = lazy(() =>
  import("./pages/home/HomeMedicalEquipment")
);
const HomeChristmas = lazy(() => import("./pages/home/HomeChristmas"));
const HomeBlackFriday = lazy(() => import("./pages/home/HomeBlackFriday"));
const HomeBlackFridayTwo = lazy(() =>
  import("./pages/home/HomeBlackFridayTwo")
);
const HomeValentinesDay = lazy(() => import("./pages/home/HomeValentinesDay"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// user profile
// const ProfileInfo = lazy(() =>
//   import("../src/components/account/PersonalInfo")
// );

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const ContactUs = lazy(() => import("./pages/other/ContactUs"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const SignIn = lazy(() => import("./pages/other/SignIn"));
const OtpInput = lazy(() => import("./pages/other/OtpInput"));
const ForgotPassword = lazy(() => import("./pages/other/Forgot-Password"));
const ForgotPasswordChange = lazy(() =>
  import("./pages/other/Forgot-Password-Change")
);
const Registration = lazy(() => import("./pages/other/Registration"));
const AccountChangePassword = lazy(() =>
  import("./pages/other/AccountChangePassword")
);
const ManageAddress = lazy(() => import("./pages/other/ManageAddress"));
const ManageBundle = lazy(() => import("./pages/other/ManageBundle"));
const Dashboard = lazy(() => import("./pages/other/Dashboard"));
const Notification = lazy(() => import("./pages/other/Notification"));

const BankDetails = lazy(() => import("./pages/other/BankDetails"));

const Transaction = lazy(() => import("./pages/other/Transaction"));
const Card = lazy(() => import("./pages/payment/PaymentCard"));
const Wallet = lazy(() => import("./pages/wallet/Wallet"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const AddProduct = lazy(() => import("./pages/profile/AddEditProducts"));
const PaymentSuccess = lazy(() => import("./pages/payment/paymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/payment/paymentFail"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const Support = lazy(() => import("./pages/other/Support"));
const NotFound = lazy(() => import("./pages/other/NotFound"));


const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>

              <Route 
                exact
                path="/admin"
                component={AdminLogin}
              />
               <Route 
                exact
                path="/ManageUsers"
                component={ManageUsers}
              />
               <Route 
                exact
                path="/cities"
                component={Cities}
              />


<Route 
                exact
                path="/adminsidebar"
                component={AdminSidebar}
              />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashion}
                />
                {/* 
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/personal-info"}
                  component={ProfileInfo}
                /> */}

                {/* Homepages */}
                <Route
                  path={process.env.PUBLIC_URL + "/home-fashion"}
                  component={HomeFashion}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/payment-success"}
                  component={PaymentSuccess}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/payment-failed"}
                  component={PaymentFailed}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-two"}
                  component={HomeFashionTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-three"}
                  component={HomeFashionThree}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-four"}
                  component={HomeFashionFour}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-five"}
                  component={HomeFashionFive}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-six"}
                  component={HomeFashionSix}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-seven"}
                  component={HomeFashionSeven}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-fashion-eight"}
                  component={HomeFashionEight}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-kids-fashion"}
                  component={HomeKidsFashion}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-cosmetics"}
                  component={HomeCosmetics}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture"}
                  component={HomeFurniture}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture-two"}
                  component={HomeFurnitureTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture-three"}
                  component={HomeFurnitureThree}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture-four"}
                  component={HomeFurnitureFour}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture-five"}
                  component={HomeFurnitureFive}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture-six"}
                  component={HomeFurnitureSix}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-furniture-seven"}
                  component={HomeFurnitureSeven}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-electronics"}
                  component={HomeElectronics}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-electronics-two"}
                  component={HomeElectronicsTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-electronics-three"}
                  component={HomeElectronicsThree}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-book-store"}
                  component={HomeBookStore}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-book-store-two"}
                  component={HomeBookStoreTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-plants"}
                  component={HomePlants}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-flower-shop"}
                  component={HomeFlowerShop}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-flower-shop-two"}
                  component={HomeFlowerShopTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-organic-food"}
                  component={HomeOrganicFood}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-organic-food-two"}
                  component={HomeOrganicFoodTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-onepage-scroll"}
                  component={HomeOnepageScroll}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-grid-banner"}
                  component={HomeGridBanner}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-auto-parts"}
                  component={HomeAutoParts}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-cake-shop"}
                  component={HomeCakeShop}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-handmade"}
                  component={HomeHandmade}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-pet-food"}
                  component={HomePetFood}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-medical-equipment"}
                  component={HomeMedicalEquipment}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-christmas"}
                  component={HomeChristmas}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-black-friday"}
                  component={HomeBlackFriday}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-black-friday-two"}
                  component={HomeBlackFridayTwo}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/home-valentines-day"}
                  component={HomeValentinesDay}
                />

                {/* Shop pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/products"}
                  component={ShopGridStandard}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-standard/:id"}
                  component={ShopGridStandard}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-filter"}
                  component={ShopGridFilter}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-two-column"}
                  component={ShopGridTwoColumn}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-no-sidebar"}
                  component={ShopGridNoSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-full-width"}
                  component={ShopGridFullWidth}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-grid-right-sidebar"}
                  component={ShopGridRightSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-standard"}
                  component={ShopListStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-full-width"}
                  component={ShopListFullWidth}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/shop-list-two-column"}
                  component={ShopListTwoColumn}
                />

                {/* Shop product pages */}
                <Route
                  path="/product/:id"
                  render={(routeProps) => (
                    <Product {...routeProps} key={routeProps.match.params.id} />
                  )}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                  component={ProductTabRight}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-sticky/:id"}
                  component={ProductSticky}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-slider/:id"}
                  component={ProductSlider}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/product-fixed-image/:id"}
                  component={ProductFixedImage}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog-standard"}
                  component={BlogStandard}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-no-sidebar"}
                  component={BlogNoSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-right-sidebar"}
                  component={BlogRightSidebar}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/blog-details-standard"}
                  component={BlogDetailsStandard}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/forgot-password-change"}
                  component={ForgotPasswordChange}
                ></Route>

                <Route
                  path={process.env.PUBLIC_URL + "/bank-details"}
                  component={BankDetails}
                ></Route>

                <Route
                  path={process.env.PUBLIC_URL + "/sign-in"}
                  component={SignIn}
                ></Route>
                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Registration}
                ></Route>

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/change-password"}
                  component={AccountChangePassword}
                ></PrivateRoute>

                <Route
                  path={process.env.PUBLIC_URL + "/forgot-password"}
                  component={ForgotPassword}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/address"}
                  component={ManageAddress}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/otp"}
                  component={OtpInput}
                />

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/cart/:id"}
                  component={Cart}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/support/contact"}
                  component={Support}
                />

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/profile"}
                  component={Profile}
                />


                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/profile/product"}
                  component={AddProduct}
                />

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/bundle"}
                  component={ManageBundle}
                />
                
                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/profile/product/update"}
                  component={AddProduct}
                />

                <PrivateRoute
                  path={
                    process.env.PUBLIC_URL + "/my-account/payment/dashboard"
                  }
                  component={Dashboard}
                />
                <PrivateRoute
                  path={
                    process.env.PUBLIC_URL + "/my-account/payment/transaction"
                  }
                  component={Transaction}
                />

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/payment/card"}
                  component={Card}
                />

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/payment/wallet"}
                  component={Wallet}
                />

                <PrivateRoute
                  path={process.env.PUBLIC_URL + "/my-account/notification"}
                  component={Notification}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />
                <Route path={"/blogs/:id"} component={BlogDetail} />
                {/* faq */}
                <Route path={process.env.PUBLIC_URL + "/faq"} component={Faq} />

                <Route
                  path={process.env.PUBLIC_URL + "/privacy-policy"}
                  component={PrivacyPolicy}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/terms-and-conditions"}
                  component={TermsAndCondition}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/contact-us"}
                  component={ContactUs}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/blog"}
                  component={Blog}
                />
                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
