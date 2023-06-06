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
import Loader from "./listbasic-ui/Loader";

const EditBlog = () => {
  let { id } = useParams();
  let history = useHistory();
  const [forminitialValues, setforminitialValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setLoading] = useState(false);
  const [bannerImageUrl, setBannerImageUrl] = useState();
  const [fileData, setfileData] = useState();
  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    loadBlog();
  }, []);

  const [isError, setError] = useState(null);

  const handleImage = (event) => {
    let file = event.target.files[0];
    setfileData(file);
    setSelectedImage(event.target.files[0]);
  };

  const loadBlog = async () => {
    try {
      const response = await axios.get(`${BASE_URL}banner/${id}`, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(response);
      setforminitialValues(response.data.data);
      setBannerImageUrl(response.data.data?.image);
    } catch (e) {
      console.log(e);
    }
  };

  const submitData = async (fields) => {
    try {
      setLoading(true);

      if (fileData) {
        const requestOne = await ReactS3.uploadFile(fileData, awsConfig);
        var coverImage = requestOne?.location;
        fields.image = coverImage;
      }

      const values = {
        title: fields.title,
        image: fields.image,
        isActive: fields.isActive,
      };

      const response = await axios.put(`${BASE_URL}banner/${id}`, values, {
        headers: { Authorization: `${TOKEN}` },
      });

      history.push("/bannerlist");
    } catch (e) {
      console.log(e);
    }
  };

  const backbtn = () => {
    history.push("/bannerlist");
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
    bannerImage: {
      width: "55px",
      height: "55px !imporatnt",
      borderRadius: "10px",
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
            <h3 style={styles.headersetting}>Banner</h3>
            <div className="backbutton">
              <Button variant="primary" onClick={backbtn}>
                Back
              </Button>
            </div>
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            title: forminitialValues?.title,
            //image: forminitialValues?.image,
            isActive: forminitialValues?.isActive,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Title is required"),
            //image: Yup.mixed().required('File is required'),
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
                    <div className="form-group">
                      <label htmlFor="title">Title *</label>
                      <Field
                        name="title"
                        type="text"
                        // value={values.title}
                        // onChange={handleChange}
                        placeholder="Enter Title"
                        className={
                          "form-control" +
                          (errors.title && touched.title ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <Row>
                      <Col>
                        <div style={{ display: loading ? "block" : "none" }}>
                          <Loader />
                        </div>
                        <div style={{display: loading ? "none" : "block"}}>
                          <img
                            src={
                              selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : `https://inani-hub.s3.amazonaws.com/${bannerImageUrl}`
                            }
                            style={mystyle}
                            alt="bannerimage"
                            onLoad={() => setLoader(false)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="image">Banner Image *</label>
                          <Field
                            name="image"
                            type="file"
                            onChange={(e) => {
                              handleImage(e);
                              handleChange(e);
                            }}
                            accept="image/png, image/gif, image/jpeg"
                            className={
                              "form-control" +
                              (errors.image && touched.image
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="image"
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
export default EditBlog;
