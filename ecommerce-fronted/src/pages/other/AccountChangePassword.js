import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref } from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { changePasswordRequest } from "../../services/auth.service";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(() => ({
  saveBtn: {
    width: "150px",
    padding: "12px",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    fontSize: "16px",
    boxShadow: "none",
  },
  component: {
    padding: "30px 40px 0 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "500px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  form: {
    display: "flex",
    alignItems: "flex-start",
    margin: "20px 0",
  },
  input: {
    width: "270px",
    fontSize: "14px",
    outline: "none",
    borderRadius: "2px",
    boxShadow: "none",
    marginRight: 10,
  },
  formcontrolwidth: {
    width: "100%",
  },
}));

const AccountChangePassword = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const eye = <FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash} />;

  const logOut = useCallback(() => {
    window.location.reload(false);
    dispatch(logout());
  }, [dispatch]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const changePassword = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const res = await changePasswordRequest(changePassword);
      if (res?.status === 200 && res?.data?.isSuccess) {
        setLoading(false);
        toast.success(res?.data?.message);
        logOut();
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const ChangePasswordSchema = object().shape({
    oldPassword: string()
      .trim()
      .min(6, "Minimum 6 characters required")
      .required("Old Password is required"),
    newPassword: string()
      .trim()
      .min(6, "Minimum 6 characters required")
      .required("New Password is required"),
    confirmPassword: string()
      .trim()
      .required("Please Confirm your password")
      .oneOf([ref("newPassword")], "Passwords do not match"),
  });

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Change Password</Typography>
        <Formik
          initialValues={{ oldPassword: "", newPassword: "" , confirmPassword: ""}}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmit(values);
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old Password *</label>
                    <Field
                      type="password"
                      name="oldPassword"
                      placeholder="Old Password"
                      className={`form-control ${touched.oldPassword && errors.oldPassword
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="oldPassword"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password *</label>
                    <Field
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      className={`form-control ${touched.newPassword && errors.newPassword
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="newPassword"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="d-flex">
                    <Field
                      type={passwordShown ? "text" : "password"}
                      name="confirmPassword"
                      // style={{ marginBottom: "1rem" }}
                      placeholder="Confirm Password"
                      className={`form-control ${touched.confirmPassword && errors.confirmPassword
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <i className="eyeicon" onClick={togglePasswordVisiblity}>
                      {eye}
                    </i>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="error-msg">{errors.confirmPassword}</p>
                  )}


                  {/* <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className="invalid-feedback"
                  /> */}
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={4} lg={3}>
                  <button
                    className="btn btn-lg btn-block theme-btn mt-2"
                    type="submit"
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mb-1"></span>
                    )}
                    {loading ? "" : "Save"}
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default AccountChangePassword;
