import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, ref, number } from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getBankDetail,
  postBankDetail,
} from "../../services/bankDetails.service";

const useStyles = makeStyles((theme) => ({
  saveBtn: {
    width: "150px",
    padding: "12px",
    color: "rgb(255, 255, 255)",
    borderRadius: "3px",
    fontSize: "16px",
    boxShadow: "none",
  },
  component: {
    padding: "30px 40px 30px 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "auto",
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
    // [theme.breakpoints.down("sm")]: {
    //   padding: "6px",
    // },
  },
}));

const BankDetails = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [bankDetail, setBankDetail] = useState();
  const [bankInitialvalues, setBankInitialvalues] = useState({
    account_holder_name: "",
    insitution_code: "",
    transit_code: "",
    account_number: "",
  });
  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      setLoading(true);
      const response = await postBankDetail(values);
      if (response.status === 200) {
        setLoading(false);
        userBankDetail();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const BankDetailsSchema = object().shape({
    account_holder_name: string()
      .trim()
      .min(6, "Minimum 6 characters required")
      .required("Account Holder Name  is required"),
    insitution_code: number()
      .positive()
      .min(6, "Minimum 6 characters required")
      .required("Institute Code is required"),
    transit_code: number()
      .positive()
      .min(6, "Minimum 6 characters required")
      .required("Transit Code is required"),
    account_number: number()
      .positive()
      .min(6, "Minimum 6 characters required")
      .required("Account Number is required"),
  });

  const userBankDetail = async () => {
    const response = await getBankDetail();
    setBankDetail(response?.data);
  };
  useEffect(() => {
    userBankDetail();
  }, []);

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Bank Details</Typography>
        <Formik
          enableReinitialize
          initialValues={bankDetail || bankInitialvalues}
          validationSchema={BankDetailsSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            handleSubmit(values);
            resetForm({ values: "" });
          }}
        >
          {({ touched, errors, isSubmitting, handleChange, values }) => (
            <Form>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="account_holder_name">
                      Account holder Name *
                    </label>
                    <Field
                      type="text"
                      name="account_holder_name"
                      placeholder="Account holder Name"
                      onChange={handleChange}
                      disabled={bankDetail ? true : false}
                      className={`form-control ${
                        touched.account_holder_name &&
                        errors.account_holder_name
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="account_holder_name"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="insitution_code">Institute Code *</label>
                    <Field
                      type="number"
                      name="insitution_code"
                      placeholder="Institute Code"
                      onChange={handleChange}
                      disabled={bankDetail ? true : false}
                      className={`form-control ${
                        touched.insitution_code && errors.insitution_code
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="insitution_code"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="transit_code">Transit Code *</label>
                    <Field
                      type="number"
                      name="transit_code"
                      placeholder="Transit Code"
                      onChange={handleChange}
                      disabled={bankDetail ? true : false}
                      className={`form-control ${
                        touched.transit_code && errors.transit_code
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="transit_code"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="account_number">Account Number *</label>
                    <Field
                      type="number"
                      name="account_number"
                      placeholder="Account Number"
                      onChange={handleChange}
                      disabled={bankDetail ? true : false}
                      className={`form-control ${
                        touched.account_number && errors.account_number
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="account_number"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                {bankDetail ? (
                  ""
                ) : (
                  <Col xs={3}>
                    <button
                      className="btn theme-btn btn-lg btn-block mt-20"
                      type="submit"
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      {loading ? "" : "Save"}
                    </button>
                  </Col>
                )}
              </Row>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default BankDetails;
