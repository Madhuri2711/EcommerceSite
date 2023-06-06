import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addNewCard } from "../../services/cards.service";
//import { useEffect } from "react";
import CreditCard from "./CreditCard";
import "./Form.scss";
import { phoneRegExp } from "../../helpers/helpers";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 0 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "970px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  large: {
    width: "100px !important",
    height: "100px !important",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "20px",
  },
}));

const PaymentCard = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [element, setElement] = useState();
  const [number, setNumber] = useState();
  const cvvInput = useRef();
  const handleTransition = (cardInner, numberItem) => {
    setElement(cardInner);
    setNumber(numberItem);
  };
  const turnFront = () => {
    element.current.classList.remove("cardInnerTransform");
  };
  const turnBack = () => {
    element.current.classList.add("cardInnerTransform");
  };

  const getSchema = Yup.object().shape({
    card_number: Yup.string()
      .min(16, "not less than 16")
      .matches(phoneRegExp, "Card number is not valid")
      .required("Card number is required."),
    card_holder_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Card holder name is required."),
    exp_month: Yup.string().required("Expiry Month is required."),
    exp_year: Yup.string().required("Expiry Year is required."),
    cvc: Yup.number()
      .min(100, "Must be exactly 3 digits")
      .max(999, "Must be exactly 3 digits")
      .required("CVV number is required."),
  });

  /*useEffect(() => {
    loadCard();
  }, []);

  const loadCard = async () => {
    const response = await getCardsList();
    console.log(response);
  };*/

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await addNewCard(values);
      if (response?.isSuccess) {
        setLoading(false);
        toast.success(response?.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Cards</Typography>
        <Formik
          initialValues={{
            card_number: "",
            exp_month: "",
            exp_year: "",
            cvc: "",
            card_holder_name: "",
          }}
          onSubmit={(values, formikBag) => {
            handleSubmit(values);
            formikBag.resetForm();
          }}
          validationSchema={getSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <CreditCard
                values={props.values}
                handleTransition={handleTransition}
              />
              <div className="form">
                <label className="label">Card Number</label>
                <Field
                  type="text"
                  onChange={props.handleChange}
                  onClick={turnFront}
                  onBlur={props.handleBlur}
                  value={props.values.card_number
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()}
                  name="card_number"
                  maxlength="19"
                  onKeyDown={(e) => {
                    console.log(e.which);
                    if (e.which !== "#")
                      number.current.classList.add("numberTransform");
                  }}
                  className={`form-control ${
                    props.touched.card_number && props.errors.card_number
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="card_number"
                  className="invalid-feedback"
                />
                <label className="label">Card Holder</label>
                <Field
                  type="text"
                  onChange={props.handleChange}
                  onClick={turnFront}
                  onBlur={props.handleBlur}
                  value={props.values.card_holder_name}
                  name="card_holder_name"
                  className={`form-control ${
                    props.touched.card_holder_name &&
                    props.errors.card_holder_name
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="card_holder_name"
                  className="invalid-feedback"
                />
                <div className="row">
                  <div className="column">
                    <label className="label">Expiration Date</label>
                    <div className="d-flex">
                      <select
                        type="text"
                        onChange={props.handleChange}
                        onClick={turnFront}
                        onBlur={props.handleBlur}
                        value={props.values.exp_month}
                        placeholder="Month"
                        name="exp_month"
                        className={`form-control ${
                          props.touched.exp_month && props.errors.exp_month
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="" disabled selected>
                          Month
                        </option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m, i) => (
                          <option value={m}>{m < 10 ? `0${m}` : m}</option>
                        ))}
                      </select>
                      <ErrorMessage
                        component="div"
                        name="exp_month"
                        className="invalid-feedback"
                      />

                      <select
                        type="text"
                        onChange={props.handleChange}
                        onClick={turnFront}
                        onBlur={props.handleBlur}
                        value={props.values.exp_year}
                        name="exp_year"
                        className={`form-control ${
                          props.touched.exp_year && props.errors.exp_year
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="" disabled selected>
                          Year
                        </option>
                        {[
                          2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
                          2031, 2032,
                        ].map((y, i) => (
                          <option value={y}>{y}</option>
                        ))}
                      </select>
                      <ErrorMessage
                        component="div"
                        name="exp_year"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>{" "}
                  <div className="column">
                    <label className="label">CVV</label>
                    <Field
                      type="number"
                      // ref={cvvInput}
                      onClick={turnBack}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.cvc}
                      name="cvc"
                      className={`form-control ${
                        props.touched.cvc && props.errors.cvc
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="cvc"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default PaymentCard;
