import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchProductCount } from "../../slices/product";
import toast from 'react-hot-toast'

const ShopSearch = ({ skip }) => {
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleSubmit = async (fields) => {
    try {
      const catName = fields?.name.toLowerCase();
      const response = category?.filter((item) => item?.name === catName);
      if (!response[0]?._id) {
        toast.success("Category not found.")
      }
      const paginationData = {
        pageLimit: 9,
        skip: skip,
        category_id: response[0]?._id,
        sub_cat_id: "",
      };
      await dispatch(fetchProduct(paginationData));
      const countValues = {
        category_id: response[0]?._id,
        sub_cat_id: "",
      };
      await dispatch(fetchProductCount(countValues));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            setSubmitting(false);
            resetForm({ values: "" });
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="pro-sidebar-search-form">
                <div className="form-group">
                  <Field
                    type="name"
                    name="name"
                    placeholder="Search Category..."
                    className={`form-control ${
                      touched.name && errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="invalid-feedback"
                  />
                </div>
                <button type="submit">
                <i className="pe-7s-search" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ShopSearch;
