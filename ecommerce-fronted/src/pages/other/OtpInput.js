import React, { Component, ReactDOM, useEffect, useState } from "react";
// import "../../assets/css/otp.css";
//import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "react-bootstrap/Alert";

const OtpInput = (props) => {
  const [submittingBtnProcess, setSubmittingBtnProcess] = useState(false);
  const [messageDisplay, setMessageDisplay] = useState();
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (props.location.details) {
      setDetails(props.location?.details?.data?.data?.otp);
    }
  }, []);

  const handleSubmit = (value) => {
    try {
      setSubmittingBtnProcess(true);
      const otpvalue = value?.otp;
      if (details === otpvalue) {
        props.history.push("/forgot-password-change");
        setSubmittingBtnProcess(false);
      } else {
        setMessageDisplay("Otp does not valid");
        setSubmittingBtnProcess(false);
      }
    } catch (err) {
      setSubmittingBtnProcess(false);
    }
  };

  const otpSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
  });

  useEffect(() => {
    setTimeout(() => {
      setMessageDisplay("");
    }, 8000);
  }, [messageDisplay]);
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://img.freepik.com/free-vector/authentication-concept-illustration_114360-2745.jpg?w=2000"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <h2
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Verify OTP
                      </h2>
                      <Formik
                        initialValues={{ otp: "" }}
                        validationSchema={otpSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          handleSubmit(values);
                          setSubmitting(false);
                        }}
                      >
                        {({ touched, errors, isSubmitting }) => (
                          <Form>
                            <div className="login-form-container">
                              <div className="login-register-form">
                                <div className="form-group">
                                  {messageDisplay && (
                                    <Alert variant="danger">
                                      {messageDisplay}
                                    </Alert>
                                  )}
                                  <Field
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    className={`form-control ${
                                      touched.otp && errors.otp
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="otp"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-dark btn-lg btn-block"
                                  disabled={submittingBtnProcess}
                                  style={{
                                    fontSize: "15px",
                                    backgroundColor: "#F28B27",
                                  }}
                                >
                                  {submittingBtnProcess && (
                                    <span className="spinner-border spinner-border-sm mb-1"></span>
                                  )}
                                  {submittingBtnProcess ? "" : "SUBMIT"}
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OtpInput;
