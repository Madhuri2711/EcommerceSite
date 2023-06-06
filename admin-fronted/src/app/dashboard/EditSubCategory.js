import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "../dashboard/listbasic-ui/icon.css";
import ReactS3 from "react-s3";
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
import Controls from "./listbasic-ui/Controls";
import Loader from "./listbasic-ui/Loader";

const EditBlog = () => {
  let { id } = useParams();
  let history = useHistory();

  const [forminitialValues, setforminitialValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setLoading] = useState(false);
  const [subCategoryImageUrl, setsubCategoryImageUrl] = useState();
  const [fileData, setfileData] = useState();
  const [category, setCategory] = useState([]);
  const [loading, setLoader] = useState(true);
  const { formState } = useForm();
  const { isSubmitting } = formState;

  const FETCH_ALL_CATEGORY = `${BASE_URL}category/`;

  useEffect(() => {
    loadSubCategory();
    fetchCategory();
  }, []);

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
  const [isError, setError] = useState(null);

  const handleImage = (event) => {
    let file = event.target.files[0];
    setfileData(file);
    setSelectedImage(event.target.files[0]);
  };

  const loadSubCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}sub-category/${id}`, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(response);
      setforminitialValues(response?.data?.data);
      setsubCategoryImageUrl(response?.data?.data?.img);
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

      const response = await axios.put(
        `${BASE_URL}sub-category/${id}`,
        fields,
        {
          headers: { Authorization: `${TOKEN}` },
        }
      );
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
    subcategoryimage: {
      maxWidth: "16%",
      maxHeight: 130,
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
    width: "55px",
    height: "50px !imporatnt",
    borderRadius: "10px",
  };

  return (
    <>
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
          <div className="card-body">
            <Formik
              enableReinitialize
              //initialValues={forminitialValues}
              initialValues={{
                cat_id: forminitialValues?.cat_id,
                name: forminitialValues?.name,
                // img: forminitialValues?.img?.length ? forminitialValues?.img?.split('/').pop() : forminitialValues?.img,
                size:
                  forminitialValues?.size?.length > 0
                    ? forminitialValues?.size?.join()
                    : forminitialValues?.size,
                isActive: forminitialValues?.isActive,
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                //img: Yup.mixed().required('File is required'),
                size: Yup.string()
                  .required("Size is required")
                  .min(2, "please enter comma (,) saperated size value"),
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
                        {/* <Controls.SelectInputField
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
                              <label htmlFor="name">Sub Category Name *</label>
                              <Field
                                name="name"
                                type="text"
                                placeholder="Enter Sub Category Name"
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
                            { subCategoryImageUrl ?
                              <div
                                style={{
                                  display: loading ? "block" : "none",
                                }}
                              >
                                <Loader />
                              </div> : <div>{""}</div>
                            }
                            {subCategoryImageUrl ? (
                              <div>
                                <div
                                  style={{
                                    display: loading ? "none" : "block",
                                  }}
                                >
                                  <img
                                    src={
                                      selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : `https://inani-hub.s3.amazonaws.com/${subCategoryImageUrl}`
                                    }
                                    style={mystyle}
                                    alt="img"
                                    onLoad={() => setLoader(false)}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div>{""}</div>
                            )}
                            <div className="form-group">
                              <label htmlFor="img">Sub Category Image *</label>
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
                            <div className="form-group">
                              <label htmlFor="size"> Sub Category Size *</label>
                              <Field
                                name="size"
                                type="text"
                                // value={values.size}
                                // onChange={handleChange}
                                placeholder="Enter Sub Category Size"
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
                          </Col>
                        </Row>
                        <div className="form-group d-flex align-items-center">
                          <Field
                            name="isActive"
                            type="checkbox"
                            defaultChecked
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
