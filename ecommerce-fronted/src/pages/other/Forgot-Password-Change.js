import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, } from "formik";
import * as Yup from "yup";
import { forgotPasswordChange } from "../../services/auth.service";
import { object, string, ref } from "yup";

const ForgotPasswordChange = (props) => {
  const [loading, setLoading] = useState(false);

  const ForgotPasswordChangeSchema = object().shape({
    password: string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),  
    cpassword: string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Confirm Password is required")
      .oneOf([ref("password")], "Passwords do not match"),
      
  });

  const handleSubmit = async (values) => {
    const newValue = {
      ...values,
      email:localStorage.getItem('email')
    }
    console.log("newValue",newValue)
    try {
      setLoading(true);
      const response = await forgotPasswordChange(newValue);
      if (response.status === 200 && response.data.isSuccess) {
        localStorage.removeItem('email');
        props.history.push("/sign-in");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://img.freepik.com/free-vector/thinking-face-concept-illustration_114360-7944.jpg?w=2000"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Formik
                      initialValues={{ cpassword: "", password: "" }}
                      validationSchema={ForgotPasswordChangeSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        handleSubmit(values);
                      }}
                    >
                      {({ touched, errors, isSubmitting }) => (
                        <Form>
                          <h2
                            className="fw-normal mb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Create new password
                          </h2>
                          <p>
                            We'll ask for this password whenever you are sign in.
                          </p>
                          <div className="form-group">
                            <Field
                              type="password"
                              name="password"
                              placeholder="Password"
                              className={`form-control ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="password"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <Field
                              type="text"
                              name="cpassword"
                              placeholder="Confirm Password"
                              className={`form-control ${
                                touched.cpassword && errors.cpassword
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              component="div"
                              name="cpassword"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="button-box">
                            <div className="login-toggle-btn">
                              <div className="pt-1 mb-4">
                                <button
                                  className="btn btn-dark btn-lg btn-block"
                                  type="submit"
                                  disabled={loading}
                                  style={{
                                    fontSize: "15px",
                                    backgroundColor: "#F28B27",
                                  }}
                                >
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm mb-1"></span>
                                  )}
                                  {loading ? "" : "CHANGE PASSWORD"}
                                </button>
                              </div>
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
  );
};

export default ForgotPasswordChange;
