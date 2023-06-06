import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import ReactS3 from "react-s3";
import awsConfig from "../config/awsConfig";
import axios from "axios";
import { BASE_URL, TOKEN } from "../../lib/constant";
import "../dashboard/listbasic-ui/icon.css";

const Category = () => {
  const API_BANNERS = `${BASE_URL}category/add`;

  let history = useHistory();
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setLoading] = useState(false);
  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [fileData, setfileData] = useState();

  const handleImage = (event) => {
    let file = event.target.files[0];
    setfileData(file);
    setSelectedImage(event.target.files[0]);
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
      }
      const requestThree = await axios.post(API_BANNERS, fields, {
        headers: { Authorization: `${TOKEN}` },
      });

      history.push("/categorylist");
    } catch (e) {
      console.log(e);
    }
  };

  const backbtn = () => {
    history.push("/categorylist");
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
    text: {
      justifyContent: "left",
      alignItems: "center",
      top: "10px",
    },
    image: {
      maxWidth: "16%",
      maxHeight: 200,
      borderRadius: "100px !important",
    },
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
    width: "100px",
    height: "60px !imporatnt",
    borderRadius: "10px",
  };

  return (
    <div className="container-xxl">
      <div className="card mt-4">
        <div className="card-header">
          <div>
            <h3 style={styles.headersetting}>Category</h3>
            <div className="backbutton">
              <Button variant="primary" onClick={backbtn}>
                Back
              </Button>
            </div>
          </div>
        </div>
        <Formik
          initialValues={{
            name: "",
            img: "",
            order: "",
            isActive: true,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Category Name is required"),
            order: Yup.string().required("Position is required"),
            // img: Yup.mixed().required("Category Image is required"),
            isActive: Yup.bool(),
          })}
          onSubmit={(fields) => {
            console.log(fields);
            submitData(fields);
          }}
          render={({ errors, status, touched, handleChange, values }) => (
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col col-lg-6">
                  <Form>
                    <br />
                    <Row>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="name">Category Name *</label>
                          <Field
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Enter Category Name"
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
                        <div className="form-group">
                          <label htmlFor="order">Position *</label>
                          <Field
                            name="order"
                            type="text"
                            value={values.order}
                            onChange={handleChange}
                            placeholder="Enter Position"
                            className={
                              "form-control" +
                              (errors.order && touched.order
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="order"
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
                          <label htmlFor="image">Category Image *</label>
                          <Field
                            name="img"
                            type="file"
                            value={values.img}
                            onChange={handleImage}
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
                        style={{ marginBottom: 0, paddingLeft: "12px" }}
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

export default Category;
