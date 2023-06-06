//import PropTypes, { element } from "prop-types";
import React, { Fragment, useState, useEffect, useRef } from "react";
import {  useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { getProductCartQuantity } from "../../helpers/product";
//import Alert from "react-bootstrap/Alert";
import SkeletonLoader from "../SkeletonLoader";
//import { token } from "../../lib/constant";
import {  getAllCart } from "../../slices/cart";
import { productDetails } from "../../slices/product";
import {
  addToWishList,
  getWishlist,
  removeToWishlist,
} from "../../slices/wishlist";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
//import * as Yup from "yup";
import { addMakeOffer } from "../../services/make-offer";
//import { compareProduct } from "../../services/compare-product.service";
//import { addProductIdForCompare } from "../../helpers/helpers";
import { addToCompare, getTotals } from "../../slices/compareproductcount";

const ProductDescriptionInfo = ({ product, productId }) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const [message, setMessage] = useState(false);
  //const products = useSelector((state) => state.products);
  const { allWishList } = useSelector((state) => state.wishlist);
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const [submittingBtnProcess, setSubmittingBtnProcess] = useState(false);
 // const priceRef = useRef();
  const [userSelectedPrice, setUserSelectedPrice] = useState(0);
  //const [makeOfferPrice, setMakeOfferPrice] = useState(0);
  const [price, setPrice] = useState(0);

  const { compareProductTotalCount } = useSelector(
    (state) => state.compareCount
  );

  const compareItems = localStorage.getItem("compareItems");

  useEffect(() => {
    dispatch(getTotals());
  }, [compareProductTotalCount, dispatch]);

  const handleAddToCompare = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(addToCompare(id));
    } else {
      history.push("/sign-in");
    }
  };

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const quantityAdd = () => {
    if (quantityCount < product?.qty) {
      setQuantityCount(quantityCount + 1);
    } else {
      setMessage(true);
      toast.success(`Only ${product?.qty} quantity is available`);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    }
  };
  useEffect(() => {
    discountedPrice();
  }, []);

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

  const addToWishlist = async (product_id) => {
    if (localStorage.getItem("token")) {
      await dispatch(addToWishList(product_id));
      dispatch(getWishlist());
      toast.success("Added To Wishlist");
    } else {
      history.push("/sign-in");
    }
  };

  const deleteFromWishlist = async (id) => {
    await dispatch(removeToWishlist(id));
    dispatch(getWishlist());
    toast.error("Remove From Wishlist");
  };
  // const isWishListAvailable = (id) => {
  //  return allWishList.some((element)=> element.product_id._id === id)
  // }

  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getWishlist());
  }, []);

  const makeOffer = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/sign-in");
    }
    setModalShow(true);
  };

  const handleSubmit = async (values) => {
    setSubmittingBtnProcess(true);
    const makeOfferObj = {
      price: userSelectedPrice > 0 ? userSelectedPrice : values?.price,
      product_id: productId,
    };
    try {
      const response = await addMakeOffer(makeOfferObj);
      if (response.isSuccess) {
        toast.success(response?.message);
        setSubmittingBtnProcess(false);
        handleClose();
      } else {
        toast.error(response?.message);
        setSubmittingBtnProcess(false);
        handleClose();
      }
    } catch (error) {
      setSubmittingBtnProcess(false);
      return error;
    }
  };

  const discountedPrice = (price) => {
    const option = [];
    if (price >= 10) {
      for (let i = 0; i <= 4; i++) {
        if (price > 5) {
          option.push((price = price - 5));
        }
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        if (price > 1) {
          option.push((price = price - 1));
        }
      }
      console.log("else");
    }
    return option;
  };

  const getSelectedPrice = (item) => {
    setUserSelectedPrice(item);
  };

  const validatePrice = (value) => {
    let error;
    if (value > price) {
      error = "Make Offer Price not greater then Product Price.";
    }
    return error;
  };

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Make Offer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ price: "" }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="container">
                  <div className="row">
                    <div className="form-group">
                      <Field
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        validate={validatePrice}
                        className={`form-control ${touched.price && errors.price ? "is-invalid" : ""
                          }`}
                      />
                      {errors.price && touched.price && (
                        <div className="pricelbel">{errors.price}</div>
                      )}
                    </div>
                    {/* <div className="row"> */}
                    <div className="d-flex justify-content-between align-items-center">
                      {discountedPrice(product?.discount_price).map(
                        (item, index) => (
                          <div
                            className="make-offer-price"
                            onClick={() => getSelectedPrice(item)}
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                    {/* </div> */}
                    <div className="d-flex justify-content-end">
                      <h4 className="mt-2 orffertitle">OFFER</h4>
                      <div className="mt-2 ml-3 offer-price">{`$${userSelectedPrice > 0
                        ? userSelectedPrice
                        : product?.discount_price
                        }`}</div>
                      <div
                        className="old mt-2 ml-1"
                        style={{ color: "red", textDecoration: "line-through" }}
                      >{`$${product?.price}`}</div>

                      <button
                        type="submit"
                        className="btn theme-btn ml-3"
                        disabled={submittingBtnProcess}
                        style={{
                          fontSize: "15px",
                          backgroundColor: "#F28B27",
                        }}
                      >
                        {submittingBtnProcess && (
                          <span className="spinner-border spinner-border-sm mb-1"></span>
                        )}
                        {submittingBtnProcess ? "" : "Send Offer"}
                      </button>

                      <button
                        type="submit"
                        className="btn btn-dark ml-3"
                        onClick={handleClose}
                        style={{ fontSize: "15px" }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      {product ? (
        <div className="product-details-content ml-70 mt-15">
          <h2>{product?.name}</h2>
          <div className="product-details-price">
            <Fragment>
              <span>{`$${product?.discount_price}`}</span>
              <span className="old">{`$${product?.price}`}</span>
            </Fragment>
          </div>
          <div className="pro-details-list">
            <p>{product?.description}</p>
          </div>

          <div className="pro-details-size-color">
            <div className="pro-brand">
              {product?.brand ? (
                <div className="pro-details-meta">
                  <span>Brand :</span>
                  {product?.brand}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="cat-and-subcat">
              {product?.category_id ? (
                <div className="pro-details-meta">
                  <span>Categories :</span>
                  {product?.category_id.name}
                </div>
              ) : (
                ""
              )}

              {product?.sub_cat_id ? (
                <div className="pro-details-meta">
                  <span>Sub Category :</span>
                  {product?.sub_cat_id.name}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* <div className="pro-details-color-wrap">
          <span>Color</span>
          <div className="pro-details-color-content">
            {product.variation.map((single, key) => {
              return (
                <label
                  className={`pro-details-color-content--single ${single.color}`}
                  key={key}
                >
                  <input
                    type="radio"
                    value={single.color}
                    name="product-color"
                    checked={
                      single.color === selectedProductColor ? "checked" : ""
                    }
                    onChange={() => {
                      setSelectedProductColor(single.color);
                      setSelectedProductSize(single.size[0].name);
                      setProductStock(single.size[0].stock);
                      setQuantityCount(1);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              );
            })}
          </div>
        </div> */}
            <div className="pro-details-size d-flex justify-content-between">
              <div>Size : {product?.size}</div>
              {product?.color !== "undefined" && product?.color ? (
                <div className="d-flex">
                  Color :
                  <div style={{}} className='pro-color'>
                    <p
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: product?.color,
                      }}
                    ></p>
                  </div>
                </div>
              ) : (
                " "
              )}
            </div>
          </div>

          {/* {message && (
            <Alert variant="danger">{`Only ${product?.qty} is available`}</Alert>
          )} */}
          <div className="pro-details-quality">
            <div className="cart-plus-minus">
              <button
                onClick={() =>
                  setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                }
                className="dec qtybutton"
              >
                -
              </button>
              <input
                className="cart-plus-minus-box"
                type="text"
                value={quantityCount}
                readOnly
              />
              <button
                onClick={() => quantityAdd()}
                className="inc qtybutton"
                disabled={message ? true : false}
              >
                +
              </button>
            </div>
            <div className="pro-details-cart btn-hover">
              {product?.qty && product?.qty > 0 ? (
                <button
                  onClick={() => addCart(product?._id, product?.qty)}
                // disabled={true}
                >
                  {" "}
                  Buy Now{" "}
                </button>
              ) : (
                <button disabled>Out of Stock</button>
              )}
            </div>
            <div className="pro-details-cart btn-hover">
              <button
                onClick={() => {
                  makeOffer();
                  setPrice(product?.discount_price);
                }}
              >
                Make Offer
              </button>
            </div>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <div className="pro-details-wishlist">
              {allWishList?.filter(
                (element) => element?.product_id?._id === product?._id
              ).length > 0 ? (
                <button onClick={() => deleteFromWishlist(product?._id)}>
                  <FavoriteIcon style={{ color: "red" }} />
                </button>
              ) : (
                <button onClick={() => addToWishlist(product?._id)}>
                  <FavoriteBorderIcon />
                </button>
              )}
            </div>
            <div className="pro-details-compare">
              {
                JSON.parse(compareItems)?.filter(
                  (element) => element === product?._id

                ).length > 0 ? (
                  <button
                    // title={
                    //   compareProductTotalCount !== undefined
                    //     ? "Added to compare"
                    //     : "Add to compare"
                    // }
                    style={{ color: 'red' }}
                    title={"Add to compare"}
                    onClick={() => {
                      handleAddToCompare(product?._id);
                    }}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                ) :
                  (
                    <button
                      style={{ color: '#000' }}
                      // title={
                      //   compareProductTotalCount !== undefined
                      //     ? "Added to compare"
                      //     : "Add to compare"
                      // }
                      title={"Add to compare"}
                      onClick={() => {
                        handleAddToCompare(product?._id);
                      }}
                    >
                      <i className="pe-7s-shuffle" />
                    </button>
                  )
              }

            </div>
          </div>

          {/* <div className="pro-details-social">
            <ul>
              <li>
                <a href="//facebook.com" target='_blank'>
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="//dribbble.com" target='_blank'>
                  <i className="fa fa-dribbble" />
                </a>
              </li>
              <li>
                <a href="//pinterest.com" target='_blank'>
                  <i className="fa fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="//twitter.com" target='_blank'>
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="//linkedin.com" target='_blank'>
                  <i className="fa fa-linkedin" />
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      ) : (
        <SkeletonLoader count={10} />
      )}
    </>
  );
};

export default ProductDescriptionInfo;
