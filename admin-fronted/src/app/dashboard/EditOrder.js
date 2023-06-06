import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "../dashboard/listbasic-ui/icon.css";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const EditOrder = () => {
  const location = useLocation();
  let { id } = useParams();
  console.log(id);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const { formState } = useForm();
  const { isSubmitting } = formState;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [forminitialValues, setforminitialValues] = useState();
  const UPDATE_ORDER = `https://admin-dashboard.inanihub.com/api/v1/order/${id}`;
  const { state } = location;

  useEffect(() => {
    setforminitialValues(state.orders.address);
  }, [location]);

  const handleData = async (fields) => {
    console.log(fields);
    let addressBody = {
      address: fields,
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `https://admin-dashboard.inanihub.com/api/v1/order/${id}`,
        addressBody,
        {
          headers: { Authorization: `${TOKEN}`},
        }
      );
      history.push("/orders");
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const backbtn = () => {
    history.push("/orders");
  };

  const RESEND_SHIPPING_DETAILS = `${BASE_URL}order/resend-label/${id}`;

  const generateShippingInfo = async () => {
    try {
      const { data } = await axios.get(RESEND_SHIPPING_DETAILS, {
        headers: { Authorization: `${TOKEN}` },
      });
      history.push("/orders");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container-xxl">
        <div className="card mt-4">
          <div className="card-header">
            <h2>Order</h2>
            <div className="backbutton">
              <Button variant="primary" onClick={backbtn}>
                Back
              </Button>
            </div>
          </div>
          <div className="card-body">
            <Formik
              enableReinitialize
              initialValues={forminitialValues}
              validationSchema={Yup.object().shape({
                first_name: Yup.string()
                  .min(2, "Too Short!")
                  .max(40, "Too Long!")
                  .required("First Name is required"),
                last_name: Yup.string()
                  .min(2, "Too Short!")
                  .max(40, "Too Long!")
                  .matches(
                    /^[aA-zZ\s]+$/,
                    "Only alphabets are allowed for this field "
                  )
                  .required("Last Name is required"),
                city: Yup.string().required("City is required"),
                country: Yup.string()
                  .min(2, "Too Short!")
                  .max(40, "Too Long!")
                  .required("Country is required"),
                state: Yup.string().required("State is required"),
                state_code: Yup.string().required("State Code is required"),
                address: Yup.string()
                  .min(5, "Must be 5 characters")
                  .required("Message is required"),
                phone_number: Yup.string()
                  .matches(phoneRegExp, "Phone number is not valid")
                  .required("Phone Number is required"),
                postal_code: Yup.string().required("Postal Code is required"),
                country_code: Yup.string().required("Country Code is required"),
              })}
              onSubmit={(fields) => {
                setTimeout(() => {
                  handleData(fields);
                }, 400);
              }}
              render={({
                errors,
                status,
                touched,
                handleSubmit,
                handleChange,
              }) => (
                <Container className="i-am-centered">
                  <div className="container m-2">
                    <div className="row justify-content-md-center">
                      <div className="col">
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="first_name">First_name *</label>
                                <Field
                                  name="first_name"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter First Name"
                                  className={
                                    "form-control" +
                                    (errors.first_name && touched.first_name
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="first_name"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="last_name">Last Name *</label>
                                <Field
                                  name="last_name"
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="Enter Last Name"
                                  className={
                                    "form-control" +
                                    (errors.last_name && touched.last_name
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="last_name"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="city">City *</label>
                                <Field
                                  name="city"
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="Enter City"
                                  className={
                                    "form-control" +
                                    (errors.city && touched.city
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="country">Country *</label>
                                <Field
                                  name="country"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter Country"
                                  className={
                                    "form-control" +
                                    (errors.country && touched.country
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="country"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="address">Address *</label>
                                <Field
                                  component="textarea"
                                  onChange={handleChange}
                                  placeholder="Enter Address"
                                  rows="4"
                                  cols="20"
                                  id="address"
                                  name="address"
                                  variant="oued"
                                  label="Message Description"
                                  className={
                                    "form-control" +
                                    (errors.address && touched.address
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="address"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="form-group">
                                <label htmlFor="country_code">
                                  Country_Code *
                                </label>
                                <Field
                                  name="country_code"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter Country"
                                  className={
                                    "form-control" +
                                    (errors.country_code && touched.country_code
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="country_code"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="phone_number">
                                  Phone Number *
                                </label>
                                <Field
                                  name="phone_number"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter Phone Number"
                                  className={
                                    "form-control" +
                                    (errors.phone_number && touched.phone_number
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="phone_number"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="postal_code">
                                  Postal Code *
                                </label>
                                <Field
                                  name="postal_code"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter Postal Code"
                                  className={
                                    "form-control" +
                                    (errors.postal_code && touched.postal_code
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="postal_code"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="state">State *</label>
                                <Field
                                  name="state"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter State"
                                  className={
                                    "form-control" +
                                    (errors.state && touched.state
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="state"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="state_code">State_code *</label>
                                <Field
                                  name="state_code"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Enter Postal Code"
                                  className={
                                    "form-control" +
                                    (errors.state_code && touched.state_code
                                      ? " is-invalid"
                                      : "")
                                  }
                                />
                                <ErrorMessage
                                  name="state_code"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-primary mr-2"
                              disabled={isSubmitting}
                            >
                              {isLoading && (
                                <span className="spinner-border spinner-border-sm mr-1"></span>
                              )}
                              Save
                            </button>
                            <button
                              type="submit"
                              className="btn btn-secondary ms-2"
                              onClick={generateShippingInfo}
                            >
                              Generate Shipping Detail
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Container>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditOrder;
