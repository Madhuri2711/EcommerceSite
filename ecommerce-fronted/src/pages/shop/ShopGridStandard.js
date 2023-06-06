import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { useSelector } from "react-redux";
import {
  fetchProduct,
  fetchProductCount,
  fetchSearchProducts,
} from "../../slices/product";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../../slices/category";

import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import { getProductCount } from "../../services/product.service";

const ShopGridStandard = ({ location }) => {
  const [layout, setLayout] = useState("three-column");
  const { pathname } = location;
  const dispatch = useDispatch();
  const { products, status, productCount } = useSelector(
    (state) => state.products
  );
  const { category } = useSelector((state) => state.category);
  const productDetails = products.data?.data;
  const [parentInfo, setParentInfo] = useState([]);
  const [parentCategoryInfo, setParentCategoryInfo] = useState("");
  const [FilteredSubCategory, setFilteredSubCategory] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const term = queryParams.get("search");
  const path = pathname.split("/");
  const categoryId = path[2];
  const [activeProductCount, setAllActiveProductCount] = useState(0);

  const { searchproductsData } = useSelector((state) => state.products);
  const searchProductData = searchproductsData?.data?.data;
  // console.log("search Count", searchProductData?.length);

  /* Get Product Count Start */

  useEffect(() => {
    loadProductCount();
  }, [parentCategoryInfo, parentInfo]);

  const loadProductCount = async () => {
    const countValues = {
      category_id: categoryId ? categoryId : parentCategoryInfo,
      sub_cat_id: parentInfo?._id,
    };
    /*const response = await getProductCount(countValues);
    if (response?.isSuccess) {
      setAllActiveProductCount(response?.data);
    }*/
    await dispatch(fetchProductCount(countValues));
  };

  /* Get Product Count End */

  /* Pagination Start */

  const [pageNumber, setPageNumber] = useState(1);
  const [skip, setSkip] = useState(0);
  const limit = 9;
  const PageCount = Math.ceil(productCount / 9);
  useEffect(() => {
    loadProducts();
  }, [pageNumber]);

  const loadProducts = async () => {
    const offset = limit * pageNumber - limit;
    setSkip(offset);
    const paginationData = {
      pageLimit: limit,
      skip: offset,
      category_id: categoryId
        ? categoryId
        : parentCategoryInfo
        ? parentCategoryInfo
        : "",
      sub_cat_id: parentInfo?._id ? parentInfo?._id : "",
    };
    const response = await dispatch(fetchProduct(paginationData));
  };

  /* Pagination End */

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    getSelectedSubCategoryProduct();
  }, [parentInfo]);

  const getSelectedSubCategoryProduct = () => {
    if (parentInfo && parentInfo?._id) {
      const filteredProduct = productDetails?.filter(
        (item) => item?.sub_cat_id?._id === parentInfo?._id
      );
      setFilteredSubCategory(filteredProduct);
    }
  };

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getFilterSortParams = async (sortType, sortValue) => {
    const offset = limit * pageNumber - limit;
    const searchValue = {
      search: "",
      sortBy: sortValue,
      price: {
        min: "",
        max: "",
      },
      condition: [],
      brand: [],
      size: [],
      pageLimit: limit,
      skip: 9,
    };
    try {
      const response = await dispatch(fetchSearchProducts(searchValue));
    } catch (error) {
      return error;
    }
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | Shop Page</title>
        <meta name="description" content="Shop page of Inanihub" />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3  order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  setParentInfo={setParentInfo}
                  setParentCategoryInfo={setParentCategoryInfo}
                  products={products?.data?.data}
                  sideSpaceClass="mr-30"
                  category={category}
                  skip={skip}
                />
              </div>
              <div className="col-lg-9 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products?.data?.data?.length}
                  sortedProductCount={products?.data?.data?.length}
                />

                {/* shop page content default */}
                <ShopProducts
                  layout={layout}
                  products={
                    searchProductData?.length > 0
                      ? searchProductData
                      : productDetails
                  }
                  status={status}
                  FilteredSubCategory={FilteredSubCategory}
                  pathname={pathname}
                />

                {/* shop product pagination */}
                {
                  PageCount > 1 && <div className="pro-pagination-style text-center mt-30 d-flex justify-content-center">
                  <Pagination
                    count={PageCount}
                    // color="secondary"
                    variant="outlined"
                    onChange={(e, value) => setPageNumber(value)}
                  />
                </div> 
                }
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

export default ShopGridStandard;
