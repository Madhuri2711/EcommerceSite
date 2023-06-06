//import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { connect, useDispatch, useSelector } from 'react-redux'
//import { getDiscountPrice } from '../../helpers/product'
import LayoutOne from '../../layouts/LayoutOne'
import { toast } from "react-hot-toast";
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
// import { IMG_URL } from '../../lib/constant'
// import { getAllCart, removeCart } from '../../slices/cart'
import {
  getAllAddress,
  getAddress,
  updateAddress,
  removeAddress,
} from '../../services/profile.service'
import { getProductDetail } from '../../services/product.service'
// import StripeCheckout from 'react-stripe-checkout'
// import { getPaymentIntent } from '../../services/payment.service'
import { api } from '../../utility/interceptor'
//import { checkoutProduct } from '../../services/order.service'
//import toast, { Toaster } from 'react-hot-toast'
import Modal from 'react-bootstrap/Modal'
//import ManageAddress from './ManageAddress'
import { fetchAddresses } from '../../slices/address'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Avatar, Button } from '@mui/material'
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import AddNewAddress from './AddNewAddress'
import SkeletonLoader from '../../components/SkeletonLoader'
import swal from "sweetalert";


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
    background: '#fff',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
    border: '1px #fff',
    height: 'auto',
    paddingBottom: '8px',
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
    backgroundColor: 'rgb(244, 246, 248)',
    borderRadius: '10px',
    height: '150px',
  },
  selectedpPofileWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '10px',
    backgroundColor: '#F18B27',
    borderRadius: '10px',
    height: '150px',
    color: '#FFF',
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
    paddingLeft: '16px !important',
    cursor: 'pointer',
    border: '1px solid #8995a0',
    borderRadius: '10px',
  },
  addressbox: {
    margin: '10px',
  },
  icon: {
    display: 'none',
  },
}))

