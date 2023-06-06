import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  addNewAddress,
  getCities,
  getContries,
  getState,
  updateAddress,
} from '../../services/profile.service'
import toast from 'react-hot-toast'
import { postal } from '../../helpers/helpers'

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
    padding: '30px 40px 0 40px',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
    border: '1px #fff',
    height: 'auto',
    backgroundColor: '#fbdead',
    borderRadius: '10px',
    margin: '10px',
    paddingBottom: '10px',
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
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10px',
    backgroundColor: '#fbdead',
    borderRadius: '10px',
    height: '150px',
  },
  large: {
    width: '100px !important',
    height: '100px !important',
    marginLeft: '10px',
  },
  formcontrolwidth: {
    width: '100%',
  },
  checkbox: {
    width: '16px',
  },
  addresstitle: {
    fontSize: '14px',
    color: '#2874f0',
    fontWeight: 500,
    padding: '16px 0',
    cursor: 'pointer',
    border: '1px solid #8995a0',
    borderRadius: '10px',
  },
}))

const initialValues = {
  first_name: '',
  last_name: '',
  address: '',
  city: '',
  postal_code: '',
  state: '',
  country: '',
  phone_number: '',
  is_default: false,
  state_code: '',
  country_code: '',
}

const AddNewAddress = ({ setOpen, address, setFilteredAddress }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [contries, setContries] = useState([])
  const [states, setStateData] = useState([])
  const [cities, setCities] = useState([])
  const [countryInfo, setCountryInfo] = useState({})
  const [stateInfo, setStateInfo] = useState([])
  const [cityInfo, setCityInfo] = useState([])
  const [formInitialValue, setFormInitialValue] = useState({})

  const closeAddressCard = () => {
    setOpen(false)
    setFilteredAddress({})
  }

  useEffect(() => {
    loadContries()
  }, [])

  useEffect(() => {
    InitialAddress()
  }, [])

  const InitialAddress = async () => {
    if (address?._id) {
      setFormInitialValue(address)
    } else {
      setFormInitialValue(initialValues)
    }
    const response = await getState(39)
    if (response?.status === 200 && response?.data?.isSuccess) {
      setStateData(response?.data?.data)
      const userState = response?.data?.data?.find(
        (item) => item?.name === address?.state,
      )
      if (userState?.state_id) {
        const res = await getCities(userState?.state_id)
        if (res?.status === 200 && res?.data?.isSuccess) {
          setCities(res?.data?.data)
        }
      }
    }
  }

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const addressData = {
        ...values,
        country: countryInfo?.name,
        state: stateInfo?.name,
        city: cityInfo[0]?.name,
        country_code: 'CA',
        state_code: stateInfo?.state_code,
      }
      if (values?._id) {
        const response = await updateAddress(address?._id, addressData)
        if (response?.isSuccess) {
          setLoading(false)
          setOpen(false)
          toast.success(response?.message)
          setFilteredAddress({})
        } else {
          setLoading(false)
        }
      } else {
        const response = await addNewAddress(addressData)
        if (response?.isSuccess) {
          setLoading(false)
          setOpen(false)
          toast.success(response?.message)
        } else {
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const loadContries = async () => {
    const response = await getContries()
    if (response?.status === 200 && response?.data?.isSuccess) {
      setContries(response?.data?.data)
    }
  }

  const handleCountry = async (e) => {
    const countryName = e?.target?.value
    const selectedContryInfo = contries?.find(
      (item) => item?.name === countryName,
    )
    setCountryInfo(selectedContryInfo)
    if (selectedContryInfo?.country_id) {
      const response = await getState(selectedContryInfo?.country_id)
      if (response?.status === 200 && response?.data?.isSuccess) {
        setStateData(response?.data?.data)
      }
    }
  }

  const handleState = async (e) => {
    const stateName = e?.target?.value
    const selectedStateInfo = states?.find((item) => item?.name === stateName)
    setStateInfo(selectedStateInfo)
    if (selectedStateInfo?.state_id) {
      const response = await getCities(selectedStateInfo?.state_id)
      if (response?.status === 200 && response?.data?.isSuccess) {
        setCities(response?.data?.data)
      }
    }
  }

  const handleCity = (e) => {
    const cityName = e?.target?.value
    const selectedCity = cities?.filter((item) => item?.name === cityName)
    setCityInfo(selectedCity)
  }

  const AddressSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Firstname is required'),
    last_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Lastname is required'),
    address: Yup.string().required('Address is required'),
    // postal_code: Yup.string()
    //   .matches(postal, 'Postal code is not valid')
    //   .required('Postal code is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    phone_number: Yup.string()
      .required('Phone Number is Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(11, 'Must be exactly 11 digits')
      .max(11, 'Must be exactly 11 digits'),
    // .matches(
    //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    //   "Phone number is not valid"
    // ),
  })

  return (
    <Box className={classes.component}>
      <Typography className={classes.title}>ADD A NEW ADDRESS</Typography>
      <Formik
        enableReinitialize={true}
        initialValues={formInitialValue}
        validationSchema={AddressSchema}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      >
        {({
          //values,
          touched,
          errors,
          handleChange,
          //handleBlur,
          //handleReset,
          //resetForm,
          //dirty,
          //isValid, 
        }) => (
          <Form className="mt-10">
            <Row>
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="first_name">FirstName *</label>
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="FirstName"
                    onChange={handleChange}
                    className={`form-control ${
                      touched.first_name && errors.first_name
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {errors.first_name && touched.first_name && (
                    <p className="error-msg">{errors.first_name}</p>
                  )}
                </div>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="last_name">LastName *</label>
                  <Field
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    placeholder="LastName"
                    className={`form-control ${
                      touched.last_name && errors.last_name ? 'is-invalid' : ''
                    }`}
                  />
                  {errors.last_name && touched.last_name && (
                    <p className="error-msg">{errors.last_name}</p>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <Field
                    as="select"
                    name="country"
                    label="Select Country"
                    onChange={(e) => {
                      handleCountry(e)
                      handleChange(e)
                    }}
                    className={`form-control ${
                      touched.country && errors.country ? 'is-invalid' : ''
                    }`}
                  >
                    <option value="" className="select-bg">
                      Select Country
                    </option>
                    {contries?.map((country) => (
                      <option
                        aria-label={country?.name}
                        value={country?.name}
                        className="select-bg"
                      >
                        {country?.name}
                      </option>
                    ))}
                  </Field>
                  {errors.country && touched.country && (
                    <p className="error-msg">{errors.country}</p>
                  )}
                </div>
              </Col>
              {/* <Col>
                <div className="form-group">
                  <label htmlFor="country_code">Country Code *</label>
                  <Field
                    type="text"
                    name="country_code"
                    onChange={handleChange}
                    placeholder="Countrycode"
                    className={`form-control ${
                      touched.country_code && errors.country_code
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="country_code"
                    className="invalid-feedback"
                  />
                </div>
              </Col> */}
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <Field
                    as="select"
                    name="state"
                    placeholder="State"
                    onChange={(e) => {
                      handleState(e)
                      handleChange(e)
                    }}
                    className={`form-control ${
                      touched.state && errors.state ? 'is-invalid' : ''
                    }`}
                  >
                    <option value="">Select State</option>
                    {states?.map((state) => (
                      <option value={state?.name}>{state?.name}</option>
                    ))}
                  </Field>
                  {errors.state && touched.state && (
                    <p className="error-msg">{errors.state}</p>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col>
                <div className="form-group">
                  <label htmlFor="state_code">State Code *</label>
                  <Field
                    type="text"
                    name="state_code"
                    onChange={handleChange}
                    placeholder="Statecode"
                    className={`form-control ${
                      touched.state_code && errors.state_code
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    component="div"
                    name="state_code"
                    className="invalid-feedback"
                  />
                </div>
              </Col> */}
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <Field
                    as="select"
                    name="city"
                    onChange={(e) => {
                      handleCity(e)
                      handleChange(e)
                    }}
                    className={`form-control ${
                      touched.city && errors.city ? 'is-invalid' : ''
                    }`}
                  >
                    <option value="">Select City</option>
                    {cities?.map((city) => (
                      <option value={city?.name}>{city?.name}</option>
                    ))}
                  </Field>
                  {errors.city && touched.city && (
                    <p className="error-msg">{errors.city}</p>
                  )}
                </div>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number *</label>
                  <Field
                    type="number"
                    name="phone_number"
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`form-control ${
                      touched.phone_number && errors.phone_number
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {errors.phone_number && touched.phone_number && (
                    <p className="error-msg">{errors.phone_number}</p>
                  )}
                </div>
              </Col>

              {/* <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="postal_code">Postal Code *</label>
                  <Field
                    type="text"
                    name="postal_code"
                    onChange={handleChange}
                    placeholder="Postalcode"
                    className={`form-control ${
                      touched.postal_code && errors.postal_code
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {errors.postal_code && touched.postal_code && (
                    <p className="error-msg">{errors.postal_code}</p>
                  )}
                </div>
              </Col> */}
            </Row>
            {/* <Row>
              <Col sm={12} md={6} lg={6}>
                <div className="form-group">
                  <label htmlFor="phone_number">Phone Number *</label>
                  <Field
                    type="number"
                    name="phone_number"
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`form-control ${
                      touched.phone_number && errors.phone_number
                        ? 'is-invalid'
                        : ''
                    }`}
                  />
                  {errors.phone_number && touched.phone_number && (
                    <p className="error-msg">{errors.phone_number}</p>
                  )}
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col sm={12} md={12} lg={12}>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <Field
                    component="textarea"
                    placeholder="Address"
                    rows="4"
                    cols="20"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    variant="outlined"
                    label="Message Description"
                    className={
                      'form-control' +
                      (errors.address && touched.address ? ' is-invalid' : '')
                    }
                  />
                  {errors.address && touched.address && (
                    <p className="error-msg">{errors.address}</p>
                  )}
                </div>
              </Col>
            </Row>
            <div className="d-flex">
              <label className="main">
                <p
                  style={{
                    marginBottom: '0px',
                    color: '#f18b27',
                    marginTop: '-2px',
                  }}
                >
                  Set Default Address
                </p>
                <Field
                  type="checkbox"
                  // style={{ width: "4%", height: "20px" }}
                  name="is_default"
                  id="is_default"
                  onChange={handleChange}
                  // checked='checked'
                />
                <span className="checkmark"></span>
              </label>
              {/* <label className="me-20">Set Default value </label> */}
            </div>
            <Row>
              <Col sm={3} md={3} lg={3}>
                <button
                  className="btn theme-btn btn-lg btn-block mt-20"
                  type="submit"
                  // disabled={!(dirty && isValid)}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {loading ? '' : 'Submit'}
                </button>
              </Col>
              <Col sm={3} md={3} lg={3}> 
                <button
                  className="btn theme-btn btn-lg btn-block mt-20"
                  // type="reset"
                  onClick={() => {
                    closeAddressCard()
                  }}
                >
                  Close
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AddNewAddress
