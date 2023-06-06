import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "../dashboard/listbasic-ui/icon.css";
import ReactS3 from "react-s3";
import "../dashboard/listbasic-ui/icon.css";
import awsConfig from "../config/awsConfig";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BASE_URL, TOKEN } from "../../lib/constant";
import LoadingSpinner from "./listbasic-ui/LoadingSpinner";
import Loader from "./listbasic-ui/Loader";

const EditBlog = () => {
  let { id } = useParams();
  let history = useHistory();

  const [forminitialValues, setforminitialValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [categoryImageUrl, setcategoryImageUrl] = useState();
  const [isLoading, setLoading] = useState(false);
  const [fileData, setfileData] = useState();
  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    loadCategory();
  }, []);

  const [isError, setError] = useState(null);

  const handleImage = (event) => {
    let file = event.target.files[0];
    setfileData(file);
    setSelectedImage(event.target.files[0]);
  };

  const loadCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}category/${id}`, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(response);
      setforminitialValues(response?.data?.data);
      setcategoryImageUrl(response?.data.data?.img);
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
      }

      const response = await axios.put(`${BASE_URL}category/${id}`, fields, {
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
    categoryimage: {
      bottom: "50px !important",
      maxWidth: "16%",
      maxHeight: 150,
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
    <>
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
          <div className="card-body">
            <Formik
              enableReinitialize
              initialValues={{
                name: forminitialValues?.name,
                order: forminitialValues?.order,
                // img: forminitialValues?.img
                isActive: forminitialValues?.isActive,
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Category Name is required"),
                //img: Yup.mixed().required('File is required'),
                isActive: Yup.bool(),
              })}
              onSubmit={(fields) => {
                submitData(fields);
              }}
              render={({ errors, status, touched, handleChange }) => (
                <div className="container">
                  <div className="row justify-content-md-center">
                    <div className="col col-lg-6">
                      <Form>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label htmlFor="name"> Category Name *</label>
                              <Field
                                name="name"
                                type="text"
                                placeholder="Enter  Category Name"
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
                            <div className="form-group">
                              <label htmlFor="order">Position *</label>
                              <Field
                                name="order"
                                type="text"
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
                            <div
                              style={{ display: loading ? "block" : "none" }}
                            >
                              <Loader />
                            </div>
                            <div style={{display: loading ? "none" : "block"}}>
                              <img
                                src={
                                  selectedImage
                                    ? URL.createObjectURL(selectedImage)
                                    : `https://inani-hub.s3.amazonaws.com/${categoryImageUrl}`
                                }
                                style={mystyle}
                                alt="categoryImage"
                                onLoad={() => setLoader(false)}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="img"> Category Image *</label>
                              <Field
                                name="img"
                                type="file"
                                onChange={(e) => {
                                  handleImage(e);
                                  handleChange(e);
                                }}
                                accept="image/png, image/gif, image/jpeg"
                                className={
                                  "form-control" +
                                  (errors.img && touched.img
                                    ? " is-invalid"
                                    : "")
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
                            style={{
                              width: "20px",
                              marginLeft: "10px",
                            }}
                            className={
                              "form-control" +
                              (errors.isActive && touched.isActive
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <label
                            htmlFor="isActive"
                            style={{
                              marginBottom: 0,
                              paddingLeft: "12px",
                            }}
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
                            Update
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
      </div>
    </>
  );
};
export default EditBlog;
