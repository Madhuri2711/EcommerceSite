import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Avatar, ImageList, ImageListItem } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import AddNewAddress from './AddNewAddress'
import { getAllAddress, removeAddress } from '../../services/profile.service'
import { Link, useParams } from 'react-router-dom'
import image from '../../assets/img/ceosection/defaultImage.jpg'
import { Col, Row } from 'react-bootstrap'
import { fetchUserDetails } from '../../slices/user.details'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { IMG_URL } from '../../lib/constant'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string, ref, number } from 'yup'
import { addBundle } from '../../slices/product'
import Card from 'react-bootstrap/Card'
import Img from '../../assets/img/common/headPhone.jpg'
// import toast, { Toaster } from "react-hot-toast";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { deleteProfileProduct } from '../../services/product.service'
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
    padding: '30px 40px 30px 40px',
    background: '#fff',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
    border: '1px #fff',
    height: 'auto',
    paddingBottom: '8px',
    '@media (max-width: 575.98px)': {
      padding: '30px 20px 30px 20px',
    }
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
    color: '#f18b27',
    fontWeight: 500,
    padding: '16px 0',
    paddingLeft: '16px !important',
    cursor: 'pointer',
    border: '1px solid #f18b27',
    borderRadius: '10px',
  },
  addressbox: {
    margin: '10px',
  },
  icon: {
    display: 'none',
  },
}))

