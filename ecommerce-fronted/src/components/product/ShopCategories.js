import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
//import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { setActiveSort } from "../../helpers/product";
import { fetchCategory } from "../../slices/category";
import { fetchSubCategory } from "../../slices/sub.category";
import ShopSubCategory from "./ShopSubCategory";
//import { Formik, Field } from "formik";
import { fetchProduct, fetchProductCount } from "../../slices/product";

const ShopCategories = ({
  categories,
  getSortParams,
  setParentInfo,
  skip,
  setParentCategoryInfo,
}) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { subcategory } = useSelector((state) => state.subcategory);
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
  }, []);

  const getCategoryValue = async (event, id) => {
    setParentCategoryInfo(id);
    setCategoryId(id);
    if (event.target.value === categoryId) {
      setSelectedCatId(0);
      setCategoryId(0);
      setValue("");
      const paginationData = {
        pageLimit: 9,
        skip: 0,
        category_id: "",
        sub_cat_id: "",
      };
      await dispatch(fetchProduct(paginationData));
      const countValues = {
        category_id: "",
        sub_cat_id: "",
      };
      await dispatch(fetchProductCount(countValues));
    } else {
      setSelectedCatId(id);
      setValue(event.target.value);
      const paginationData = {
        pageLimit: 9,
        skip: skip,
        category_id: event.target.value,
        sub_cat_id: "",
      };
      await dispatch(fetchProduct(paginationData));
      const countValues = {
        category_id: event.target.value,
        sub_cat_id: "",
      };
      await dispatch(fetchProductCount(countValues));
    }
    const filteredSubCategory = subcategory?.filter(
      (item) => item?.cat_id === id
    );
    setFilteredSubCategory(filteredSubCategory);
  };

  const clearAll = async () => {
    setSelectedCatId(0);
    const paginationData = {
      pageLimit: 9,
      skip: 0,
      category_id: "",
      sub_cat_id: "",
    };
    await dispatch(fetchProduct(paginationData));
    const countValues = {
      category_id: "",
      sub_cat_id: "",
    };
    await dispatch(fetchProductCount(countValues));
  };

  return (
    <div className="sidebar-widget">
      <div className="d-flex justify-content-between">
        <h4 className="pro-sidebar-title">Categories </h4>
        {/* <button className="clearall-btn" onClick={() => clearAll()}>
          Clear All
        </button> */}
      </div>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            {/* <li>
              <div className="d-flex">
                <input type="checkbox" className="category-checkbox" />
                <div className="sidebar-widget-list-left">
                  <button
                    style={{ bottom: "5px" }}
                    onClick={(e) => {
                      getSortParams("category", "");
                      setActiveSort(e);
                    }}
                  >
                    All Categories
                  </button>
                </div>
              </div>
            </li> */}
            {category?.map((category, index) => {
              return (
                <>
                  <li key={category?._id}>
                    <div className="d-flex">
                      <RadioGroup name="category" value={value}>
                        <FormControlLabel
                          value={category?._id}
                          control={
                            <Radio
                              onClick={(event) =>
                                getCategoryValue(event, category?._id)
                              }
                            />
                          }
                          label={category?.name}
                        />
                      </RadioGroup>
                    </div>
                  </li>
                  {selectedCatId === category?._id && (
                    <>
                      <div className="mt-1 mb-1">
                        <ShopSubCategory
                          filteredSubCategory={filteredSubCategory}
                          setParentInfo={setParentInfo}
                          skip={skip}
                          categoryId={categoryId}
                        />
                      </div> 
                    </>
                  )}
                </>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

export default ShopCategories;
