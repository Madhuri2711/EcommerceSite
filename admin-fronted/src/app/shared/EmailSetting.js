import axios from "axios";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { BASE_URL } from "../../lib/constant";
import * as Yup from "yup";
import MultipleValueTextInput from "react-multivalue-text-input";
import { Badge } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import CancelIcon from "@mui/icons-material/Cancel";

const useStyles = makeStyles((theme) => ({
  badge: {
    color: "white",
    backgroundColor: "secondary",
  },
}));

const EmailSetting = (props) => {
  const toEmailArray = props.emailList;
  const SEND_MAIL = `${BASE_URL}admin/admin-send-mail`;
  const [emailList, setEmailList] = useState([]);
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const styles = {
    label: { width: "7%", marginTop: "0.5rem", marginLeft: "15px" },
  };

  const addToArray = (allItems) => {
    setEmailList(allItems);
  };

  const sendMail = async (fields) => {
    const Info = {
      maillist: emailList,
      text: fields.subject,
      subject: fields.body,
    };
    try {
      setLoading(true);
      const data = await axios.post(SEND_MAIL, Info)
      .then((response)=>{
        console.log(response);
      }).catch((error) =>{
        console.log(error);
      })
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="card mt-2">
        <div className="card-header">
          <h2>Email Settings</h2>
        </div>
        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={{
              to: ["dsafsa@hmail.com", "fsdfsd@gmail.com"],
              cc: "",
              bcc: "",
              subject: "",
              body: "",
            }}
            validationSchema={Yup.object().shape({
              subject: Yup.string().required("subject is required"),
              body: Yup.string()
                .min(5, "Must be 5 characters")
                .required("Message-Body is required"),
            })}
            onSubmit={(fields) => {
              sendMail(fields);
            }}
            render={({
              errors,
              touched,
              values,
              handleChange,
              isSubmitting,
              handleSubmit,
            }) => (
              <Row className="i-am-centered">
                <div className="container">
                  <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                      <Col>
                        <div className="form-group">
                          <label style={styles.label} htmlFor="to">
                            To :
                          </label>
                          <MultipleValueTextInput
                            values={[toEmailArray]}
                            onItemAdded={(item, allItems) => {
                              console.log(allItems);
                              addToArray(allItems);
                            }}
                            onItemDeleted={(item, allItems) =>
                              console.log(`Items removed: ${item}`)
                            }
                            name="to"
                            type="email"
                            placeholder="Enter the Email-Address"
                            validate={validateEmail}
                            className={
                              "form-control" +
                              (errors.to && touched.to ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="item"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label style={styles.label} htmlFor="cc">
                            CC :
                          </label>
                          <Field
                            name="cc"
                            type="email"
                            value={values.cc}
                            onChange={handleChange}
                            // validate={validateEmail}
                            placeholder="Enter your partners gmail"
                            className={
                              "form-control" +
                              (errors.cc && touched.cc ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="cc"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label style={styles.label} htmlFor="bcc">
                            BCC :
                          </label>
                          <Field
                            name="bcc"
                            type="email"
                            value={values.bcc}
                            onChange={handleChange}
                            // validate={validateEmail}
                            className={
                              "form-control" +
                              (errors.bcc && touched.bcc ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="bcc"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label style={styles.label} htmlFor="subject">
                            Title :
                          </label>
                          <Field
                            name="subject"
                            type="text"
                            value={values.subject}
                            onChange={handleChange}
                            placeholder="Enter subject"
                            className={
                              "form-control" +
                              (errors.subject && touched.subject
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="subject"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label style={styles.label} htmlFor="body">
                            Body :
                          </label>
                          <Field
                            as="textarea"
                            rows="10"
                            name="body"
                            type="email"
                            value={values.body}
                            onChange={handleChange}
                            placeholder="Enter mail description here..."
                            className={
                              "form-control" +
                              (errors.body && touched.body ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="body"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group mt-3 text-right">
                          <button
                            type="submit"
                            className="btn btn-primary mr-2"
                          >
                            {isLoading && (
                              <span className="spinner-border spinner-border-sm mr-1"></span>
                            )}
                            Send
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Row>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSetting;
