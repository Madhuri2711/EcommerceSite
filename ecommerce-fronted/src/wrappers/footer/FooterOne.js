import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import FooterCopyright from "../../components/footer/FooterCopyright";
import '../../assets/css/footer.css';
//import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { newsletter } from "../../services/newsletter.service";
import swal from 'sweetalert';
//import { api } from "../../utility/interceptor";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
  newsLetter
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const [error, setError] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });

  const handleSubmit = (values) => {
    (newsletter({ email: values.email })).catch(
      (error) => {
        return error;
      }
    );
  };

  const emailRef = useRef()

  const [email, setEmail] = useState('')

  const newsLetterSubHandler = async (e) => {
    e.preventDefault()
    if (email === null || email.trim() === "") {
      console.warn("empty email");
      swal('Empty Email', `You haven't Entered email, Please Enter Email`, 'warning', {
        buttons: {
          cancel: 'Cancel',
          catch: "Okay"
        }
      }).then(value => emailRef.current.focus())
    } else if (!(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) {
      swal('Invalid Email', `Please Enter Valid Email`, 'error', {
        dangerMode: true,
        buttons: true,
      }).then(value => emailRef.current.focus())
    } else {
      const emailObj = { email }
      try {
        const result = await newsletter(emailObj)
        if (result?.isSuccess) {
          swal('Congartulations!', `You've become our subscriber, get daily updates `, 'success', {
            button: "Okay!"
          });
          setEmail('')
          // toast.success(`News Subscription added successfully. Please check your email`, {
          //     position: toast.POSITION.TOP_CENTER,
          //     autoClose: 3000,
          //     transition: Slide,
          // });
        }

      } catch (error) {
        return error
        // console.log(first)

      }
    }
  }
  return (
    <footer
      className={`footer-area ${backgroundColorClass ? backgroundColorClass : ""
        } ${extraFooterClass ? extraFooterClass : ""} ${spaceLeftClass ? spaceLeftClass : ""
        } `}
    >
      <div className={`${containerClass ? containerClass : "container"} pt-70 pb-70`}>
        <div className="footer-div">
          <div className='footer-content'>
            <Row className='fooetr-header'>
              <Col className='footer-h2'>
                <h2 className='col-md-6 col-xl-4 sm-8 mx-auto'>
                  {newsLetter?.contactUsInfo || 'Get Our Weekly Newsletter'}</h2>
              </Col>
            </Row>
            <form onSubmit={newsLetterSubHandler}>
              <Row md={6} className='footer-email-input justify-content-center mx-auto align-items-center mb-5'>
                <Col xl={4} sm={8} md={6}>
                  <input type='text' id='news-email' placeholder='Enter email address'
                    ref={emailRef}
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </Col>
                <Col className='footer-sub-btn'>
                  <button type='submit' className='subscribe-btn'>
                    SUBSCRIBE
                  </button>
                </Col>
              </Row>
            </form>
            {/* <Formik
              initialValues={{ email: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                handleSubmit(values);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form >
                  <Row md={6} className='footer-email-input justify-content-center mx-auto align-items-center mb-2'>
                    <Col xl={4} sm={8}>
                      <div className="form-group news-letter-form">
                        <Field
                          type="text"
                          name="email"
                          id='news-email'
                          placeholder="Enter email address"
                          style={{ height: '39px', fontSize: '15px' }}
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
                    <Col className='footer-sub-btn'>
                      <button type='submit' className='subscribe-btn'>
                        SUBSCRIBE
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik> */}
          </div>
        </div>
        <div className="row">
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-3 col-sm-6 col-md-6"
              }`}
          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30 ml-95"
                : "footer-widget mb-30 ml-50"
                }`}
            >
              <div className="footer-title">
                <h3>USEFUL LINKS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href='/products'>Products</a>
                  </li>
                  <li>
                    <Link to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link to='/sign-in'>Sign In</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-3 col-sm-6 col-md-6"
              }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>ABOUT US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href='/faq'>FAQ</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact Us</a>
                  </li>
                  <li>
                    <Link to="/privacy-policy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to='/terms-and-conditions'>Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-3 col-sm-6 col-md-6"
              }`}
          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30 ml-145"
                : "footer-widget mb-30 ml-75"
                }`}
            >
              <div className="footer-title">
                <h3>FOLLOW US</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/inanicanada/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/INANICANADA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/inanicanada/?utm_medium=copy_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/inani-clothing-and-lifestyle-reseller/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-3 col-sm-6 col-md-6"
              }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="data:image/png;base64,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"
              spaceBottomClass="mb-30"
            />
          </div>
          {/* <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
            }`}
          > */}
          {/* footer newsletter */}
          {/* <FooterNewsletter
              spaceBottomClass="mb-30"
              spaceLeftClass="ml-70"
              sideMenu={sideMenu}
            />
          </div> */}
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterOne;
