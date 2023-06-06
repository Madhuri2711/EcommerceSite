import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveSort } from "../../helpers/product";
import { fetchProduct, fetchProductCount } from "../../slices/product";

const ShopTag = ({ tags, getSortParams, skip }) => {
  const dispatch = useDispatch();

  const tagCategories = async (id) => {
    const paginationData = {
      pageLimit: 9,
      skip: skip,
      category_id: id,
      sub_cat_id: "",
    };

    const countValues = {
      category_id: id,
      sub_cat_id: "",
    };

    await dispatch(fetchProduct(paginationData));

    await dispatch(fetchProductCount(countValues));
  };
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag </h4>
      <div className="sidebar-widget-tag mt-25">
        {tags ? (
          <ul>
            {tags.map((tag, key) => {
              return (
                <li key={key}>
                  <button
                    onClick={(e) => {
                      tagCategories(tag?._id);
                      setActiveSort(e);
                    }}
                  >
                    {tag?.name}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          "No tags found"
        )}
      </div>
    </div>
  );
};

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array,
};

export default ShopTag;
