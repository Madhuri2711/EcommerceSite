import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { IMG_URL } from "../../lib/constant";
import toast from "react-hot-toast";
import { getProductList } from "../../services/product.service";
import { addProductIdForCompare } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../slices/product";
import { addToCompare } from "../../slices/compareproductcount";

const ProductGridSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  // addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  pathname,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const location = useLocation();
  const currentPath = location.pathname;
  const path = currentPath.split("/");
  const id = path[2];
  const dispatch = useDispatch();
  const history = useHistory();
  const [quantityCount, setQuantityCount] = useState(1);
  const addCart = (product_id, qty) => {
    // const value = {
    //   product_id,
    //   qty,
    // }
    // if (!token) {
    //   history.push('/sign-in')
    // } else {
    //   // dispatch(addToCart(value))
    //   // dispatch(getAllCart())
    //   history.push(`/cart/${product_id}`)
    // }
    dispatch(productDetails(product_id));
    history.push({
      pathname: `/cart/${product_id}`,
      state: { quantityCount: quantityCount },
    });
  };

  const handleAddToCompare = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
    dispatch(addToCompare(id));
    }else{
      history.push("/sign-in");
    }
  };

  return (
    <>
      <div
        className={`${
          currentPath === `/shop-grid-standard/${id}` ||
          pathname === "/products"
            ? "col-md-4"
            : "col-xl-3 col-md-6 col-lg-4 col-sm-6"
        } ${sliderClassName ? sliderClassName : ""}`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
          <div className="product-img">
            <Link to={`/product/${product?._id}`}>
              <img
                className="default-img"
                src={`${product?.images[0]}`}
                alt=""
                height={350}
              />
              {/* <div
                // className="default-img"
                // src={`${IMG_URL}${product?.images[0]}`}
                // alt=""
                height={400}
              >
                <div className="row">
                  <div className="col-12">
                    <img
                      className="default-img"
                      src={`${IMG_URL}${product?.images[0]}`}
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <img
                      className="default-img"
                      src={`${IMG_URL}${product?.images[0]}`}
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <img
                      className="default-img"
                      src={`${IMG_URL}${product?.images[0]}`}
                      alt=""
                    />
                  </div>
                </div>
              </div> */}
            </Link>
            <div className="product-img-badges">
              {product?.condition === "NEW" ? (
                <span className="purple">New</span>
              ) : (
                ""
              )}
            </div>

            <div className="product-action">
              {/* <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? "active" : ""}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined
                      ? "Added to wishlist"
                      : "Add to wishlist"
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div> */}
              <div className="d-flex">
                <div className="pro-same-action pro-cart out-of-stock">
                  {product?.qty && product?.qty > 0 ? (
                    <button
                      className="active"
                      onClick={() => addCart(product?._id, product?.qty)}
                    >
                      BUY NOW
                    </button>
                  ) : (
                    <button disabled className="active">
                      Out of Stock
                    </button>
                  )}
                </div>
                <div className="pro-same-action pro-quickview">
                  <button
                    title="Compare Product"
                    onClick={() => {
                      handleAddToCompare(product?._id);
                    }}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                {product?.name}
              </Link>
            </h3>
            <div className="product-price">{`$${product?.discount_price}`}</div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </>
  );
};

ProductGridSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingle;
