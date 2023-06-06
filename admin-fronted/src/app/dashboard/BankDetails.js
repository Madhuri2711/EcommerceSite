import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../dashboard/listbasic-ui/icon.css";
import { useLocation } from "react-router-dom";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";

const BankDetails = () => {
  const location = useLocation();
  let { id } = useParams();
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [forminitialValues, setforminitialValues] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [amount, setAmount] = useState();
  const [paymentstatus, setStatus] = useState();
  const { state } = location;

  console.log(amount);

  useEffect(() => {
    console.log(state);
    setforminitialValues(state.checkout.bank_id);
    setAmount(state.checkout.amount);
    setStatus(state.checkout.is_payment_success_to_user);
  }, [location]);

  console.log(id);

  const updateStatus = () => {
    const value = {
      is_payment_success_to_user: true,
    };
    const response = axios.put(`${BASE_URL}payment/${id}`, value, {
      headers: { Authorization: `${TOKEN}` },
    });
    console.log(response);
    setShow(false);
  };

  const backbtn = () => {
    history.push("/payment_checkout");
  };

  return (
    <>
      <div className="container-xxl">
        <div className="card mt-4">
          <div className="card-header">
            <h2>Bank Details</h2>
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
              onSubmit={(fields) => {
                // handleData(fields);
              }}
              render={({
                errors,
                status,
                touched,
                handleChange,
                handleSubmit,
              }) => (
                <Row className="i-am-centered">
                  <div className="container">
                    <div className="row justify-content-md-center">
                      <div className="col col-lg-6">
                        <Form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="account_holder_name">
                              Account Holder Name *
                            </label>
                            <Field
                              name="account_holder_name"
                              type="text"
                              onChange={handleChange}
                              disabled={true}
                              className={
                                "form-control" +
                                (errors.account_holder_name &&
                                touched.account_holder_name
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="account_number">
                              Account_Number *
                            </label>
                            <Field
                              name="account_number"
                              disabled={true}
                              type="text"
                              onChange={handleChange}
                              className={
                                "form-control" +
                                (errors.account_number && touched.account_number
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="insitution_code">
                              Insitution_code *
                            </label>
                            <Field
                              name="insitution_code"
                              type="text"
                              disabled={true}
                              onChange={handleChange}
                              className={
                                "form-control" +
                                (errors.insitution_code &&
                                touched.insitution_code
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="transit_code">Transit_code *</label>
                            <Field
                              name="transit_code"
                              type="text"
                              disabled={true}
                              onChange={handleChange}
                              className={
                                "form-control" +
                                (errors.transit_code && touched.transit_code
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                          </div>
                          {/* <div className="form-group">
                            <Field
                              name="is_payment_success_to_user"
                              disabled={true}
                              type="hidden"
                              onChange={handleChange}
                              className={
                                "form-control" +
                                (errors.is_payment_success_to_user &&
                                touched.is_payment_success_to_user
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                          </div> */}
                          {
                            paymentstatus ? <div>{""}</div> :
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-primary mr-2"
                                onClick={handleShow}
                              >
                                Payment Checkout
                              </button>
                            </div>
                          }
                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Payment Checkout</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {`Are You Sure You Paid $${amount} to this User.`}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={updateStatus}>
                                Save
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Row>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default BankDetails;
