import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import '../dashboard/listbasic-ui/icon.css';
import { BASE_URL } from "../../lib/constant";

const EditFaq = () => {

    let { id } = useParams();
    let history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const { formState } = useForm();
    const { isSubmitting } = formState;

    const [forminitialValues, setforminitialValues] = useState([]);

    useEffect(() => {
        loadFaquestion();
    }, []);

    const loadFaquestion = async () => {
        const response = await axios.get(`${BASE_URL}faq/${id}`)
            .then((response) => {
                setforminitialValues(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    const submitData = async (fields) => {
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}faq/${id}`, fields);
            history.push("/faqlist");
        } catch (e) {
            console.log(e);
        }
    }

    const backbtn = () => {
        history.push("/faqlist");
    }

    return (
        <>
            <div className="container-xxl">
                <div className="card mt-4">
                    <div className="card-header">
                        <h2>FAQ</h2>
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
                            enableReinitialize
                            initialValues={forminitialValues}
                            validationSchema={Yup.object().shape({
                                question: Yup.string()
                                    .min(5, "Must be 5 characters")
                                    .required('Question is required'),
                                answer: Yup.string()
                                    .min(15, "Must be 15 characters")
                                    .required('Answer is required')
                            })}
                            onSubmit={fields => {
                                submitData(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Row className="i-am-centered">
                                    <div className="container">
                                        <div className="row justify-content-md-center">
                                            <div className="col">
                                                <Form>
                                                    <div className="form-group">
                                                        <label htmlFor="question">Question *</label>
                                                        <Field
                                                            name="question"
                                                            type="text"
                                                            placeholder="Enter Quesion"
                                                            className={'form-control' + (errors.question && touched.question ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="question" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="answer">Answer *</label>
                                                        <Field
                                                            component="textarea"
                                                            placeholder="Enter Answer"
                                                            rows="4"
                                                            cols="20"
                                                            id="answer"
                                                            name="answer"
                                                            variant="outlined"
                                                            label="Answer Description"
                                                            className={'form-control' + (errors.answer && touched.answer ? ' is-invalid' : '')}
                                                        />
                                                        <ErrorMessage name="answer" component="div" className="invalid-feedback" />
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
                                                            Update
                                                        </button>
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
export default EditFaq