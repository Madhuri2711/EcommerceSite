import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authAction";
import Registration from "./Registration";
import ForgotPassword from "./Forgot-Password";

const LoginRegister = ({ location, props }) => {
  const { pathname } = location;
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const [forgotPasswordToggle, setForgotPasswordToggle] = useState(false);
  const [isNewPassSet, setIsNewPassSet] = useState(false);
  const [error, setError] = useState(false);

  const resetAllState = () => {
    setForgotPasswordToggle(false);
    // setIsForgotLinkSent(false);
    setError(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    dispatch(login({ email: values.email, password: values.password })).catch(
      (error) => {
        return error;
      }
    );
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Inani | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="forgotpassword">
                          <h4>Forgot Password</h4>
                        </Nav.Link>
                      </Nav.Item>                   */}
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            {/* 
                          {message && (
                                  <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                      {message}
                                    </div>
                                  </div>
                                )} */}

                            <Formik
                              initialValues={{ email: "", password: "" }}
                              validationSchema={LoginSchema}
                              onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                                handleSubmit(values);
                              }}
                            >
                              {({ touched, errors, isSubmitting }) => (
                                <Form>
                                  <div className="form-group">
                                    <Field
                                      type="text"
                                      name="email"
                                      placeholder="Username"
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

                                  {/* <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                              /> */}
                                  <div className="button-box">
                                    <div className="login-toggle-btn">
                                      <Link to={process.env.PUBLIC_URL + "/"}>
                                        Forgot Password?
                                      </Link>
                                      {/* <span
                                    onClick={() => {
                                      setForgotPasswordToggle(
                                        !forgotPasswordToggle,
                                      );
                                      // form.reset();
                                      // form.restart({});
                                    }}
                                  >
                                    Forgot password?
                                  </span> */}
                                    </div>
                                    <button type="submit">
                                      <span>Login</span>
                                    </button>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <Registration />
                      </Tab.Pane>
                      {forgotPasswordToggle ? (
                        <Tab.Pane eventKey="forgotpassword">
                          <ForgotPassword />
                        </Tab.Pane>
                      ) : (
                        ""
                      )}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