const ManageBundle = () => {
  const classes = useStyles()
  const [productSelected, setProductSelected] = useState([])
  const [checkProduct, setCheckProduct] = useState(false)
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()
  const id = localStorage.getItem('userid')
  const { user } = useSelector((state) => state.user)
  const [productPrize, setProductPrize] = useState(0);

  const handleClose = () => {
    setShow(false)
    setProductSelected([])
    setStep(1)
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    dispatch(fetchUserDetails(id))
  }, [dispatch])
  console.log('productSelected', productSelected)

  const BundleSchema = object().shape({
    name: string().trim().required('Name is required'),
    description: string().trim().required('Description is required'),
    price: number().positive().required('Price is required').integer("Must be more than 0"),
    discount_price: number().positive().required('Discount Price is required').integer("Must be more than 0"),
    qty: number().positive().required('Qty Number is required').integer("Must be more than 0"),
  })

  const handleChanges = (id) => {
    let find = productSelected.indexOf(id)
    if (find > -1) {
      setProductSelected((prev) => prev.filter((x) => x !== id))
    } else {
      setProductSelected((prev) => [...prev, id])
    }
  }

  const handleSubmit = (value) => {
    try {
      const obj = {
        ...value,
        products: productSelected,
      }
      console.log('obj', obj)
      dispatch(addBundle(obj))
      setProductSelected([])
      dispatch(fetchUserDetails(id))
      setShow(false)
      setStep(1)
    } catch (error) {
      console.log(error)
    }
  }

  const bundleProduct = user?.productList.filter(
    (product) => product.is_bundled_product,
  )
  const products = user?.productList.filter(
    (product) => !product.is_bundled_product,
  )

  console.log('bundleProduct', bundleProduct)

  const checkProductSeleted = () => {
    console.log('productSelected', productSelected)
    if (productSelected.length > 1) {
      setCheckProduct(true)
      setStep(2)

    } else {
      setCheckProduct(false)
      toast.error('Minimum 2 product should be select for make a bundle.')
    }
  }


  const deleteProductData = async (product) => {
    swal({
      
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see your product.!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        catch: "Delete",
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await deleteProfileProduct(product?._id);
        console.log(response);
        if (response?.isSuccess) {
          dispatch(fetchUserDetails(id));
          swal("Your product has been deleted.!", {
            icon: "success",
          });
        }
      } else {
        swal("Your product has been safe.!");
      }
    });
  };

  const handlePrice = (event) => {
    setProductPrize(event.target.value);
  };


  function validateDiscountedPrice(value) {
    console.log(value);
    console.log("productPrize", productPrize);
    let error;
    if (value > productPrize) {
      error = "Discounted price is not greater than the price.";
    }
    return error;
  }

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Create Bundle</Typography>

        <Box className={classes.addressbox}>
          <a
            onClick={handleShow}
          >
            <Typography className={classes.addresstitle}>
              <AddIcon /> ADD A NEW BUNDLE
            </Typography>
          </a>
        </Box>
        <Modal show={show} onHide={handleClose}>

          <Modal.Body>
            <Modal.Header closeButton className='mb-3 bundle-title'>
              <Modal.Title>Product</Modal.Title>
            </Modal.Header>
            {step === 1 && (
              <>

                {products?.length > 0
                  ? products?.map((product) => (
                    <>
                      <div class="d-flex align-items-center create-bundle-1">
                        <label class="main ml-3">
                          <input
                            class="form-check-input mt-0 ml-auto"
                            type="checkbox"
                            onChange={() => handleChanges(product?._id)}
                            selected
                            checked={productSelected.includes(product?._id)}
                            // value={}
                            aria-label="Checkbox for following text input"
                          />
                          <span class="checkmark"></span>
                        </label>
                        <img
                          src={`${IMG_URL}${product?.images[0]}`}
                          style={{ height: '50px', width: '50px' }}
                          class="mr-4 ml-2"
                          alt="bundleImg"
                        />
                        <h6 class="create-bundle-h6">{product?.name}</h6>
                        <h3 style={{ marginBottom: '0px', marginLeft: '20px' }}>
                          ${product?.discount_price}
                        </h3>
                      </div>
                    </>
                  ))
                  : <div className='d-flex align-items-center justify-content-center'>No Product avaialble. Please create minimum 2 products for bundle it</div>}
                <Modal.Footer className='mt-3'>
                  <Button className='btn theme-btn' onClick={() => checkProductSeleted()}>
                    Next
                  </Button>
                </Modal.Footer>

              </>
            )}
            {step === 2 && (
              <>
                <Formik
                  initialValues={{
                    name: '',
                    description: '',
                    price: '',
                    discount_price: '',
                    qty: '',
                  }}
                  validationSchema={BundleSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log('value', values)
                    handleSubmit(values)
                    setSubmitting(false)
                  }}
                >
                  {({ touched, errors, isSubmitting, handleChange }) => (
                    <Form>
                      <div class="">
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label ">
                            TITLE OF PRODUCT*
                          </label>
                          <Field
                            type="text"
                            name="name"
                            // class="form-control make-bundle-input"
                            id="recipient-name"
                            onChange={handleChange}
                            placeholder="Enter Title Product"
                            className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''
                              }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="name"
                            className="invalid-feedback"
                          />
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">
                            DESCRIPTION*
                          </label>
                          <Field
                            // class="form-control make-bundle-input"
                            name="description"
                            onChange={handleChange}
                            className={`form-control ${touched.description && errors.description
                              ? 'is-invalid'
                              : ''
                              }`}
                            id="message-text"
                            placeholder="Provide details of Your listing such as features and reason for selling"
                          ></Field>
                          <ErrorMessage
                            component="div"
                            name="description"
                            className="invalid-feedback"
                          />
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <div className="mb-3">
                              <label for="recipient-name" class="col-form-label">
                                PRICE*
                              </label>
                              <Field
                                type="number"
                                name="price"
                                onChange={(e) => {
                                  handlePrice(e);
                                  handleChange(e);
                                }}
                                // class="form-control make-bundle-input"
                                className={`form-control ${touched.price && errors.price
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                id="recipient-name"
                                placeholder="Enter Price"
                              />
                              <ErrorMessage
                                component="div"
                                name="price"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div className="mb-3">
                              <label for="recipient-name" class="col-form-label">
                                DISCOUNT PRICE*
                              </label>
                              <Field
                                type="number"
                                name="discount_price"
                                validate={validateDiscountedPrice}
                                onChange={handleChange}
                                // class="form-control make-bundle-input"
                                className={`form-control ${touched.discount_price && errors.discount_price
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                id="recipient-name"
                                placeholder="Enter Discount Price"
                              />
                              <ErrorMessage
                                component="div"
                                name="discount_price"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div className="mb-3">
                              <label for="recipient-name" class="col-form-label">
                                YOUR EARNINGS*
                              </label>
                              <Field
                                type="number"
                                class="form-control make-bundle-input make-bundle-disabled"
                                id="recipient-name"
                                disabled
                                value={10}
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div className="mb-3">
                              <label
                                for="recipient-name"
                                class="col-form-label"
                                disabled
                              >
                                QUANTITY
                              </label>
                              <Field
                                type="number"
                                name="qty"
                                onChange={handleChange}
                                // class="form-control make-bundle-input"
                                className={`form-control ${touched.qty && errors.qty ? 'is-invalid' : ''
                                  }`}
                                id="recipient-name"
                                placeholder="Enter Quantity"
                              />
                              <ErrorMessage
                                component="div"
                                name="qty"
                                className="invalid-feedback"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Modal.Footer>
                        <Button className='btn btn-dark' onClick={() => setStep(1)}>
                          Back
                        </Button>
                        <Button className='btn theme-btn' type="submit">
                          Upload Product
                        </Button>
                      </Modal.Footer>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Box>
      <div className="row">
        {bundleProduct?.map((product) => {
          return (
            <div className="mt-2 col-md-6 col-lg-4 col-sm-12">
              <Card style={{ width: '100%', margin: '10px', height: 'auto' }}>
                {/* <Card.Img
                    variant="productImg"
                    src={`${IMG_URL}${product?.images[0]}`}
                  /> */}
                <Card.Body>
                  <Card.Text className="">
                    <ImageList variant="masonry" cols={2} gap={15}>
                      {product?.images?.map((item) => (
                        <ImageListItem >
                          <img
                            src={`${IMG_URL}${item}`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            className='profile-height'
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                    <div className="d-flex justify-content-center mt-3">
                      {/* <EditIcon
                            className="justify-content-start"
                            onClick={() => editProduct(product)}
                          />
                           */}
                      <DeleteForeverIcon
                        className="justify-content-end delete-btn"
                        onClick={() => deleteProductData(product)}
                      />
                    </div>
                  </Card.Text>

                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ManageBundle
