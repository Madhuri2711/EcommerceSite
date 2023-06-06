import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "../dashboard/listbasic-ui/icon.css";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
import ReactS3 from "react-s3";
import awsConfig from "../config/awsConfig";
import { EditOutlined } from "@material-ui/icons";
import Controls from "../dashboard/listbasic-ui/Controls";
import Loader from "../dashboard/listbasic-ui/Loader";

const AdminProfileUpdate = () => {
  // const { id } = useParams();

  // const PROFILE_UPDATE = `${BASE_URL}admin`;
  const PROFILE_DATA = `${BASE_URL}admin`;

  let history = useHistory();

  const [profileData, setprofileData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState("");
  const [userMeassage, setUserMeassage] = useState("");

  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getProfileData();
  }, []);

  console.log("profileData", profileData[0]?.firstName);
  const handleImage = (event) => {
    let file = event.target.files[0];
    console.log("file", file);
    // setfileData(file);
    // setSelectedImage(event.target.files[0]);
  };
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(PROFILE_DATA, {
        headers: { Authorization: `${TOKEN}` },
      });
      setprofileData(data?.data);
      //setloading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const forgotPassWord = async (email) => {
    const mail = { email: "test123@yopmail.com" };
    setPasswordLoading(true);
    try {
      const { data } = await axios.post(`${PROFILE_DATA}/forgot`, mail);
      console.log(data?.data);
      setUserMeassage(data?.data?.message);
    } catch (e) {
      console.log(e);
    }
    setPasswordLoading(false);
  };
  const updateProfileData = async (fields) => {
    const id = profileData[0]?._id;
    try {
      const { data } = await axios.put(`${PROFILE_DATA}/${id}`, fields, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data?.data);
      //setloading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const backbtn = () => {
    history.goBack();
  };
  return (
    <>
      <div className="container-xxl">
        <div className="card mt-4">
          <div className="card-header">
            <h2>Profile Info</h2>
            {/* <div className="backbutton">
                            <Button
                                variant="primary"
                                onClick={backbtn}
                            >
                                Back
                            </Button>
                        </div> */}
          </div>
          <br />
          <div className="card-body">
            <div
              className="text-success"
              style={{
                marginTop: "-2rem",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {passwordLoading}
              {userMeassage ? userMeassage : ""}
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                image: profileData[0]?.image,
                firstName: profileData[0]?.firstName,
                lastName: profileData[0]?.lastName,
                userName: profileData[0]?.userName,
                email: profileData[0]?.email,
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                  .required("First name is required")
                  .min(2, "Too Short!")
                  .max(15, "Too Long!"),
                lastName: Yup.string()
                  .required("Last name is required ")
                  .min(2, "Too Short!")
                  .max(15, "Too Long!"),
                userName: Yup.string()
                  .required("Username is required ")
                  .min(2, "Too Short!")
                  .max(15, "Too Long!"),
                email: Yup.string()
                  .email("Email is invalid")
                  .required("Email is required"),
              })}
              onSubmit={(fields) => {
                alert(JSON.stringify(fields));
                updateProfileData(fields);
                //submitData(fields);
              }}
              render={({ errors, status, touched, values, handleChange }) => (
                <div className="container">
                  <Form>
                    <Row className="justify-content-center">
                      <Col>
                        <div
                          style={{
                            display: loading ? "block" : "none",
                            marginTop: "50px",
                            marginLeft: "100px",
                          }}
                        >
                          <Loader />
                        </div>
                        <div style={{ display: loading ? "none" : "block" }}>
                          {values?.image === "" ? (
                            <div>{""}</div>
                          ) : (
                            <div>
                              <img
                                src={`${IMAGE_URL}${values?.image}`}
                                alt="admin"
                                style={{
                                  width: "80px",
                                  borderRadius: "50%",
                                  marginTop: "50px",
                                  marginLeft: "100px",
                                }}
                                onLoad={() => setLoader(false)}
                              />
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="form-group">
                          <label htmlFor="firstName">First Name *</label>
                          <Field
                            name="firstName"
                            type="text"
                            value={values.firstName}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            className={
                              "form-control" +
                              (errors.firstName && touched.firstName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="userName">userName *</label>
                          <Field
                            name="userName"
                            type="text"
                            value={values.userName}
                            onChange={handleChange}
                            placeholder="Enter userName"
                            className={
                              "form-control" +
                              (errors.userName && touched.userName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name *</label>
                          <Field
                            name="lastName"
                            type="text"
                            value={values.lastName}
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            className={
                              "form-control" +
                              (errors.lastName && touched.lastName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email *</label>
                          <Field
                            name="email"
                            type="email"
                            disabled
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className={
                              "form-control" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}></Col>
                      <Col xs={4}>
                        {/* <div className="form-group">
                          <h5>Wants to Change Password?</h5>
                          <Link
                            // type="submit"
                            // className="btn btn-primary mr-2"
                            onClick={() => {
                              forgotPassWord(values.email);
                            }}
                            disabled={isSubmitting}
                          >
                            {passwordLoading && (
                              <span className="spinner-border spinner-border-sm mr-1"></span>
                            )}
                            Change Password
                          </Link>
                        </div> */}
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
                      </Col>
                    </Row>
                  </Form>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileUpdate;
