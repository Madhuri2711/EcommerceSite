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
import ReactS3 from 'react-s3';
import awsConfig from "../config/awsConfig";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BASE_URL } from "../../lib/constant";

const EditBlog = () => {

    let { id } = useParams();
    let history = useHistory();

    const [forminitialValues, setforminitialValues] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [otherselectedImage, setOtherImage] = useState();
    const [isLoading, setLoading] = useState(false);
    const [coverImageUrl, setCoverImageUrl] = useState();
    const [otherImageUrl, setOtherImageUrl] = useState();
    const [fileData, setfileData] = useState();
    const [image, setImage] = useState();

    const { formState } = useForm();
    const { isSubmitting } = formState;

    useEffect(() => {
        loadBlog();
    }, []);

    const [description, setDescription] = useState();
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    const [isError, setError] = useState(null);

    const handleImage = (event) => {
        let file = event.target.files[0];
        setfileData(file);
        setSelectedImage(event.target.files[0]);
    };

    const handleOtherImage = (event) => {
        let file = event.target.files[0];
        setImage(file);
        setOtherImage(event.target.files[0]);
    };

    const loadBlog = async () => {
        try {
            const response = await axios.get(`${BASE_URL}blogs/${id}`);
            setforminitialValues(response.data.data);
            let editorStateForDescription = EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(response.data.data?.description)
                ));
            setDescription(editorStateForDescription);
            setCoverImageUrl(response.data.data?.coverImage);
            setOtherImageUrl(response.data.data?.otherImage);
        } catch (e) {
            console.log(e);
        }
    }

    const submitData = async (fields) => {
        try {
            setLoading(true);

            if (fileData) {
                const requestOne = await ReactS3.uploadFile(fileData, awsConfig);
                var coverImage = requestOne?.location;
                fields.coverImage = coverImage;
            }

            if (image) {
                const requestTwo = await ReactS3.uploadFile(image, awsConfig);
                var otherImage = requestTwo?.location;
                fields.otherImage = otherImage;
            }

            if (description) {
                fields.description = draftToHtml(convertToRaw(description.getCurrentContent()));
            }

            const response = await axios.put(`${BASE_URL}blog/${id}`, fields);

            history.push("/bloglist");

        } catch (e) {
            console.log(e);
        }
    }

    const backbtn = () => {
        history.push("/bloglist");
    }

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 50,
        },
        preview: {
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
        },
        coverimage: { maxWidth: "30%", maxHeight: 135, borderRadius: '10px 50px 10px' },
        otherimage: { maxWidth: "30%", maxHeight: 135, borderRadius: '10px 50px 10px' },
        delete: {
            cursor: "pointer",
            padding: 2,
            maxWidth: "35%",
            background: "red",
            color: "white",
            border: "none",
        },
    };

    return (
        <>
            <div className="container-xxl">
                <div className="card mt-4">
                    <div className="card-header">
                        <h2>Blogs</h2>
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
                                title: Yup.string()
                                    .min(3, "Must be 3 characters")
                                    .required('Blog Title is required')
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
                                                        <label htmlFor="title">Title *</label>
                                                        <Field
                                                            name="title"
                                                            type="text"
                                                            placeholder="Enter Blog Title"
                                                            className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="description">Description *</label>
                                                        <Editor
                                                            editorState={description}
                                                            wrapperClassName="wrapper-class"
                                                            editorClassName="editor-class"
                                                            toolbarClassName="toolbar-class"
                                                            onEditorStateChange={onEditorStateChange}
                                                        />
                                                    </div>
                                                    <div style={styles.preview}>
                                                        <img
                                                            src={(selectedImage) ? URL.createObjectURL(selectedImage) : coverImageUrl}
                                                            style={styles.coverimage}
                                                            alt="coverimage"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="coverImage">Cover Image *</label>
                                                        <Field
                                                            name="coverimage"
                                                            type="file"
                                                            onChange={handleImage}
                                                            accept="image/png, image/gif, image/jpeg" className={'form-control' + (errors.coverimage && touched.coverimage ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="coverImage" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div style={styles.preview}>
                                                        <img
                                                            src={(otherselectedImage) ? URL.createObjectURL(otherselectedImage) : otherImageUrl}
                                                            style={styles.otherimage}
                                                            alt="otherimage"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="otherImage">Other Image *</label>
                                                        <Field
                                                            name="otherimage"
                                                            type="file"
                                                            onChange={handleOtherImage}
                                                            accept="image/png, image/gif, image/jpeg" className={'form-control' + (errors.otherimage && touched.otherimage ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="otherImage" component="div" className="invalid-feedback" />
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
export default EditBlog