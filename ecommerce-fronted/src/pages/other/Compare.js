import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { deleteFromCompare } from "../../redux/actions/compareActions";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Rating from "../../components/product/sub-components/ProductRating";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { compareProductData } from "../../slices/compare";
import { IMG_URL } from "../../lib/constant";
import { tryParseJSONObject } from "../../helpers/helpers";
import { getProductList } from "../../services/product.service";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  clearCompare,
  removeFromCompare,
} from "../../slices/compareproductcount";

const Compare = ({
  location,
  compareItems,
  addToCart,
  deleteFromCompare,
  currency,
}) => {
  const { pathname } = location;
  const dispatch = useDispatch();

  const { compareProduct } = useSelector((state) => state.compare);
  const { cartItems } = useSelector((state) => state.compareCount);
  const [token, setToken] = useState("");

  const handleRemoveFromCart = (compareItem) => {
    dispatch(removeFromCompare(compareItem));
  };

  useEffect(() => {
    const tokenInfo = localStorage.getItem("token");
    setToken(tokenInfo);
  }, []);

  const deleteFromCompareProduct = (compareItem) => {
    const remainingCompareProducts = compareProduct?.filter(
      (item) => item?._id !== compareItem?._id
    );
    const updatedCompareProductArr = [];
    const response = remainingCompareProducts?.map((product) => {
      updatedCompareProductArr.push(product?._id);
    });
    localStorage.setItem(
      "productCompareId",
      JSON.stringify(updatedCompareProductArr)
    );
    // toast.error("Removed Product From Compare.");
    const compareProductIds = {
      product_id: updatedCompareProductArr,
    };
    if (updatedCompareProductArr) {
      dispatch(compareProductData(compareProductIds))
        .then((response) => {
          // console.log("response", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const compareProductIds = {
      product_id: cartItems,
    };
    if (cartItems) {
      dispatch(compareProductData(compareProductIds))
        .then((response) => {
          // console.log("response", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cartItems, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCompare());
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | Compare</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Compare
      </BreadcrumbsItem>
      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />
        {token && cartItems  && cartItems?.length > 0 && (
          <div className="container">
            <div className="row d-flex justify-content-end mt-2">
              <div className="col-md-3">
                <button
                  className="btn btn-lg btn-block theme-btn"
                  onClick={() => handleClearCart()}
                >
                  Clear All Compare
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="compare-main-area pt-90 pb-100">
          <div className="container">
            {compareProduct !== undefined && compareProduct?.length > 0 ? (
              <div className="row">
                <div className="col-lg-12">
                  <div className="compare-page-content">
                    <div className="compare-table table-responsive">
                      <table className="table table-bordered mb-0">
                        <tbody>
                          <tr>
                            <th className="title-column">Product Info</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-image-title" key={key}>
                                  <div className="compare-remove">
                                    <button
                                      onClick={() => {
                                        handleRemoveFromCart(compareItem);
                                        // deleteFromCompareProduct(compareItem);
                                      }}
                                      className="compare-icon"
                                    >
                                      <i className="pe-7s-trash" />
                                    </button>
                                  </div>
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      compareItem?._id
                                    }
                                    className="image"
                                  >
                                    <img
                                      className="img-fluid"
                                      src={`${compareItem?.images[0]}`}
                                      alt="compareProductImg"
                                      style={{height:'250px'}}
                                    />
                                  </Link>
                                  <div className="product-title">
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        `/product/${compareItem?._id}` +
                                        compareItem?._id
                                      }
                                    >
                                      {compareItem?.name}
                                    </Link>
                                  </div>
                                  {/* <div className="compare-btn">
                                    {compareItem.affiliateLink ? (
                                      <a
                                        href={compareItem.affiliateLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                      >
                                        {" "}
                                        Buy now{" "}
                                      </a>
                                    ) : compareItem.variation &&
                                      compareItem.variation.length >= 1 ? (
                                      <Link
                                        to={`${process.env.PUBLIC_URL}/product/${compareItem.id}`}
                                      >
                                        Select Option
                                      </Link>
                                    ) : compareItem.stock &&
                                      compareItem.stock > 0 ? (
                                      <button
                                        onClick={() =>
                                          addToCart(compareItem, addToast)
                                        }
                                        className={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                            ? "active"
                                            : ""
                                        }
                                        disabled={
                                          cartItem !== undefined &&
                                          cartItem.quantity > 0
                                        }
                                        title={
                                          compareItem !== undefined
                                            ? "Added to cart"
                                            : "Add to cart"
                                        }
                                      >
                                        {cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "Added"
                                          : "Add to cart"}
                                      </button>
                                    ) : (
                                      <button disabled className="active">
                                        Out of Stock
                                      </button>
                                    )}
                                  </div> */}
                                </td>
                              );
                            })}
                          </tr>
                          <tr>
                            <th className="title-column">Price</th>
                            {compareProduct?.map((compareItem, key) => {
                              return (
                                <td className="product-price" key={key}>
                                  {compareItem?.discount_price !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {`$ ${compareItem?.final_price}`}
                                      </span>
                                      <span className="amount">
                                        {`$ ${compareItem?.discount_price}`}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {`$ ${compareItem?.discount_price}`}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Description</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>{compareItem?.description}</p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Weight</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>{compareItem?.weight || "-"}</p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Size</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>{compareItem?.size || "-"}</p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Condition</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>{compareItem?.condition}</p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Color</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-rating" key={key}>
                                  <p
                                  // style={{
                                  //   backgroundColor: compareItem?.color,
                                  //   borderRadius: "50px",
                                  //   border: compareItem?.color,
                                  //   width: "50px",
                                  // }}
                                  >
                                    {compareItem?.color || "-"}
                                  </p>
                                </td>
                              );
                            })}
                          </tr>

                          <tr>
                            <th className="title-column">Brand</th>
                            {compareProduct.map((compareItem, key) => {
                              return (
                                <td className="product-desc" key={key}>
                                  <p>{compareItem?.brand}</p>
                                </td>
                              );
                            })}
                          </tr>

                          {/* <tr>
                            <th className="title-column">Rating</th>
                            {compareItems.map((compareItem, key) => {
                              return (
                                <td className="product-rating" key={key}>
                                  <Rating ratingValue={compareItem.rating} />
                                </td>
                              );
                            })}
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-shuffle"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in compare <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/products"}>
                        Add Items
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Compare.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteFromCompare: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    compareItems: state.compareData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },

    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
