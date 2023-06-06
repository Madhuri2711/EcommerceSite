import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";
import { login } from "../../slices/auth";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [messageDisplay, setMessageDisplay] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;

  useEffect(() => {
    dispatch(clearMessage());
    if (isLoggedIn) {
      return <Redirect to="/sign-in" />;
    }
  }, [dispatch]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().required("Username and Email is required"),
    password: Yup.string().trim().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await dispatch(
        login({ email: values.email, password: values.password })
      );
      if (response.payload.status === 200) {
        props.history.push("/");
        setLoading(false);
      } else {
        setLoading(false);
        setMessageDisplay(response?.payload?.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessageDisplay("");
    }, 8000);
  }, [messageDisplay]);

  return (
    <section className="vh-100" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "2rem", backgroundColor:"#E5E3E4" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block mt-3">
                  <img
                    src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg?w=2000"
                    alt="login form"
                    className="img-fluid"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      marginLeft: "25px",
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validationSchema={LoginSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        handleSubmit(values);
                      }}
                    >
                      {({ touched, errors, isSubmitting }) => (
                        <Form autocomplete="off">
                          <h2
                            className="fw-normal mb-3 pb-3"
                            style={{ letterSpacing: "1px" }}
                          >
                            Sign into your account
                          </h2>
                          {messageDisplay && (
                            <Alert variant="danger">{messageDisplay}</Alert>
                          )}
                          <div className="form-group common-bg">
                            <Field
                              type="text"
                              name="email"
                              placeholder="Username and Email"
                              className={`form-control  ${touched.email && errors.email
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
                          <div className="form-group d-flex mb-0">
                            <Field
                              type={passwordShown ? "text" : "password"}
                              name="password"
                              placeholder="Password"
                              className={`form-control ${touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                                }`}
                            />
                            <i
                              className="eyeicon"
                              onClick={togglePasswordVisiblity}
                            >
                              {eye}
                            </i>
                            {/* <ErrorMessage
                              component="div"
                              name="password"
                              className="invalid-feedback"
                            /> */}
                          </div>
                          {errors.password && touched.password && (
                            <p className="error-msg">{errors.password}</p>
                          )}
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
                                  {loading ? "" : "LOGIN"}
                                </button>
                                <Link to="/">
                                  <button
                                    className="btn btn-dark btn-lg btn-block mt-2"
                                    type="submit"
                                    style={{
                                      fontSize: "15px",
                                      backgroundColor: "#000000",
                                    }}
                                  >
                                    Back To Home
                                  </button>
                                </Link>
                              </div>
                            </div>
                            <Link
                              className="small text-muted"
                              to={process.env.PUBLIC_URL + "/forgot-password"}
                              style={{ fontSize: "15px" }}
                            >
                              Forgot password?
                            </Link>
                            <p
                              className="mb-5 pb-lg-2"
                              style={{ color: "#393f81" }}
                            >
                              Don't have an account?
                              <Link
                                to={process.env.PUBLIC_URL + "/register"}
                                style={{ paddingLeft: "5px" }}
                              >
                                Sign Up
                              </Link>
                            </p>
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

export default SignIn;
