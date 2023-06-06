import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { connect, useDispatch, useSelector } from 'react-redux'
//import { getDiscountPrice } from '../../helpers/product'
import {
  addToWishlist,
  deleteFromWishlist,
  deleteAllFromWishlist,
} from '../../redux/actions/wishlistActions'
import { addToCart } from '../../redux/actions/cartActions'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { getWishlist, removeToWishlist } from '../../slices/wishlist'
import { useEffect } from 'react'
import { IMG_URL } from '../../lib/constant'
import toast from 'react-hot-toast'

const Wishlist = ({
  location,
  cartItems,
  currency,
  addToCart,
  wishlistItems,
  // deleteFromWishlist,
  // deleteAllFromWishlist,
}) => {
  //const { addToast } = useToasts()
  const { pathname } = location
  const dispatch = useDispatch()
  const { allWishList } = useSelector((state) => state.wishlist)

  const deleteFromWishlist = async(id) => {
    const response = await dispatch(removeToWishlist(id))
    if(response?.payload?.data?.deletedCount > 0){
      toast.success("Product Removed From Wishlist.");
    }
    dispatch(getWishlist())
  }
  useEffect(() => {
    dispatch(getWishlist())
  }, [])

  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | Wishlist</title>
        <meta
          name="description"
          content="Wishlist page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Wishlist
      </BreadcrumbsItem>

      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {allWishList && allWishList.length >= 1? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allWishList.map((wishlist) => (
                            <tr>
                              <td className="product-thumbnail">
                                <Link
                                to={`/product/${wishlist?.product_id?._id}`}
                                >
                                  <img
                                    className="img-fluid"
                                    src={`${wishlist.product_id?.images[0]}`}
                                    alt=""
                                  />
                                </Link>
                              </td>

                              <td className="product-name text-center">
                                <Link
                                to={`/product/${wishlist?.product_id?._id}`}
                                >
                                  {wishlist?.product_id?.name}
                                </Link>
                              </td>

                              <td className="product-price-cart">{`$ ${wishlist?.product_id?.discount_price}`}</td>

                              {/* <td className="product-wishlist-cart">
                                  {wishlistItem.affiliateLink ? (
                                    <a
                                      href={wishlistItem.affiliateLink}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      {" "}
                                      Buy now{" "}
                                    </a>
                                  ) : wishlistItem.variation &&
                                    wishlistItem.variation.length >= 1 ? (
                                    <Link
                                      to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                    >
                                      Select option
                                    </Link>
                                  ) : wishlistItem.stock &&
                                    wishlistItem.stock > 0 ? (
                                    <button
                                      onClick={() =>
                                        addToCart(wishlistItem, addToast)
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
                                        wishlistItem !== undefined
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
                                      Out of stock
                                    </button>
                                  )}
                                </td> */}

                              <td className="product-remove">
                                <button
                                  onClick={() =>
                                    deleteFromWishlist(
                                      wishlist?.product_id?._id,
                                    )
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + '/shop-grid-standard'}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromWishlist(addToast)}>
                          Clear Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{' '}
                      <Link to={process.env.PUBLIC_URL + '/products'}>
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
  )
}

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  deleteAllFromWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount))
    },
    addToWishlist: (item, addToast, quantityCount) => {
      dispatch(addToWishlist(item, addToast, quantityCount))
    },
    deleteFromWishlist: (item, addToast, quantityCount) => {
      dispatch(deleteFromWishlist(item, addToast, quantityCount))
    },
    deleteAllFromWishlist: (addToast) => {
      dispatch(deleteAllFromWishlist(addToast))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
