import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useEffect } from "react";
import MetaTags from "react-meta-tags";
//import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
//import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import {  useParams } from "react-router-dom";
import { productDetails, removeproductDetail } from "../../slices/product";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

const Product = ({ location }) => {
  let { id } = useParams();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productDetails(id));
    return () => {
      dispatch(removeproductDetail());
    };
  }, [dispatch, id]);

  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | Product Page</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/products"}>Products</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Product Description 
      </BreadcrumbsItem>

      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem> */}

      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={productDetail}
          productId={id}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          product={productDetail?.data?.data}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};

// const mapStateToProps = (state, ownProps) => {
//   const itemId = ownProps.match.params.id;
//   return {
//     product: state.productData.products.filter(
//       (single) => single.id === itemId
//     )[0],
//   };
// };

export default Product;
