import axios from "axios";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import '../dashboard/listbasic-ui/icon.css';
import { BASE_URL } from "../../lib/constant";

const Inquiry = () => {

    const INQUIRY_API = `${BASE_URL}contact-us`;

    let history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const { formState } = useForm();
    const { isSubmitting } = formState;

    const submitData = async (fields) => {
        try {
            setLoading(true);
            const response = await axios.post(INQUIRY_API, fields)
                .then((response) => {
                    history.push("/inquirylist");
                })
        } catch (e) {
            console.log(e);
        }
    }

    const backbtn = () => {
        history.push("/inquirylist");
    }

    return (
        <>
            <div className="container-xxl">
                <div className="card mt-4">
                    <div className="card-header">
                        <h2>Inquiry</h2>
                        <div className="backbutton">
                            <Button
                                variant="primary"
                                onClick={backbtn}
                            >
                                Back
                            </Button>
                        </div>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                message: ''
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string()
                                    .min(2, 'Too Short!')
                                    .max(40, 'Too Long!')
                                    .required('Name is required'),
                                email: Yup.string()
                                    .email('Email is invalid')
                                    .required('Email is required'),
                                message: Yup.string()
                                    .min(15, "Must be 15 characters")
                                    .required('Message is required')
                            })}
                            onSubmit={fields => {
                                submitData(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Row className="i-am-centered">
                                    <div className="container">
                                        <div className="row justify-content-md-center">
                                            <div className="col col-lg-6">
                                                <Form>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Name *</label>
                                                        <Field
                                                            name="name"
                                                            type="text"
                                                            placeholder="Enter Name"
                                                            className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email *</label>
                                                        <Field
                                                            name="email"
                                                            type="text"
                                                            placeholder="Enter Email"
                                                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message">Message *</label>
                                                        <Field
                                                            component="textarea"
                                                            placeholder="Enter Message"
                                                            rows="4"
                                                            cols="20"
                                                            id="message"
                                                            name="message"
                                                            variant="outlined"
                                                            label="Message Description"
                                                            className={'form-control' + (errors.message && touched.message ? ' is-invalid' : '')}
                                                        />
                                                        <ErrorMessage name="message" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary mr-2"
                                                            disabled={isSubmitting} >
                                                            {
                                                                isLoading &&
                                                                <span className="spinner-border spinner-border-sm mr-1">
                                                                </span>
                                                            }
                                                            Submit
                                                        </button>
                                                        <button type="reset" className="btn btn-secondary ms-2">Reset</button>
                                                    </div>
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
    )
}
export default Inquiry
// fas fa-spinner fa-spin