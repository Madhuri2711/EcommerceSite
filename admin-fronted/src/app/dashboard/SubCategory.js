import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import ReactS3 from "react-s3";
import awsConfig from "../config/awsConfig";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../lib/constant";
import Controls from "./listbasic-ui/Controls";

const SubCategory = () => {
  const API_BANNERS = `${BASE_URL}sub-category/add`;
  const FETCH_ALL_CATEGORY = `${BASE_URL}category/`;

  let history = useHistory();
  const [category, setCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  // const [otherselectedImage, setOtherImage] = useState();
  const [isLoading, setLoading] = useState(false);
  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [fileData, setfileData] = useState();
  // const [image, setImage] = useState();

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleImage = (event) => {
    let file = event.target.files[0];
    setfileData(file);
    setSelectedImage(event.target.files[0]);
  };
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_CATEGORY, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data.data);
      setCategory(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const submitData = async (fields) => {
    try {
      setLoading(true);

      if (fileData) {
        const requestOne = await ReactS3.uploadFile(fileData, awsConfig);
        var img = requestOne?.location;
        const pathArray = img.split("/");
        const lastIndex = pathArray.length - 1;
        const newImagePath = pathArray[lastIndex];
        fields.img = newImagePath;
        var size = fields.size;
        const newsize = size.split(",");
        fields.size = newsize;
      }

      const requestThree = await axios.post(API_BANNERS, fields, {
        headers: { Authorization: `${TOKEN}` },
      });

      history.push("/sub-categorylist");
    } catch (e) {
      console.log(e);
    }
  };

  const backbtn = () => {
    history.push("/sub-categorylist");
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
      flexDirection: "column",
    },
    image: { maxWidth: "30%", maxHeight: 135, borderRadius: "10px 50px 10px" },
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

  const mystyle = {
    width: "55px",
    height: "50px !imporatnt",
    borderRadius: "10px",
  };

  return (
    <div className="container-xxl">
      <div className="card mt-4">
        <div className="card-header">
          <div>
            <h3 style={styles.headersetting}>Sub Category</h3>
            <div className="backbutton">
              <Button variant="primary" onClick={backbtn}>
                Back
              </Button>
            </div>
          </div>
        </div>
        <Formik
          initialValues={{
            cat_id: "",
            name: "",
            img: "",
            size: "",
            isActive: true,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Title is required"),
            img: Yup.mixed().required("File is required"),
            size: Yup.string()
              .required("Size is required")
              .min(4, "please enter comma (,) saperated size value"),
            isActive: Yup.bool(),
          })}
          onSubmit={(fields) => {
            submitData(fields);
          }}
          render={({ errors, status, touched, handleChange, values }) => (
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                  <Form>
                    <br />
                    {/* <label htmlFor="cat_id"> Select Category *</label>
                                            <Controls.SelectInputField
                                                label="Category"
                                                value={values.cat_id ? values.cat_id : ''}
                                                name="cat_id"
                                                id="cat_id"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                error={errors.cat_id && touched.cat_id && errors.cat_id}
                                                options={category}
                                            /> */}
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="cat_id"> Select Category *</label>
                          <Field
                            as="select"
                            name="cat_id"
                            className={
                              "form-control" +
                              (errors.cat_id && touched.cat_id
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
                            name="cat_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name"> Sub Category Name *</label>
                          <Field
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Enter  Sub Category Name"
                            className={
                              "form-control" +
                              (errors.name && touched.name ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        {selectedImage && (
                          <div style={styles.preview}>
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              style={mystyle}
                              alt="Thumb"
                            />
                          </div>
                        )}
                        <div className="form-group">
                          <label htmlFor="image">Sub Category Image *</label>
                          <Field
                            name="img"
                            type="file"
                            value={values.img}
                            onChange={(e) => {
                              handleChange(e);
                              handleImage(e);
                            }}
                            accept="image/png, image/gif, image/jpeg"
                            className={
                              "form-control" +
                              (errors.img && touched.img ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="img"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="size"> Sub Category Size *</label>
                          <Field
                            name="size"
                            type="text"
                            value={values.size}
                            onChange={handleChange}
                            placeholder="Enter Sub Category Size"
                            className={
                              "form-control" +
                              (errors.size && touched.size ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="size"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="form-group d-flex align-items-center">
                      <Field
                        name="isActive"
                        type="checkbox"
                        style={{ width: "20px", marginLeft: "10px" }}
                        className={
                          "form-control" +
                          (errors.isActive && touched.isActive
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <label
                        htmlFor="isActive"
                        style={{ marginBottom: 0, paddingLeft: "15px" }}
                      >
                        Active
                      </label>
                      <ErrorMessage
                        name="isActive"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
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
                      <button type="reset" className="btn btn-secondary ms-2">
                        Reset
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default SubCategory;
