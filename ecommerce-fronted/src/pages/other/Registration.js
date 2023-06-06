import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../slices/auth";
import Alert from "react-bootstrap/Alert";
import toast from "react-hot-toast";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
};

const Registration = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [messageDisplay, setMessageDisplay] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleRegister = async (fields) => {
    try {
      setLoading(true);
      const response = await dispatch(register(fields));
      if (
        response.payload.status === 200 &&
        response.payload.data.data !== undefined
      ) {
        props.history.push("/sign-in");
        setLoading(false);
        setSuccessMessage(response?.payload?.data?.message);
        toast.success("Registration successfully")
      } else if (response.payload.message.response.status === 400) {
        setLoading(false);
        setMessageDisplay(response?.payload?.message?.response?.data?.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;

  useEffect(() => {
    setTimeout(() => {
      setMessageDisplay("");
      setSuccessMessage("");
    }, 5000);
  }, [messageDisplay, successMessage]);

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("First Name is required"),
    lastName: Yup.string().trim().required("Last Name is required"),
    userName: Yup.string().trim().required("User Name is required"),
    email: Yup.string().email("Email is invalid").trim().required("Email is required"),
    password: Yup.string().trim()
      .min(6, "Password must be 6 characters at minimum")
      .required("Password is required"),
  });

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div
                className="card"
                style={{ borderRadius: "1rem", height: "auto", backgroundColor:"#E5E3E4" }}
              >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://img.freepik.com/free-vector/revenue-concept-illustration_114360-2803.jpg?w=2000"
                      alt="login form"
                      className="img-fluid mt-4"
                      style={{
                        marginLeft: "50px",
                        borderRadius: "1rem 0 0 1rem",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <h2
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create Account
                      </h2>
                      {messageDisplay && (
                        <Alert variant="danger">{messageDisplay}</Alert>
                      )}
                      {successMessage && (
                        <Alert variant="success">{successMessage}</Alert>
                      )}
                      <Formik
                        initialValues={initialValues}
                        validationSchema={RegistrationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          handleRegister(values);
                          setSubmitting(false);
                        }}
                      >
                        {({ touched, errors, isSubmitting }) => (
                          <Form>
                            <div className="login-form-container">
                              <div className="login-register-form">
                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className={`form-control ${touched.firstName && errors.firstName
                                        ? "is-invalid"
                                        : ""
                                      }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="firstName"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className={`form-control ${touched.lastName && errors.lastName
                                        ? "is-invalid"
                                        : ""
                                      }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="lastName"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <div className="form-group">
                                  <Field
                                    type="text"
                                    name="userName"
                                    placeholder="User Name"
                                    className={`form-control ${touched.userName && errors.userName
                                        ? "is-invalid"
                                        : ""
                                      }`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    name="userName"
                                    className="invalid-feedback"
                                  />
                                </div>

                                <div className="form-group">
                                  <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className={`form-control ${touched.email && errors.email
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
                                <div className="from-control">
                                <div className="form-group d-flex ">
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
                           </div>
                           <ErrorMessage
                              component="div"
                              name="password"
                              className="invalid-feedback d-block"
                            />
                          </div>
                          

                                {/* <div className="form-group">
                                  <Field
                                    type="password"
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
                                  <ErrorMessage
                                    component="div"
                                    name="password"
                                    className="invalid-feedback"
                                  />
                                </div> */}

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
                                  {loading ? "" : "Sign Up"}
                                </button>
                                <p
                                  className="mb-5 pb-lg-2 mt-2"
                                  style={{ color: "#393f81" }}
                                >
                                  Already have an account?
                                  <Link
                                    to={process.env.PUBLIC_URL + "/sign-in"}
                                    style={{ paddingLeft: "5px" }}
                                  >
                                    Sign In
                                  </Link>
                                </p>
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
export default Registration;
