import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { makeStyles } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { BASE_URL } from "../../lib/constant";

const theme = createTheme();

theme.typography.h2 = {
    fontSize: '1.1rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    '@media (min-width:280px) and (max-width:653px)': {
        fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

const useStyles = makeStyles(theme => ({
    backbutton: {
        left: '93%',
        bottom: '34px',
        position: 'relative',
        height: '25px',
        '@media (min-width:300px) and (max-width:600px)': {
            left: '82%',
            bottom: '26px',
            position: 'relative',
            height: '25px',
        },
        '@media (min-width:280px) and (max-width:600px)': {
            left: '70%',
            bottom: '26px',
            position: 'relative',
            height: '25px',
        }
    }
}))

const EditNews_Subscribers = () => {

    let { id } = useParams();
    let history = useHistory();
    const [isLoading, setLoading] = useState(false);

    const { formState } = useForm();
    const { isSubmitting } = formState;
    const [forminitialValues, setforminitialValues] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        loadNews_Subscriber();
    }, []);

    const loadNews_Subscriber = async () => {
        const response = await axios.get(`${BASE_URL}news-letter/${id}`)
            .then((response) => {
                setforminitialValues(response.data.data);
            })
            .catch((error) => console.log(error));
    }

    const submitData = async (fields) => {
        try {
            setLoading(true);
            const response = await axios.put(`${BASE_URL}news-letter/${id}`, fields);
            history.push("/news-subscriberslist");
        } catch (e) {
            console.log(e);
        }
    }

    const backbtn = () => {
        history.push("/news-subscriberslist");
    }

    return (
        <>
            <div className="container-xxl">
                <div className="card mt-4">
                    <div className="card-header">
                        <ThemeProvider theme={theme}>
                            <Typography variant="h2">News-Subscription</Typography>
                        </ThemeProvider>
                        <div
                            className={classes.backbutton}
                        >
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
                                email: Yup.string()
                                    .email('Email is invalid')
                                    .required('Email is required')
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
                                                        <label htmlFor="email">Email *</label>
                                                        <Field
                                                            name="email"
                                                            type="text"
                                                            placeholder="Enter Email"
                                                            className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
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
export default EditNews_Subscribers