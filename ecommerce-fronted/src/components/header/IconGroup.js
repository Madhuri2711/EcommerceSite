import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
//import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import { logout } from "../../slices/auth";
// import { getNotificationCount } from "../../services/notification.service";
import { tryParseJSONObject } from "../../helpers/helpers";
import { getTotals } from "../../slices/compareproductcount";
import { getNotificationCounts } from "../../slices/notification";

const IconGroup = ({
  currency,
  cartData,
  wishlistData,
  deleteFromCart,
  iconWhiteClass,
  props,
}) => {
  const { allWishList } = useSelector((state) => state.wishlist);
  
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
//  const [notificationCount, setNotificationCount] = useState(0);
  const [productCount, setProductCount] = useState({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [open, setOpen] = useState(false);
  const { cartItems, compareProductTotalCount } = useSelector(
    (state) => state.compareCount
  );

  const { notification } = useSelector((state) => state.notification);
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, compareProductTotalCount, dispatch]);

  useEffect(() => {
    const compareProductLength = tryParseJSONObject(
      localStorage.getItem("productCompareId")
    );
    if (isInitialRender) {
      setIsInitialRender(false);
      setProductCount(compareProductLength);
    }
  }, [isInitialRender, productCount]);

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  const logOut = useCallback(() => {
    window.location.reload(false);
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    const tokenInfo = localStorage.getItem("token");
    setToken(tokenInfo);
    getCount();
  }, []);

  const getCount = () => {
    dispatch(getNotificationCounts());
  };

  const handleClick = (e) => {
    setOpen(!open)
  };
  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      {/* <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div> */}
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
          onBlur={()=> setOpen(!open)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className={open ? "account-dropdown active" : "account-dropdown"}>
          <ul>
            <li>
              {token ? (
                " "
              ) : (
                <Link to={process.env.PUBLIC_URL + "/sign-in"}>Login</Link>
              )}
            </li>
            <li>
              {token ? (
                ""
              ) : (
                <Link to={process.env.PUBLIC_URL + "/register"}>register</Link>
              )}
            </li>
            <li>
              {token ? (
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {" "}
                  my profile
                </Link>
              ) : (
                ""
              )}
            </li>
            <li>
              {token ? (
                <Link to={process.env.PUBLIC_URL + "/"} onClick={logOut}>
                  Sign Out
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {/* {cartItems && cartItems?.length ? cartItems?.length : 0} */}
            {compareProductTotalCount}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {allWishList ? allWishList?.length : 0}
          </span>
        </Link>
      </div>
      {token ? (
        <div className="same-style header-compare">
          <Link to={process.env.PUBLIC_URL + "/my-account/notification"}>
            <i className="pe-7s-bell" />
            <span className="count-style">{notification?.data?.count}</span>
          </Link>
        </div>
      ) : (
        ""
      )}
      {/* <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {allCart?.data && allCart?.data?.length ? allCart?.data?.length : 0}
          </span>
        </button>
        <MenuCart
          cartData={allCart?.data}
          // currency={currency}
          // deleteFromCart={deleteFromCart}
        />
      </div> */}
      {/* <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div> */}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);
