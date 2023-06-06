import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import awsConfig from '../../config/awsConfig'
// import {
//   getUserProfile,
//   updateUserProfile,
// } from '../../services/profile.service'
import ReactS3 from 'react-s3'
//import { IMG_URL } from '../../lib/constant'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails, updateUser } from '../../slices/user.details'
import Spinner from 'react-bootstrap/Spinner'
//import { useToasts } from 'react-toast-notifications'
import toast from 'react-hot-toast'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const useStyles = makeStyles((theme) => ({
  saveBtn: {
    width: '150px',
    padding: '12px',
    color: 'rgb(255, 255, 255)',
    borderRadius: '3px',
    fontSize: '16px',
    boxShadow: 'none',
  },
  component: {
    padding: '30px 40px 30px 40px',
    background: '#fff',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
    border: '1px #fff',
    height: 'auto',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600 !important',
    paddingRight: '24px',
    display: 'inline-block',
    paddingBottom: '25px',
  },
  form: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '20px 0',
  },
  input: {
    width: '270px',
    fontSize: '14px',
    outline: 'none',
    borderRadius: '2px',
    boxShadow: 'none',
    marginRight: 10,
  },
  formcontrolwidth: {
    width: '100%',
    // [theme.breakpoints.down("sm")]: {
    //   padding: "6px",
    // },
  },
}))
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5px',
  },
  preview: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {  maxWidth: '15%',borderRadius: '50%' },
  //  height: '100px',
}
const PersonalInfo = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [fileData, setfileData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  useEffect(() => {
    const id = localStorage.getItem('userid')
    dispatch(fetchUserDetails(id))
  }, [dispatch])
  const handleImage = (event) => {
    let file = event.target.files[0]
    console.log("file",file)
    if (file) {
      setfileData(file)
      setSelectedImage(event.target.files[0])
    }
  }
  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const id = localStorage.getItem('userid')
      
   
      if (fileData) {
      const requestOne = await ReactS3.uploadFile(fileData, awsConfig)
        
      }
      const form = new FormData()
      form.append('firstName', values.firstName)
      form.append('lastName', values.lastName)
      form.append('image', fileData || user?.image)
      const response = await dispatch(updateUser(form))
      if (response?.payload?.isSuccess) {
        setLoading(false)
        toast.success(response?.payload?.message)
        dispatch(fetchUserDetails(id))
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      return error
    }
  }
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('Firstname is required'),
    lastName: Yup.string().trim().required('Lastname is required'),
    email: Yup.string().trim().required('Email is required'),
  })
  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Personal Information</Typography>
        <Formik
          enableReinitialize
          initialValues={user}
          validationSchema={ProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            handleSubmit(values)
          }}
        >
          {({ touched, errors, handleChange }) => (
            <Form>
              <Row>
                <Col sm={12}>
                  {/* <div style={styles.preview}>
                    {!user?.image ? (
                      <Spinner
                        animation="border"
                        role="status"
                        className="mb-3 ml-2 profile-loding-spinner"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <img
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : `${user?.image}`
                        }
                        style={styles.image}
                        className="mb-2"
                        alt="profileImage"
                      />
                    )}
                  </div> */}
                  <div className="form-group">
                    <div className="form-group">
                      {/* <label htmlFor="profileImage">ProfileImage *</label> */}
                      {/* <Field
                        name="profileImage"
                        type="file"
                        onChange={(event) => {
                          handleImage(event)
                        }}
                        placeholder="Profile Image"
                        accept="image/png, image/gif, image/jpeg"
                        className={
                          'form-control' +
                          (errors.image && touched.image ? ' is-invalid' : '')
                        }
                        id="image-icon"
                        style={{ display: 'none' }}
                      /> */}
                      {/* <label htmlFor="image-icon" style={{display:'block' ,cursor:"pointer"}}>
                      <AddAPhotoIcon fontSize='large'/>
                      </label> */}
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="firstName">Firstname *</label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="FirstName"
                      onChange={handleChange}
                      className={`form-control ${
                        touched.firstName && errors.firstName
                          ? 'is-invalid'
                          : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="firstName"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <label htmlFor="lastName">Lastname *</label>
                    <Field
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      placeholder="LastName"
                      className={`form-control ${
                        touched.lastName && errors.lastName ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="lastName"
                      className="invalid-feedback"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email"
                      disabled
                      className={`form-control ${
                        touched.email && errors.email ? 'is-invalid' : ''
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
                <Col sm={12} md={4} lg={3}>
                  <button
                    className="btn btn-lg btn-block theme-btn"
                    type="submit"
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mb-1"></span>
                    )}
                    {loading ? '' : 'Save'}
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default PersonalInfo
 /*const getProfileDetails = async () => {
    try {
      const id = localStorage.getItem("userid");
      const response = await getUserProfile(id);
      if (response.status === 200) {
        setForminitialValues(response?.data);
        setProfileImage(response?.data?.image);
      }
    } catch (error) {
      return error;
    }
  };*/
 