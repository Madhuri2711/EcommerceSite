import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../services/auth.service";
import Alert from "react-bootstrap/Alert";

const ForgotPassword = (props) => {
  const [submittingBtnProcess, setSubmittingBtnProcess] = useState(false);
  const [messageDisplay, setMessageDisplay] = useState();

  const handleSubmit = async (values) => {
    setSubmittingBtnProcess(true);
    let result = await forgotPassword(values);
    if (result.status === 200 && result.data.isSuccess) {
      props.history.push({
        pathname: "/otp",
        details: result,
      });
      localStorage.setItem("email", values.email);  
      setSubmittingBtnProcess(false);
    } else {
      setMessageDisplay(result?.message);
      setSubmittingBtnProcess(false);
    }
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const backToSignIn = () => {
    props.history.push("/sign-in");
  };

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
                      src="https://i.pinimg.com/736x/d2/f1/3d/d2f13d48f5ec46049f05bf6af098e7e9.jpg"
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
                        Forgot your password?
                      </h2>
                      <p>
                        Please enter the email address associated with your
                        account and We will email you a link to reset your
                        password.
                      </p>
                      <Formik
                        initialValues={{ email: "" }}
                        validationSchema={ForgotPasswordSchema}
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
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    className={`form-control ${
                                      touched.email && errors.email
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="email"
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
                                  {submittingBtnProcess ? "" : "CONTINUE"}
                                </button>
                                <button
                                  type="submit"
                                  className="btn theme-btn btn-lg btn-block"
                                  onClick={backToSignIn}
                                  style={{ fontSize: "15px" }}
                                >
                                  BACK
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
export default ForgotPassword;
