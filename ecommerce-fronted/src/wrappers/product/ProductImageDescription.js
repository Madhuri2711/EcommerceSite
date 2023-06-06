import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
//import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
//import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
//import ProductImageFixed from "../../components/product/ProductImageFixed";
//import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
//import { useDispatch, useSelector } from "react-redux";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  product,
  // currency,
  // cartItems,
  // wishlistItems,
  // compareItems,
  productId,
}) => {
  const { addToast } = useToasts();

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <ProductImageGallery product={product?.data?.data} />
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
          <ProductDescriptionInfo
              product={product?.data?.data}
              productId={productId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
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

export default connect(mapStateToProps)(ProductImageDescription);
