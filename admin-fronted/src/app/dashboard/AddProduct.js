import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import Controls from "./listbasic-ui/Controls";
import { useHistory } from "react-router-dom";
import { ChromePicker } from "react-color";

const AddProduct = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [fileData, setfileData] = useState([]);
  const history = useHistory();
  const FETCH_ALL_CATEGORY = `${BASE_URL}category/`;
  const FETCH_ALL_SUB_CATEGORY = `${BASE_URL}sub-category/`;
  const ADD_PRODUCT = `${BASE_URL}product/add`;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [colors, setColors] = useState(null);
  const [colorstring,setColorString] = useState(null);
  const colorPicker = (e) => {
    const newColor = {
      hex: e.hex,
      rgb: "(" + e.rgb.r + "," + e.rgb.g + "," + e.rgb.b + "," + e.rgb.a + ")",
    };
    let colortext = newColor.hex?.toString() || '';
    console.log(colortext);
    setColorString(colortext);
    setColors(newColor);
  };

  console.log(colors);

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_CATEGORY, {
        headers: { Authorization: `${TOKEN}` },
      });
      setCategory(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_SUB_CATEGORY, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data.data);
      setSubCategory(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleMultiImageUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }

    let tempArr = [];
    [...e.target.files].forEach((file) => {
      console.log("file >>> ", file);
      tempArr.push(file.name);
      console.log("pictures ", tempArr);
    });
    setfileData(tempArr);
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          style={{
            width: "100px",
            height: "55px",
            objectFit: "cover",
            padding: "0.75rem",
            float:'left',
            display: "flex",
            flexDirection: "row",
          }}
          src={photo}
          alt="productImage"
          key={photo}
        />
      );
    });
  };

  const submitData = async (fields) => {
    console.log(fields);
    setLoading(true);
    try {
      const values = {
        ...fields,
        color: colorstring,
        images: fileData,
      };
      const requestThree = await axios.post(ADD_PRODUCT, values, {
        headers: { Authorization: `${TOKEN}` },
      });
      history.push("/products");
    } catch (e) {
      console.log(e);
    }
  };

  const backbtn = () => {
    history.push("/products");
  };

  const styles = {
    headersetting: {
      alignItems: "center",
      paddingTop: 20,
      marginTop: "15px",
      marginBottom: 0,
      padding: "0em",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: "flex",
      flexDirection: "row",
    },
    bannerImage: {
      maxWidth: "30%",
      maxHeight: '60px !important',
      borderRadius: "10px",
    },
    //otherImage: { maxWidth: "30%", maxHeight: 135, borderRadius: '10px 50px 10px' },
    delete: {
      cursor: "pointer",
      padding: 2,
      maxWidth: "35%",
      background: "red",
      color: "white",
      border: "none",
    },
  };

  return (
    <div className="container-xxl">
      <div className="card mt-4">
        <div className="card-header">
          <div>
            <h3 style={styles.headersetting}>Product Details</h3>
            <div className="backbutton">
              <Button variant="primary" onClick={backbtn}>
                Back
              </Button>
            </div>
          </div>
        </div>
        <Formik
          initialValues={{
            category_id: "",
            sub_cat_id: "",
            brand: "",
            size: "",
            description: "",
            price: "",
            discount_price: "",
            final_price: "",
            your_earning: "",
            condition: "",
            images: [],
            is_bundled_product: true,
            name: "",
            color: "",
            is_active: true,
            product_code: "",
            year: "",
            weight: "",
            qty: "",
          }}
          validationSchema={Yup.object().shape({
            category_id: Yup.string().required("Please select category"),
            sub_cat_id: Yup.string().required("Please select sub category"),
            brand: Yup.string().required("Brand name is required"),
            size: Yup.string().required("Size is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number().required("Price is required"),
            discount_price: Yup.number().required("Discount price is required"),
            final_price: Yup.number().required("Final price is required"),
            your_earning: Yup.number().required("Earning is required"),
            condition: Yup.string().required("Condition is required"),
            name: Yup.string().required("Product name is required"),
            product_code: Yup.string().required("Product Code is required"),
            year: Yup.string().required("Year is required"),
            weight: Yup.string().required("weight is required"),
            qty: Yup.string().required("Quantity is required"),
            images: Yup.mixed().required("File is required"),
            is_bundled_product: Yup.bool(),
            is_active: Yup.bool(),
          })}
          onSubmit={(fields) => {
            console.log(fields);
            submitData(fields);
          }}
          render={({
            errors,
            status,
            touched,
            handleChange,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <Container className="i-am-centered">
              <div className="container m-2">
                <div className="row justify-content-md-center">
                  <div className="col">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <br />
                          <div className="form-group">
                            <label htmlFor="category_id">
                              Select Category *
                            </label>
                            <Field
                              as="select"
                              name="category_id"
                              className={
                                "form-control" +
                                (errors.category_id && touched.category_id
                                  ? " is-invalid"
                                  : "")
                              }
                              style={{
                                height: "55px",
                                border: "1px solid #999C9F",
                                outline: "none",
                                color: "#545353",
                              }}
                            >
                              <option value="" style={{ fontSize: "20px" }}>
                                Select Category
                              </option>
                              {category?.map((val) => (
                                <option
                                  value={val?._id}
                                  style={{ fontSize: "20px" }}
                                >
                                  {val?.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="category_id"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name"> Product Name *</label>
                            <Field
                              name="name"
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              placeholder="Enter Product Name"
                              className={
                                "form-control" +
                                (errors.name && touched.name
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          {/* <label htmlFor="category_id"> Select Category*</label>
                                                    <Controls.SelectInputField
                                                        label="Category"
                                                        value={values.category_id ? values.category_id : ''}
                                                        name="category_id"
                                                        id="category_id"
                                                        onChange={(e) => {
                                                            // fetchSubCategory(e.target.value);
                                                            handleChange(e);
                                                        }}
                                                        error={errors.category_id && touched.category_id && errors.category_id}
                                                        options={category}
                                                    /> */}
                          <div className="form-group">
                            <label htmlFor="brand"> Brand Name *</label>
                            <Field
                              name="brand"
                              type="text"
                              value={values.brand}
                              onChange={handleChange}
                              placeholder="Enter Brand Name"
                              className={
                                "form-control" +
                                (errors.brand && touched.brand
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="brand"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="size"> Size *</label>
                            <Field
                              name="size"
                              type="text"
                              value={values.size}
                              onChange={handleChange}
                              placeholder="Enter Size"
                              className={
                                "form-control" +
                                (errors.size && touched.size
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="size"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="description"> Description *</label>
                            <Field
                              name="description"
                              type="text"
                              value={values.description}
                              onChange={handleChange}
                              placeholder="Enter Description"
                              className={
                                "form-control" +
                                (errors.description && touched.description
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="condition">
                              Select Condition *
                            </label>
                            <Field
                              as="select"
                              name="condition"
                              className={
                                "form-control" +
                                (errors.condition && touched.condition
                                  ? " is-invalid"
                                  : "")
                              }
                              style={{
                                height: "55px",
                                border: "1px solid #999C9F",
                                outline: "none",
                                color: "#545353",
                              }}
                            >
                              <option style={{ fontSize: "20px" }}>
                                Select Category
                              </option>
                              <option style={{ fontSize: "20px" }} value="NEW">
                                NEW
                              </option>
                              <option style={{ fontSize: "20px" }} value="USED">
                                USED
                              </option>
                              <option
                                style={{ fontSize: "20px" }}
                                value="NOT_SPECIFIED"
                              >
                                NOT_SPECIFIED
                              </option>
                            </Field>
                            <ErrorMessage
                              name="condition"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          {/* <div className="form-group">
                                                        <label htmlFor="condition"> Condition *</label>
                                                        <Field
                                                            name="condition"
                                                            type="text"
                                                            value={values.condition}
                                                            onChange={handleChange}
                                                            placeholder="Enter condition"
                                                            className={'form-control' + (errors.condition && touched.condition ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="condition" component="div" className="invalid-feedback" />
                                                    </div> */}
                          <div className="form-group">
                            <label htmlFor="color"> Color *</label>
                            <ChromePicker
                              value={values.color}
                              color={colors !== null && colors.hex}
                              onChange={(e) => colorPicker(e)}
                              disableAlpha
                              renderers={false}
                            />
                            {/* <Field
                              name="color"
                              type="text"
                              value={values.color}
                              onChange={handleChange}
                              placeholder="Enter Color"
                              className={
                                "form-control" +
                                (errors.color && touched.color
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="color"
                              component="div"
                              className="invalid-feedback"
                            /> */}
                          </div>
                          {/* <div className="form-group d-flex align-items-center">
                                                        <Field
                                                            name="is_bundled_product"
                                                            type="checkbox"
                                                            style={{ width: '20px', marginLeft: '10px' }}
                                                            className={'form-control' + (errors.is_bundled_product && touched.is_bundled_product ? ' is-invalid' : '')} />
                                                        <label htmlFor="is_bundled_product" style={{ marginBottom: 0, paddingLeft: '12px' }} >Click if Product is bundled *</label>
                                                        <ErrorMessage name="is_bundled_product" component="div" className="invalid-feedback" />
                                                    </div> */}
                          <div className="form-group d-flex align-items-center">
                            <Field
                              name="is_active"
                              type="checkbox"
                              style={{ width: "20px", marginLeft: "10px" }}
                              className={
                                "form-control" +
                                (errors.is_active && touched.is_active
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <label
                              htmlFor="is_active"
                              style={{ marginBottom: 0, paddingLeft: "12px" }}
                            >
                              Active
                            </label>
                            <ErrorMessage
                              name="is_active"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col>
                          <br />
                          <div className="form-group">
                            <label htmlFor="sub_cat_id">
                              Select Sub Category *
                            </label>
                            <Field
                              as="select"
                              name="sub_cat_id"
                              className={
                                "form-control" +
                                (errors.sub_cat_id && touched.sub_cat_id
                                  ? " is-invalid"
                                  : "")
                              }
                              style={{
                                height: "55px",
                                border: "1px solid #999C9F",
                                outline: "none",
                                color: "#545353",
                              }}
                            >
                              <option value="" style={{ fontSize: "20px" }}>
                                Select Sub Category
                              </option>
                              {subCategory?.map((val) => (
                                <option
                                  style={{ fontSize: "20px" }}
                                  value={val?._id}
                                >
                                  {val?.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="sub_cat_id"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="price"> Price *</label>
                            <Field
                              name="price"
                              type="number"
                              value={values.price}
                              onChange={handleChange}
                              placeholder="Enter Price"
                              className={
                                "form-control" +
                                (errors.price && touched.price
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="discount_price">
                              Discounted Price *
                            </label>
                            <Field
                              name="discount_price"
                              type="number"
                              value={values.discount_price}
                              onChange={handleChange}
                              placeholder="Enter Discounted Price"
                              className={
                                "form-control" +
                                (errors.discount_price && touched.discount_price
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="discount_price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="your_earning">Your earning *</label>
                            <Field
                              name="your_earning"
                              type="number"
                              value={values.your_earning}
                              onChange={handleChange}
                              placeholder="Enter Your earning"
                              className={
                                "form-control" +
                                (errors.your_earning && touched.your_earning
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="your_earning"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="final_price"> Final Price *</label>
                            <Field
                              name="final_price"
                              type="number"
                              value={values.final_price}
                              onChange={handleChange}
                              placeholder="Enter Final Price"
                              className={
                                "form-control" +
                                (errors.final_price && touched.final_price
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="final_price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="result">
                            {renderPhotos(selectedFiles)}
                          </div>
                          <div className="form-group">
                            {/* {
                                                            fileData?.length > 0 || fileData ?
                                                                <div style={styles.preview}>
                                                                    {fileData && fileData?.map(img => (
                                                                        <img
                                                                            src={`${IMAGE_URL}${img}`}
                                                                            style={styles.productImage}
                                                                            alt="productImage"
                                                                        />
                                                                    ))}
                                                                </div>
                                                                : ''
                                                        } */}
                            <label htmlFor="image">Product Image *</label>
                            <Field
                              name="images"
                              type="file"
                              //value={values.images}
                              multiple
                              onChange={(e) => {
                                console.log("target val", e.target.value);
                                handleChange(e);
                                handleMultiImageUpload(e);
                              }}
                              accept="image/png, image/gif, image/jpeg"
                              className={
                                "form-control" +
                                (errors.images && touched.images
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="images"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="product_code">
                              {" "}
                              Product code *
                            </label>
                            <Field
                              name="product_code"
                              type="text"
                              value={values.product_code}
                              onChange={handleChange}
                              placeholder="Enter Product code e.g PRODUCT123"
                              className={
                                "form-control" +
                                (errors.product_code && touched.product_code
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="product_code"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="weight"> Weight *</label>
                            <Field
                              name="weight"
                              type="number"
                              value={values.weight}
                              onChange={handleChange}
                              placeholder="Enter Product weight"
                              className={
                                "form-control" +
                                (errors.weight && touched.weight
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="weight"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="qty"> Quantity *</label>
                            <Field
                              name="qty"
                              type="number"
                              value={values.qty}
                              onChange={handleChange}
                              placeholder="Enter Quantities"
                              className={
                                "form-control" +
                                (errors.qty && touched.qty ? " is-invalid" : "")
                              }
                            />
                            <ErrorMessage
                              name="qty"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="year"> Year *</label>
                            <Field
                              name="year"
                              type="text"
                              value={values.year}
                              onChange={handleChange}
                              placeholder="Enter Year"
                              className={
                                "form-control" +
                                (errors.year && touched.year
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="year"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                      </Row>
                      <button
                        type="submit"
                        className="btn btn-primary mr-2"
                        disabled={isSubmitting}
                      >
                        {isLoading && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Submit
                      </button>
                      {/* <button type="reset" className="btn btn-secondary ms-2">Reset</button> */}
                    </Form>
                  </div>
                </div>
              </div>
            </Container>
          )}
        />
      </div>
    </div>
  );
};

export default AddProduct;