const Cart = ({ props }) => {
  // const [quantityCount] = useState(1)
  const classes = useStyles()
  const [quantityCounts, setQuantityCounts] = useState()
  const [productDetails, setProductdetails] = useState()
  const [message, setMessage] = useState(false)
  const [totalPrice, setTotalPrice] = useState()
  const [cartScreen, setCartScreen] = useState(false)
  const [selectAdr, setSelectAdr] = useState()
  const [loading, setLoading] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const [filteredaddress, setFilteredAddress] = useState({})
  const [type, setType] = useState('')

  const dispatch = useDispatch()
  const history = useHistory();

  const { addToast } = useToasts()
  const { id } = useParams()
  const shipingPrice = 19
  const gst = 2.47
  const location = useLocation()

  const { address } = useSelector((state) => state.address)
  const [defaultAddress, setDefaultAddress] = useState()
  const userId = localStorage.getItem('userid')
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpenModel(false)
    dispatch(fetchAddresses())
    setSelectAdr('')
  }
  const handleShow = () => setOpen(true)

  console.log("address",address)
  useEffect(() => {
    dispatch(fetchAddresses())
  }, [])
  useEffect(() => {
    setDefaultAddress(address?.filter((item) => item?.is_default === true))
  }, [address])

  // const editData = (addrid) => {
  //   setOpen(true);
  //   const filteredAddress = address?.filter((item) => item?._id === addrid)[0];
  //   setFilteredAddress(filteredAddress);
  // };

  // const deleteAddress = async (id) => {
  //   const response = await removeAddress(id);
  //   console.log(response);
  //   if (response?.status === 200) {
  //     dispatch(fetchAddresses());
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const updatedAddress = {
        is_default: true,
      }
      const response = await updateAddress(selectAdr, updatedAddress)
      if (response?.isSuccess) {
        setLoading(false)
        setOpenModel(false)
        toast.success(response?.message)
        setDefaultAddress([response?.data])
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location.state.quantityCount) {
      setQuantityCounts(location.state.quantityCount)
    }
  }, [])

  useEffect(() => {
    if (productDetails?.discount_price) {
      setTotalPrice(
        productDetails?.discount_price * quantityCounts + shipingPrice + gst,
      )
    }
  }, [productDetails, quantityCounts])

  const quantityAdd = () => {
    if (quantityCounts < productDetails?.qty) {
      setQuantityCounts(quantityCounts + 1)
      console.log('quantityCounts', quantityCounts)
      setTotalPrice(
        productDetails?.discount_price * quantityCounts + shipingPrice + gst,
      )
    } else {
      toast.error(`Only ${productDetails?.qty} is available`)
    }
  }

  const getByAddress = async () => {
    const daddress = address?.filter((item) => item?.is_default === true)
    setDefaultAddress(daddress)
  }

  const getProductDetails = async (id) => {
    const response = await getProductDetail(id)
    setProductdetails(response?.data?.data)
  }
  useEffect(() => {
    // dispatch(productDetails(id))
    getProductDetails(id)
  }, [])

  const chengeDeafualtAdr = (id) => {
    setSelectAdr(id)
  }

  const handleCheckout = () => {
    const request = {
      address: {
        address: defaultAddress[0]?.address,
        city: defaultAddress[0]?.city,
        country: defaultAddress[0]?.country,
        country_code: defaultAddress[0]?.country_code,
        first_name: defaultAddress[0]?.first_name,
        last_name: defaultAddress[0]?.last_name,
        phone_number: defaultAddress[0]?.phone_number,
        postal_code: defaultAddress[0]?.postal_code,
        state: defaultAddress[0]?.state,
        state_code: defaultAddress[0]?.state_code,
      },
      gst_tax: gst,
      is_payment_success: true,
      is_wallet_amount_used: false,
      items_price: productDetails?.discount_price,
      payment_method: 'STRIPE',
      products: [
        {
          product_id: productDetails?._id,
          qty: quantityCounts,
        },
      ],
      seller_id: {
        _id: productDetails?.created_by?._id,
        created_date: productDetails?.created_by?._id,
        firstName: productDetails?.created_by?.firstName,
        image: 'image-1642340707468.jpg',
        lastName: productDetails?.created_by?.lastName,
      },
      shipping_charge: 19,
      total_price: totalPrice,
      wallet_amount: 0,
    }

    console.log('request', request)
    const productInfo = {
      ...productDetails,
      totalPrice: totalPrice,
      quantityCounts: 1,
    }
    api
      .post('/payment/web-checkout', productInfo)
      .then(async (res) => {
        console.log('res', res)
        if (res?.data?.isSuccess) {
          window.localStorage.setItem('myObject', JSON.stringify(request))
          //  const response =    await checkoutProduct(request)
          //  console.log("response",response)
          window.location.href = res?.data?.data?.url
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | Cart</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem> */}

      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <Modal show={openModel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* <ManageAddress cartScreen={cartScreen}/> */}
                <Box
                  className={classes.addressbox}
                  onClick={() => setOpen(true)}
                >
                  <Typography className={classes.addresstitle}>
                    <AddIcon /> ADD A NEW ADDRESS
                  </Typography>
                </Box>
                {open ? (
                  <AddNewAddress
                    setOpen={setOpen}
                    loadAllAddresses={address}
                    address={filteredaddress}
                    setFilteredAddress={setFilteredAddress}
                    type={type}
                  />
                ) : (
                  ''
                )}
                {address &&
                  address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <Box
                        className={
                          selectAdr === address?._id
                            ? classes.selectedpPofileWrapper
                            : classes.profileWrapper
                        }
                        key={address?._id}
                        onClick={() => chengeDeafualtAdr(address?._id)}
                      >
                        <Avatar
                          alt="Avatar"
                          src={
                            // !user?.image
                            'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png'
                            // : `${IMG_URL}${user?.image}`
                          }
                          className={classes.large}
                        />
                        <Box style={{ paddingLeft: '40px' }}>
                          <Typography className={classes.smallText}>
                            {address?.first_name + ' ' + address?.last_name}
                          </Typography>
                          <Typography
                            className={classes.boldText}
                          >{`Address:  ${address?.address}`}</Typography>
                          <Typography className={classes.boldText}>
                            {`Phone:  ${address?.phone_number}`}
                          </Typography>
                          <Box className="ml-0 mt-1 d-flex justify-content-between">
                            {/* <Button
                              color="error"
                              size="small"
                              // onClick={() => {
                              //   deleteAddress(address?._id)
                              // }}
                              sx={{ mr: 1 }}
                            >
                              <DeleteForeverIcon />
                              Delete
                            </Button> */}
                            {/* <Button
                              size="small"
                              // onClick={() => {
                              //   editData(address?._id)
                              //   setType('EDIT_ADDRESS')
                              // }}
                            >
                              <EditIcon />
                              Edit
                            </Button> */}
                          </Box>
                        </Box>
                      </Box>
                    )
                  })}
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-lg btn-block theme-btn mt-2"
                    type="submit"
                    style={{ width: '100px' }}
                    onClick={() => handleSubmit()}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mb-1"></span>
                    )}
                    {loading ? '' : 'Save'}
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            {productDetails ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="product-thumbnail">
                              <Link
                                to={
                                  process.env.PUBLIC_URL +
                                  '/product/' +
                                  productDetails._id
                                }
                              >
                                <img
                                  className="img-fluid"
                                  src={`${productDetails.images[0]}`}
                                  alt=""
                                />
                              </Link>
                            </td>

                            <td className="product-name">
                              <Link
                                to={
                                  process.env.PUBLIC_URL +
                                  '/product/' +
                                  productDetails._id
                                }
                              >
                                {productDetails?.name}
                              </Link>
                              {productDetails?.size ? (
                                <div className="cart-item-variation">
                                  <span>
                                    {/* Color: {cartItem?.product_id?.} */}
                                  </span>
                                  <span>Size: {productDetails?.size}</span>
                                </div>
                              ) : (
                                ''
                              )}
                            </td>
                            <td className="product-price-cart">
                              {`$ ${productDetails?.discount_price}`}
                            </td>

                            <td className="product-quantity">
                              <div className="cart-plus-minus">
                                <button
                                  className="dec qtybutton"
                                  onClick={() => {
                                    setQuantityCounts(
                                      quantityCounts > 1
                                        ? quantityCounts - 1
                                        : 1,
                                    )
                                    setTotalPrice(
                                      productDetails?.discount_price *
                                      quantityCounts +
                                      shipingPrice +
                                      gst,
                                    )
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  className="cart-plus-minus-box"
                                  type="text"
                                  value={quantityCounts}
                                  disabled={message ? true : false}
                                />
                                <button
                                  className="inc qtybutton"
                                  onClick={() => quantityAdd()}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="product-remove">
                              <Link to={process.env.PUBLIC_URL + '/'}>
                                <button>
                                  <i className="fa fa-times"></i>
                                </button>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="row mt-4">
                  <div className="col-lg-8 col-md-6">
                    <div className="cart-tax">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Address
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        {address?.length > 0 ? (
                          <div className="tax-select-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                First Name
                              </div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.first_name}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">Last Name</div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.last_name}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">Country</div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.country}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">State</div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.state}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">City</div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.city}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">Address</div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.address}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                Postal Code
                              </div>
                              <div className="col-lg-6 col-md-6 text-right">
                                {defaultAddress[0]?.postal_code}
                              </div>
                            </div>

                            <button
                              className="cart-btn-2 mt-3"
                              // type="submit"
                              onClick={() => {
                                setOpenModel(true)
                                setCartScreen(true)
                              }}
                            >
                              Change Address
                            </button>
                          </div>
                        ) : (
                          <div className='d-flex align-items-center justify-content-between'>
                            <p style={{color:"#f18b27",fontWeight:'700'}}>No Any Address Available </p>
                            <button className="btn btn-lg  theme-btn"
                              type="submit" onClick={() => history.push('/my-account/address')}>Add New Address</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  /> */}

                  {/* <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Item Price{' '}
                        <span>{`$ ${productDetails?.discount_price}`}</span>
                      </h5>
                      <h5>
                        Shipping <span>{`$ ${shipingPrice}`}</span>
                      </h5>
                      <h5>
                        GST/HST/QST <span>{`$ ${gst}`}</span>
                      </h5>
                      <h4 className="grand-totall-title">
                        Total Price <span>{`$ ${totalPrice}`}</span>
                      </h4>
                  
                      <Link onClick={() => address?.length > 0 ? handleCheckout() : (
                       <>
                       {/* {console.log("", toast.error("At least one defaut address is required.!"))} */}
                       {console.log("Sweet alert", swal("Oops!", "At Least One Default Address is Required.!", "warning"))}
                        
                       </>)
                      }>
                        Buy Now {`($${totalPrice})`}
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <SkeletonLoader count={1} height={250} />
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

export default Cart
