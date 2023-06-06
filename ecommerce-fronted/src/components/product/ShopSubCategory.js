import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchProductCount } from "../../slices/product";
import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const ShopSubCategory = ({
  filteredSubCategory,
  setParentInfo,
  skip,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [subCategory, setSubCategory] = useState(0);
  const { products } = useSelector((state) => state.products);
  const productDetails = products.data?.data;

  const getSubCategoryValue = async (event, value) => {
    setSubCategory(event?.target?.value);
    if (event?.target?.value === subCategory) {
      setSubCategory(0);
      setValue("");
      setParentInfo("");
      const paginationData = {
        pageLimit: 9,
        skip: skip,
        category_id: categoryId,
        sub_cat_id: "",
      };
      await dispatch(fetchProduct(paginationData));
      const countValues = {
        category_id: categoryId,
        sub_cat_id: "",
      };
      await dispatch(fetchProductCount(countValues));
    } else {
      setParentInfo(value);
      setValue(event?.target?.value);
      const paginationData = {
        pageLimit: 9,
        skip: skip,
        category_id: "",
        sub_cat_id: event?.target?.value,
      };
      await dispatch(fetchProduct(paginationData));
      const countValues = {
        category_id: categoryId,
        sub_cat_id: event?.target?.value,
      };
      await dispatch(fetchProductCount(countValues));
    }
  };

  return (
    <>
      <div className="ml-3">
        {filteredSubCategory?.map((subcategory, index) => {
          return (
            <li key={subcategory?._id}>
              <div className="d-flex">
                <RadioGroup name="subcategory" value={value}>
                  <FormControlLabel
                    value={subcategory?._id}
                    control={
                      <Radio
                        onClick={(event) =>
                          getSubCategoryValue(event, subcategory)
                        }
                      />
                    }
                    label={subcategory?.name}
                  />
                </RadioGroup>
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default ShopSubCategory;
