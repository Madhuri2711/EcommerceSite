import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../../assets/css/form.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import FooterOne from '../../wrappers/footer/FooterOne';
import HeaderOne from '../../wrappers/header/HeaderOne';
import { object, string, ref } from "yup";
import { postContactUs } from '../../services/ContactUs.services';
import HeaderImage from '../../components/HeaderImage';

export default function ContactUs({ contactUSData }) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values) => {
        const contactUs = {
            name: values.name,
            email: values.email,
            message: values.message,
        };
        try {
            setLoading(true)
            const response = await postContactUs(contactUs)
            console.log(response);
            if (response.status === 200) {
                setLoading(false)

            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    };

    const ContactDetailsSchema = object().shape({
        name: string().trim()
            .min(6, "Minimum 6 characters required")
            .required("Full Name is required"),
        email: string().trim()
            .min(6, "Minimum 6 characters required")
            .required("Email  is required"),
        message: string().trim()
            .min(6, "Minimum 6 characters required")
            .required("Message  is required"),
    });

    return (
        <>
            <HeaderOne />
            <HeaderImage pageTitle='Contact Us'/>
            <div className='container faq-container p-2 form-container'>
                <Row>
                    <Col lg={6} sm={12}>
                        <img className='form-img' src={require('../../assets/img/ceosection/form-img.png')} alt='form-img' />
                        <img className='form-mobile-img' src={require('../../assets/img/ceosection/form-mobile-img.png')} alt='form-img' />
                    </Col>
                    <Col lg={6} sm={12} className='mx-auto my-auto contact-form'>
                        <h3>{contactUSData?.getInTouchTitle || "Get in touch"}</h3>
                        <p>{contactUSData?.contactUsTitle || ""} </p>
                        <Formik
                            initialValues={{ name: "", email: "", message: "" }}
                            validationSchema={ContactDetailsSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setSubmitting(false);
                                handleSubmit(values);
                                resetForm({ values: "" })
                            }}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form>
                                    <Row>
                                        <Col>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    id='name'
                                                    name="name"
                                                    placeholder="Your Full Name"
                                                    className={`form-control ${touched.name && errors.name
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="name"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="form-group">
                                                <Field
                                                    type="email"
                                                    id='email'
                                                    name="email"
                                                    placeholder="Your Email"
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
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    component="textarea"

                                                    rows="4"
                                                    cols="20"
                                                    id="address"
                                                    name="message"
                                                    placeholder="Message"
                                                    className={`form-control ${touched.message && errors.message
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="message"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={3}>
                                            <button
                                                id='form-submit-btn'
                                                type="submit"
                                            >
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                {loading ? "" : "Send"}
                                            </button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </div>
            <FooterOne
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
        </>
    );
}
