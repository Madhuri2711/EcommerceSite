import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
//import ShopColor from "../../components/product/ShopColor";
//import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
//import ShopSubCategory from "../../components/product/ShopSubCategory";

const ShopSidebar = ({
  products,
  getSortParams,
  sideSpaceClass,
  category,
  setParentInfo,
  skip,
  setParentCategoryInfo
}) => {
  const uniqueCategories = getIndividualCategories(products);
  //const uniqueColors = getIndividualColors(products);
  //const uniqueSizes = getProductsIndividualSizes(products);
  //xconst uniqueTags = getIndividualTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch skip={skip} />

      {/* filter by categories */}
      <ShopCategories
        setParentInfo={setParentInfo}
        setParentCategoryInfo={setParentCategoryInfo}
        categories={uniqueCategories}
        getSortParams={getSortParams}
        products={products}
        category={category}
        skip={skip}
      />

      {/* filter by Price */}

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

      {/* filter by tag */}
      <ShopTag tags={category} getSortParams={getSortParams} skip={skip} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
