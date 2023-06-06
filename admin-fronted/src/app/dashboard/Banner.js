import React, { useState } from "react";
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

const Banner = () => {
  const API_BANNERS = `${BASE_URL}banner/add`;
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
        fields.image = newImagePath;
      }

      const requestThree = await axios.post(API_BANNERS, fields, {
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
      maxWidth: "20%",
      maxHeight: '55px',
      borderRadius: "10px",
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
          initialValues={{
            title: "",
            bannerImage: "",
            isActive: true,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Title is required"),
            bannerImage: Yup.mixed().required("File is required"),
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
                        value={values.title}
                        onChange={handleChange}
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
                        {selectedImage && (
                          <div style={styles.preview}>
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              style={styles.bannerImage}
                              alt="bannerimage"
                            />
                          </div>
                        )}
                        <div className="form-group">
                          <label htmlFor="bannerImage"> Banner Image *</label>
                          <Field
                            name="bannerImage"
                            type="file"
                            value={values.bannerImage}
                            onChange={(e) => {
                              handleChange(e);
                              handleImage(e);
                            }}
                            accept="image/png, image/gif, image/jpeg"
                            className={
                              "form-control" +
                              (errors.bannerImage && touched.bannerImage
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="bannerImage"
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

export default Banner;
