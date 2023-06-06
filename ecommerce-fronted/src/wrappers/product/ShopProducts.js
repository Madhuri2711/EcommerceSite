import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({
  products,
  layout,
  status,
  FilteredSubCategory,
  pathname,
}) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList
          products={products}
          status={status}
          FilteredSubCategory={FilteredSubCategory}
          pathname={pathname}
          spaceBottomClass="mb-25"
        />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
