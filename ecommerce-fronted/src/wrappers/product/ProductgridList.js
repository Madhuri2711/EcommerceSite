import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import SkeletonProduct from "../../components/skeleton/SkeletonProduct";
// import EmptyDataImg from "../../assets/img/Empty-pana.png";

const ProductGrid = ({
  products,
  status,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItems,
  wishlistItems,
  compareItems,
  sliderClassName,
  spaceBottomClass,
  FilteredSubCategory,
  pathname,
}) => {
  return (
    <Fragment>
      {status === "loading" ? (
        <>
          <div className="container">
            <div className="row">
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
              <SkeletonProduct count={4} />
            </div>
          </div>
        </>
      ) : products?.length > 0 ? (
        products?.map((product) => {
          return (
            <ProductGridSingle
              pathname={pathname}
              sliderClassName={sliderClassName}
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              addToCompare={addToCompare}
              // cartItem={
              //   cartItems.filter(cartItem => cartItem.id === product.id)[0]
              // }
              // wishlistItem={
              //   wishlistItems.filter(
              //     wishlistItem => wishlistItem.id === product.id
              //   )[0]
              // }
              // compareItem={
              //   compareItems.filter(
              //     compareItem => compareItem.id === product.id
              //   )[0]
              // }
              key={product?._id}
            />
          );
        })
      ) : (
        <img
          className="emptydataImg"
          src={require("../../assets/img/emptydata/EmptyData.png")}
          alt="emptyDataImg"
        />
      )}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
