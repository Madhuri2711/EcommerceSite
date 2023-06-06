import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../dashboard/listbasic-ui/icon.css';
import { BASE_URL } from "../../lib/constant";

const Custom_Content = () => {

    const CUSTOM_CONTENT_API = `${BASE_URL}custom-setting/62079815e45ed20b69db5493`;
    const [formdata, setformdata] = useState();

    useEffect(() => {
        loadcustomdata();
    }, []);

    const loadcustomdata = async () => {
        const response = await axios.get(CUSTOM_CONTENT_API)
            .then((response) => {
                setformdata(response.data.data);
            })
            .catch((error) => { console.log(error); })
    }

    const submitData = async (fields) => {
        try {
            const response = await axios.put(`${BASE_URL}custom-setting/62079815e45ed20b69db5493`, fields);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={formdata}
                validationSchema={Yup.object().shape({
                    landingTitle: Yup.string().required('LandingTitle is required'),
                    landingDescription: Yup.string().required('LandingDescription is required')
                        .min(15, "Must be 15 characters"),
                    productDescription: Yup.string().required('ProductDescription is required')
                        .min(20, 'Description must have at least 20 characters'),
                    productCEOText: Yup.string().required('CEOText is required'),
                    productCEONameText: Yup.string().required('CEONameText is required'),
                    downloadAppTitle: Yup.string().required('downloadAppTitle is required'),
                    downloadAppInfo: Yup.string().required('downloadAppInfo is required'),
                    stepOneTitle: Yup.string().required('stepOneTitle is required'),
                    stepOneInfo: Yup.string().required('stepOneInfo is required'),
                    stepTwoTitle: Yup.string().required('stepTwoTitle is required'),
                    stepTwoInfo: Yup.string().required('stepTwoInfo is required'),
                    stepThreeTitle: Yup.string().required('stepThreeTitle is required'),
                    stepThreeInfo: Yup.string().required('stepThreeInfo is required'),
                    howItworksTitle: Yup.string().required('howItworksTitle is required'),
                    SellerTitle: Yup.string().required('SellerTitle is required'),
                    SellerStepsInfo: Yup.array().required('SellerStepsInfo is required'),
                    BuyerTitle: Yup.string().required('BuyerTitle is required'),
                    BuyerStepsInfo: Yup.array().required('BuyerStepsInfo is required'),
                    // contactUsTitle: Yup.string().required('ContactUsTitle is required'),
                    getInTouchTitle: Yup.string().required('GetInTouchTitle is required'),
                    contactUsInfo: Yup.string().required('NewsLetterTitle is required')

                })}
                onSubmit={fields => {
                    submitData(fields);
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="container-xxl">
                            <div className="card mt-4">
                                <div className="card-header">
                                    <h1>Custom-Content</h1>
                                    <div className="updatebtn">
                                        <button type="submit" className="btn btn-primary mr-2">
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="landingTitle">LandingTitle *</label>
                                                <Field
                                                    name="landingTitle"
                                                    type="text"
                                                    placeholder="Enter LandingTitle"
                                                    className={'form-control' + (errors.landingTitle && touched.landingTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="landingTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="landingDescription">Landing Description *</label>
                                                <Field
                                                    component="textarea"
                                                    placeholder="Enter Landing-Description"
                                                    rows="4"
                                                    cols="20"
                                                    id="landingDescription"
                                                    name="landingDescription"
                                                    variant="outlined"
                                                    className={'form-control' + (errors.landingDescription && touched.landingDescription ? ' is-invalid' : '')}
                                                />
                                                <ErrorMessage name="landingDescription" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        {/* <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="getStartedButtonText">GetStartedButtonText *</label>
                                                <Field
                                                    name="getStartedButtonText"
                                                    type="text"
                                                    placeholder="Enter GetStartedButtonText"
                                                    className={'form-control' + (errors.getStartedButtonText && touched.getStartedButtonText ? ' is-invalid' : '')} />
                                                <ErrorMessage name="getStartedButtonText" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col> */}
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="productDescription">Product Description *</label>
                                                <Field
                                                    component="textarea"
                                                    placeholder="Enter Product Description"
                                                    rows="4"
                                                    cols="20"
                                                    id="productDescription"
                                                    name="productDescription"
                                                    variant="outlined"
                                                    className={'form-control' + (errors.productDescription && touched.productDescription ? ' is-invalid' : '')} />
                                                <ErrorMessage name="productDescription" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="productCEOText">ProductCEOText *</label>
                                                <Field
                                                    name="productCEOText"
                                                    type="text"
                                                    placeholder="Enter ProductCEOText"
                                                    className={'form-control' + (errors.productCEOText && touched.productCEOText ? ' is-invalid' : '')} />
                                                <ErrorMessage name="productCEOText" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="productCEONameText">ProductCEONameText *</label>
                                                <Field
                                                    name="productCEONameText"
                                                    type="text"
                                                    placeholder="Enter ProductCEONameText"
                                                    className={'form-control' + (errors.productCEONameText && touched.productCEONameText ? ' is-invalid' : '')} />
                                                <ErrorMessage name="productCEONameText" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="downloadAppTitle">DownloadAppTitle *</label>
                                                <Field
                                                    name="downloadAppTitle"
                                                    type="text"
                                                    placeholder="Enter DownloadAppTitle"
                                                    className={'form-control' + (errors.downloadAppTitle && touched.downloadAppTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="downloadAppTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="downloadAppInfo">DownloadAppInfo *</label>
                                                <Field
                                                    name="downloadAppInfo"
                                                    type="text"
                                                    placeholder="Enter DownloadAppInfo"
                                                    className={'form-control' + (errors.downloadAppInfo && touched.downloadAppInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="downloadAppInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="stepOneTitle">stepOneTitle *</label>
                                                <Field
                                                    name="stepOneTitle"
                                                    type="text"
                                                    placeholder="Enter stepOneTitle"
                                                    className={'form-control' + (errors.stepOneTitle && touched.stepOneTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="stepOneTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="stepOneInfo">stepOneInfo *</label>
                                                <Field
                                                    name="stepOneInfo"
                                                    type="text"
                                                    placeholder="Enter stepOneInfo"
                                                    className={'form-control' + (errors.stepOneInfo && touched.stepOneInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="stepOneInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="stepTwoTitle">stepTwoTitle *</label>
                                                <Field
                                                    name="stepTwoTitle"
                                                    type="text"
                                                    placeholder="Enter stepTwoTitle"
                                                    className={'form-control' + (errors.stepTwoTitle && touched.stepTwoTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="stepTwoTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="stepTwoInfo">stepTwoInfo *</label>
                                                <Field
                                                    name="stepTwoInfo"
                                                    type="text"
                                                    placeholder="Enter stepTwoInfo"
                                                    className={'form-control' + (errors.stepTwoInfo && touched.stepTwoInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="stepTwoInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="stepThreeTitle">stepThreeTitle *</label>
                                                <Field
                                                    name="stepThreeTitle"
                                                    type="text"
                                                    placeholder="Enter stepThreeTitle"
                                                    className={'form-control' + (errors.stepThreeTitle && touched.stepThreeTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="stepThreeTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="stepThreeInfo">stepThreeInfo *</label>
                                                <Field
                                                    name="stepThreeInfo"
                                                    type="text"
                                                    placeholder="Enter stepThreeInfo"
                                                    className={'form-control' + (errors.stepThreeInfo && touched.stepThreeInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="stepThreeInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="howItworksTitle">howItworksTitle *</label>
                                                <Field
                                                    name="howItworksTitle"
                                                    type="text"
                                                    placeholder="Enter howItworksTitle"
                                                    className={'form-control' + (errors.howItworksTitle && touched.howItworksTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="howItworksTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="SellerTitle">SellerTitle *</label>
                                                <Field
                                                    name="SellerTitle"
                                                    type="text"
                                                    placeholder="Enter SellerTitle"
                                                    className={'form-control' + (errors.SellerTitle && touched.SellerTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="SellerTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="SellerStepsInfo">SellerStepsInfo *</label>
                                                <Field
                                                    name="SellerStepsInfo"
                                                    //type="text"
                                                    as='textarea'
                                                    rows={5}
                                                    placeholder="Enter SellerStepsInfo"
                                                    className={'form-control' + (errors.SellerStepsInfo && touched.SellerStepsInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="SellerStepsInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="BuyerTitle">BuyerTitle *</label>
                                                <Field
                                                    name="BuyerTitle"
                                                    type="text"
                                                    placeholder="Enter BuyerTitle"
                                                    className={'form-control' + (errors.BuyerTitle && touched.BuyerTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="BuyerTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="BuyerStepsInfo">BuyerStepsInfo *</label>
                                                <Field
                                                    name="BuyerStepsInfo"
                                                    //type="text"
                                                    as='textarea'
                                                    rows={5}
                                                    placeholder="Enter BuyerStepsInfo"
                                                    className={'form-control' + (errors.BuyerStepsInfo && touched.BuyerStepsInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="BuyerStepsInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="contactUsTitle">contactUsTitle *</label>
                                                <Field
                                                    name="contactUsTitle"
                                                    type="text"
                                                    placeholder="Enter contactUsTitle"
                                                    className={'form-control' + (errors.contactUsTitle && touched.contactUsTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="contactUsTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="getInTouchTitle">getInTouchTitle *</label>
                                                <Field
                                                    name="getInTouchTitle"
                                                    type="text"
                                                    placeholder="Enter getInTouchTitle"
                                                    className={'form-control' + (errors.getInTouchTitle && touched.getInTouchTitle ? ' is-invalid' : '')} />
                                                <ErrorMessage name="getInTouchTitle" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                        <Col className="col col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="contactUsInfo">NewsLetterTitle *</label>
                                                <Field
                                                    name="contactUsInfo"
                                                    type="text"
                                                    placeholder="Enter NewsLetterTitle"
                                                    className={'form-control' + (errors.contactUsInfo && touched.contactUsInfo ? ' is-invalid' : '')} />
                                                <ErrorMessage name="contactUsInfo" component="div" className="invalid-feedback" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            />
        </>
    )
}
export default Custom_Content