import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Avatar } from '@mui/material'
import clsx from 'clsx'
import {
  acceptorDeclinedNotification,
  allVisibleNotification,
  bargainingMakeOffer,
  getNotification,
} from '../../services/notification.service'
//import { IMG_URL } from '../../lib/constant'
import Modal from 'react-bootstrap/Modal'
import { Formik, Form, Field } from 'formik'
import toast from 'react-hot-toast'
import { getNotificationCounts } from '../../slices/notification'
import { useDispatch } from 'react-redux'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  component: {
    padding: '30px 40px 0 40px',
    background: '#fff',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
    border: '1px #fff',
    paddingBottom: '10px',
  },
  notifyscroll: {
    height: '1170px',
    overflowY: 'auto',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600 !important',
    paddingRight: '24px',
    display: 'inline-block',
    paddingBottom: '25px',
  },
  title1: {
    fontSize: '18px',
    fontWeight: '600 !important',
    display: 'inline-block',
    paddingBottom: '25px',
    cursor: 'pointer',
    color: '#f18b27'
  },
  notificationImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '15px',
    backgroundColor: '#fbdead',
    borderRadius: '10px',
    height: 'auto',
    marginRight: '20px',
    paddingBottom: '10px',
    paddingTop: '10px',
    '@media (max-width: 767.98px)': {
      display: 'block'
    }
  },
  subLink: {
    fontWeight: '500',
  },
  boldText: {
    color: '#f18b27',
  },
  large: {
    width: '70px !important',
    height: '70px !important',
    marginLeft: '10px',
  },
}))

const Notification = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [submittingBtnProcess, setSubmittingBtnProcess] = useState(false)
  const [notificationId, setNotificationId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      const res = await getNotification()
      if (res?.isSuccess) {
        setData(res?.data)
      }
    } catch (error) {
      return error
    }
  }

  const acceptDeclinedNotification = async (id, type) => {
    try {
      if (type === 'ACCEPT') {
        setLoading(true)
        const notificationStatus = {
          status: type,
        }
        const response = await acceptorDeclinedNotification(
          id,
          notificationStatus,
        )
        if (response.isSuccess) {
          setLoading(false)
          toast.success(response?.message)
          loadNotifications()
        } else {
          setLoading(false)
        }
      } else {
        setIsSubmitting(true)
        const notificationStatus = {
          status: 'DECLINED',
        }
        const response = await acceptorDeclinedNotification(
          id,
          notificationStatus,
        )
        if (response.isSuccess) {
          setIsSubmitting(false)
          toast.success(response?.message)
          loadNotifications()
        } else {
          setIsSubmitting(false)
        }
      }
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (values) => {
    try {
      setSubmittingBtnProcess(true)
      const counterOffer = {
        price: values?.price,
        type: 'SELLER',
      }
      const response = await bargainingMakeOffer(notificationId, counterOffer)
      if (response?.isSuccess) {
        handleClose()
        setSubmittingBtnProcess(false)
        toast.success(response?.message)
        loadNotifications()
      } else {
        setSubmittingBtnProcess(false)
      }
    } catch (error) {
      setSubmittingBtnProcess(false)
      return error
    }
  }

  // const validatePrice = (value) => {
  //   let error
  //   if (value > 100) {
  //     error = 'Counter Offer Price not greater then Product Price.'
  //   }
  //   return error
  // }

  const clearNotification = async () => {
    try {
      const response = await allVisibleNotification()
      console.log("response ------>", response)
      if (response?.isSuccess) {
        dispatch(getNotificationCounts());
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Counter Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ price: '' }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="container">
                  <div className="row">
                    <div className="form-group">
                      <Field
                        type="number"
                        name="price"
                        placeholder="Enter Offer Price"
                        // validate={validatePrice}
                        className={`form-control ${touched.price && errors.price ? 'is-invalid' : ''
                          }`}
                      />
                      {errors.price && touched.price && (
                        <div className="pricelbel">{errors.price}</div>
                      )}
                    </div>
                    <div className="row">
                      <div className="d-flex justify-content-end">
                        <div className="col-md-3">
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            style={{
                              fontSize: '15px',
                              backgroundColor: '#F28B27',
                            }}
                            disabled={submittingBtnProcess}
                          >
                            {submittingBtnProcess && (
                              <span className="spinner-border spinner-border-sm mb-1"></span>
                            )}
                            {submittingBtnProcess ? '' : 'Send Offer'}
                          </button>
                        </div>
                        <div className="col-md-3">
                          <button
                            type="submit"
                            className="btn theme-btn btn-lg btn-block"
                            onClick={handleClose}
                            style={{ fontSize: '15px' }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Box className={classes.component}>
        <div className='d-flex justify-content-between'>
          <Typography className={classes.title}>All Notifications</Typography>
          <Typography
            className={classes.title1}
            onClick={() => clearNotification()}
          >
            {' '}
            Clear All Notifications
          </Typography>
        </div>
        <div className={classes.notifyscroll}>
          {data && data?.length > 0 ? (
            data?.map((notification) => {
              return (
                <>
                  {notification?.notifications
                    ?.sort((a, b) => b.created_date - a.created_date)
                    ?.map((item) => {
                      return (
                        <>
                          <Box className={classes.notificationImg}>
                            <Avatar
                              alt="Avatar"
                              src={`${item.img}`}
                              className={classes.large}
                            />
                            <Box style={{ paddingLeft: 15, paddingRight: 15 }}>
                              <Typography className="mt-2">
                                {item?.title}
                              </Typography>
                              <Typography
                                className={clsx(
                                  classes.subLink,
                                  classes.hoverTab,
                                )}
                                style={{
                                  fontFamily:
                                    '"Poppins", sans-serif !important',
                                }}
                              >
                                {item?.description}
                              </Typography>
                              {item?.type === 'MAKE_OFFER' && (
                                <div className="d-flex justify-content-between align-content-center m-1">
                                  <button
                                    onClick={() =>
                                      acceptDeclinedNotification(
                                        item?._id,
                                        'ACCEPT',
                                      )
                                    }
                                    className="acceptbtn"
                                  >
                                    {loading && (
                                      <span className="spinner-border spinner-border-sm mb-1"></span>
                                    )}
                                    {loading ? '' : 'Accept'}
                                  </button>
                                  <button
                                    onClick={() =>
                                      acceptDeclinedNotification(
                                        item?._id,
                                        'DECLINED',
                                      )
                                    }
                                    className="declinebtn"
                                  >
                                    {isSubmitting && (
                                      <span className="spinner-border spinner-border-sm mb-1"></span>
                                    )}
                                    {isSubmitting ? '' : 'Decline'}
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleShow()
                                      setNotificationId(item?._id)
                                    }}
                                    className="declinebtn"
                                  >
                                    Counter Offer
                                  </button>
                                </div>
                              )}
                              <Typography className={classes.boldText}>
                                {moment(item?.created_date).format('DD-MM-YYYY')}
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      )
                    })}
                </>
              )
            })
          ) : (
            <img
              className="emptydataImg"
              src={require('../../assets/img/emptydata/EmptyData.png')}
              alt="emptyDataImg"
            />
          )}
        </div>
      </Box>
    </>
  )
}
export default Notification
