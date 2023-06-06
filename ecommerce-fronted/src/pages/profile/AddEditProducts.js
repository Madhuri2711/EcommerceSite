import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Col, Container, Row } from 'react-bootstrap'
//import { IMG_URL } from '../../lib/constant'
import { fetchCategory } from '../../slices/category'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubCategory } from '../../slices/sub.category'
import { addProduct } from '../../slices/product'
import awsConfig from '../../config/awsConfig'
import ReactS3 from 'react-s3'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  getProductDetail,
  getProductFilter,
  updateProductDetails,
} from '../../services/product.service'
//import { ChromePicker } from 'react-color'
import toast from 'react-hot-toast'
import moment from 'moment/moment'
import Loader from '../../components/loader/Loader'
import Sketch from '@uiw/react-color-sketch'
//import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  component: {
    padding: '30px 40px 30px 40px',
    background: '#fff',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)',
    border: '1px #fff',
    height: 'auto',
    paddingBottom: '10px',
    '@media (max-width:  575.98px)': {
      padding: '30px 0px 30px 0px',
    },
  },
  title: {
    fontSize: '18px',
    fontWeight: '600 !important',
    // paddingLeft: "24px",
    display: 'inline-block',
    paddingBottom: '25px',
    '@media (max-width:  575.98px)': {
      paddingLeft: '24px',
    },
  },
  notificationImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '15px',
    backgroundColor: 'rgb(244, 246, 248)',
    borderRadius: '10px',
    height: '100px',
  },
  boldText: {
    color: '#8995a0',
  },
  large: {
    width: '70px !important',
    height: '70px !important',
    marginLeft: '10px',
  },
}))

const initialValues = {
  category_id: '',
  sub_cat_id: '',
  brand: '',
  size: '',
  description: '',
  price: '',
  discount_price: '',
  final_price: '',
  your_earning: '',
  condition: '',
  images: [],
  is_bundled_product: true,
  name: '',
  color: '',
  is_active: true,
  product_code: '',
  year: '',
  weight: '',
  qty: '',
}

const AddEditProducts = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { category } = useSelector((state) => state.category)
  const { subcategory } = useSelector((state) => state.subcategory)
  const [isLoading, setLoading] = useState(false)
  const [fileData, setfileData] = useState([])
  const [details, setDetails] = useState({})
  const history = useHistory()
  const [colors, setColors] = useState(null)
  const [colorstring, setColorString] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [error, seterror] = useState(false)
  const { id } = useParams()
  const [loading, setLoader] = useState(false)
  const [filteredSubCategory, setFilteredSubCategory] = useState([])
  const [productSizes, setProductSizes] = useState([])
  const [productPrize, setProductPrize] = useState(0)
  const [image,setImage] = useState('');
  console.log(image,12);

  useEffect(() => {
    getUserProduct()
  }, [])

  useEffect(() => {
    if (!id) {
      setDetails(initialValues)
    }
    dispatch(fetchCategory())
    dispatch(fetchSubCategory())
  }, [dispatch])

  useEffect(() => {
    loadProductFilter()
  }, [])

  const loadProductFilter = async () => {
    const response = await getProductFilter()
    if (response?.isSuccess) {
      setProductSizes(response?.data?.size)
    }
  }

  const getUserProduct = async () => {
    try {
      setLoader(true)
      const response = await getProductDetail(id)
      if (response?.data?.isSuccess) {
        setLoader(false)
        const userInitVal = {
          ...response?.data?.data,
          category_id: response?.data?.data?.category_id?._id,
          sub_cat_id: response?.data?.data?.sub_cat_id?._id,
        }
        setDetails(userInitVal)
      } else {
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      return error
    }
  }

  const colorPicker = (e) => {
    const newColor = {
      hex: e.hex,
      rgb: '(' + e.rgb.r + ',' + e.rgb.g + ',' + e.rgb.b + ',' + e.rgb.a + ')',
    }
    let colortext = newColor.hex?.toString() || ''
    setColorString(colortext)
    setColors(newColor)
  }

  const handleMultiImageUpload = (e) => {
    if (e?.target?.files) {
      const filesArray = Array.from(e?.target?.files).map((file) =>
        URL.createObjectURL(file),
      )
      setSelectedFiles((prevImages) => prevImages.concat(filesArray))
      Array.from(e?.target?.files).map((file) => URL.revokeObjectURL(file))
    }

    let tempArr = []
    ;[...e.target.files].forEach((file) => {
      tempArr.push(file)
    })

    setfileData(tempArr)
  }

  const handleProductCategory = (value) => {
    const filteredSubCategory = subcategory?.filter(
      (item) => item?.cat_id === value,
    )
    setFilteredSubCategory(filteredSubCategory)
  }
  console.log("fileData",fileData)

  const removeImg = (img) =>{
    console.log("fileData",fileData)
    console.log("img",img)
  }
  const submitData = async (fields) => {
    try {
      setLoading(true)
      // if (fileData) {
      //  const requestOne = await ReactS3.uploadFile(fileData, awsConfig)
      // }
      seterror(false)
      const form = new FormData()
      form.append('images',image);
      form.append('category_id', fields?.category_id)
      form.append('sub_cat_id', fields?.sub_cat_id)
      form.append('brand', fields?.brand)
      form.append('size', fields?.size)
      form.append('description', fields?.description)
      form.append('price', fields?.price)
      form.append('discount_price', fields?.discount_price)
      form.append('final_price', fields?.price)
      form.append('your_earning', fields.your_earning)
      form.append('condition', fields?.condition)
      // fileData.map((val) => form.append('images', val))
      // form.append('existingImage', details?.images)
      form.append('is_bundled_product', false)
      form.append('name', fields?.name)
      form.append('color', colorstring === null ? details?.color : colorstring)
      form.append('is_active', true)
      form.append('product_code', 'PRODUCT1234CA')
      form.append('year', moment().year())
      form.append('weight', '1')
      form.append('qty', fields?.qty)

      if (details?._id) {
        const response = await updateProductDetails(details?._id, form)
        if (response?.isSuccess) {
          setLoading(false)
          history.push('/my-account/profile')
          toast.success(response?.message)
        } else {
          setLoading(false)
        }
      } else {
        const response = await dispatch(addProduct(fields))
        if (response?.type === 'product/add/fulfilled') {
          setLoading(false)
          toast.success('Product added Successfully.')
          history.push('/my-account/profile')
        } else {
          setLoading(false)
          console.log("not upload");
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          style={{
            width: '100px',
            height: '100px',
            float: 'left',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '10px',
            margin: '0px 10px 8px 0px',
          }}
          src={photo}
          alt="productImage"
          key={photo}
        />
      )
    })
  }

  // const ProductSchema = Yup.object().shape({
  //   category_id: Yup.string().required('Please select category.'),
  //   sub_cat_id: Yup.string().required('Please select sub category.'),
  //   brand: Yup.string().required('Brand name is required.'),
  //   //size: Yup.string().required('Size is required.'),
  //   description: Yup.string().required('Description is required.'),
  //   price: Yup.number()
  //     .positive()
  //     .required('Price is required')
  //     .integer('Price should be greater than 0.'),
  //   discount_price: Yup.number()
  //     .positive()
  //     .required('Discounted price is required')
  //     .integer('Discounted price should be greater than 0.'),
  //   condition: Yup.string().required('Condition is required.'),
  //   name: Yup.string().required('Product name is required.'),
  //   qty: Yup.number()
  //     .positive()
  //     .required('Quantity is required.')
  //     .integer('Quantity should be greater than 0.'),
  // })

  const handlePrice = (event) => {
    setProductPrize(event.target.value)
  }

  function validateDiscountedPrice(value) {
    let error
    if (productPrize) {
      if (value > productPrize) {
        console.log('inside if')
        error = 'Discounted price is not greater than the price.'
      }
    } else if (value > details?.price) {
      error = 'Discounted price is not greater than the price.'
    } else {
      error = ''
    }
    return error
  }

  function validateProductImage(value) {
    let error
    if (value?.length === 0) {
      error = 'Product image is required.'
    }
    return error
  }

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Product</Typography>
        <Formik
          enableReinitialize
          initialValues={details}
          // validationSchema={ProductSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log('values', values)
            setSubmitting(false)
            submitData(values)
            // resetForm({ values: "" });
          }}
          render={({
            errors,
            status,
            touched,
            handleChange,
            handleSubmit,
            values,
            isSubmitting,
            setFieldValue,
          }) => (
            <Container className="i-am-centered">
              <div className="container m-2">
                <div className="row justify-content-md-center">
                  <div className="col">
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col sm={12} md={6} lg={6}>
                           {loading && <Loader />}
                          {!loading && details?.images?.map((img) => (
                              <img
                                src={`${img}`}
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '10px',
                                  float: 'left',
                                  margin: '10px',
                                }}
                                alt="Thumb"
                                // onLoad={() => setLoader(false)}
                                onClick={(e) => {e.stopPropagation(); console.log("Clicked")}}
                              />
                          ))}
                          <label htmlFor="images">Product Image *</label>
                          <div className="form-group">
                             <div className="result">
                              {renderPhotos(selectedFiles)}
                            </div> 
                            <Field type='file' name='img' onChange={(e) =>{
                               setImage(e.target.files)
                            }}
                            validate={validateProductImage}
                            multiple
                            accept="image/png, image/gif, image/jpeg"
                            />
                           {/* <Field
                              name={id ? 'image' : 'images'}
                              type="file"
                              validate={validateProductImage}
                              onChange={(e) => {
                                setImage(e.target.files)
                                // handleChange(e)
                               
                              }}
                              multiple
                              accept="image/png, image/gif, image/jpeg"
                              className={
                                'form-control' + (error ? ' is-invalid' : '') ||
                                (errors.images && touched.images
                                  ? ' is-invalid'
                                  : '')
                              }
                            /> */}
                            {errors.images && touched.images && (
                              <p className="error-msg">{errors.images}</p>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="price"> Price *</label>
                            <Field
                              name="price"
                              type="number"
                              value={values?.price}
                              // onChange={(e) => {
                              //   console.log(e.target.value)
                              //   setFieldValue('price', e.targe.value)
                              //   // setFieldValue('your_earning', e.target.value)
                              // }}
                              onChange={(event) => {
                                handleChange(event)
                                handlePrice(event)
                              }}
                              placeholder="Price"
                              className={
                                'form-control' +
                                (errors.price && touched.price
                                  ? ' is-invalid'
                                  : '')
                              }
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="category_id">
                              Select Category *
                            </label>
                            <Field
                              as="select"
                              name="category_id"
                              onChange={(event) => {
                                handleChange(event)
                                handleProductCategory(event.target.value)
                              }}
                              className={
                                'form-control' +
                                (errors.category_id && touched.category_id
                                  ? ' is-invalid'
                                  : '')
                              }
                            >
                              <option value="" style={{ fontSize: '20px' }}>
                                Select Category
                              </option>
                              {category?.map((val) => (
                                <option
                                  value={val?._id}
                                  style={{ fontSize: '20px' }}
                                >
                                  {val?.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="category_id"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          {/* <label htmlFor="category_id"> Select Category*</label>
                                                    <Controls.SelectInputField
                                                        label="Category"
                                                        value={values.category_id ? values.category_id : ''}
                                                        name="category_id"
                                                        id="category_id"
                                                        onChange={(e) => {
                                                            // fetchSubCategory(e.target.value);
                                                            handleChange(e);
                                                        }}
                                                        error={errors.category_id && touched.category_id && errors.category_id}
                                                        options={category}
                                                    /> */}
                          <div className="form-group">
                            <label htmlFor="brand"> Brand Name *</label>
                            <Field
                              name="brand"
                              type="text"
                              onChange={handleChange}
                              placeholder="Brand Name"
                              className={
                                'form-control' +
                                (errors.brand && touched.brand
                                  ? ' is-invalid'
                                  : '')
                              }
                            />
                            <ErrorMessage
                              name="brand"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="condition">
                              Select Condition *
                            </label>
                            <Field
                              as="select"
                              name="condition"
                              className={
                                'form-control' +
                                (errors.condition && touched.condition
                                  ? ' is-invalid'
                                  : '')
                              }
                            >
                              <option style={{ fontSize: '20px' }}>
                                Select Condition
                              </option>
                              <option style={{ fontSize: '20px' }} value="NEW">
                                NEW
                              </option>
                              <option style={{ fontSize: '20px' }} value="USED">
                                USED
                              </option>
                              <option
                                style={{ fontSize: '20px' }}
                                value="NOT_SPECIFIED"
                              >
                                NOT_SPECIFIED
                              </option>
                            </Field>
                            <ErrorMessage
                              name="condition"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          {/* <div className="form-group">
                                                        <label htmlFor="condition"> Condition *</label>
                                                        <Field
                                                            name="condition"
                                                            type="text"
                                                            value={values.condition}
                                                            onChange={handleChange}
                                                            placeholder="condition"
                                                            className={'form-control' + (errors.condition && touched.condition ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="condition" component="div" className="invalid-feedback" />
                                                    </div> */}
                          <div className="form-group">
                            <label htmlFor="color"> Color *</label>
                            <Sketch
                              color={colors !== null && colors.hex}
                              onChange={(e) => colorPicker(e)}
                              disableAlpha
                              renderers={false}
                            />
                            {/* <Field
                              name="color"
                              type="text"
                              value={values.color}
                              onChange={handleChange}
                              placeholder="Color"
                              className={
                                "form-control" +
                                (errors.color && touched.color
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="color"
                              component="div"
                              className="invalid-feedback"
                            /> */}
                          </div>
                           {/* <div className="form-group d-flex align-items-center">
                                                        <Field
                                                            name="is_bundled_product"
                                                            type="checkbox"
                                                            style={{ width: '20px', marginLeft: '10px' }}
                                                            className={'form-control' + (errors.is_bundled_product && touched.is_bundled_product ? ' is-invalid' : '')} />
                                                        <label htmlFor="is_bundled_product" style={{ marginBottom: 0, paddingLeft: '12px' }} >Click if Product is bundled *</label>
                                                        <ErrorMessage name="is_bundled_product" component="div" className="invalid-feedback" />
                                                    </div> 
                         <div className="form-group d-flex align-items-center">
                            <Field
                              name="is_active"
                              type="checkbox"
                              style={{ width: "20px", marginLeft: "10px" }}
                              className={
                                "form-control" +
                                (errors.is_active && touched.is_active
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <label
                              htmlFor="is_active"
                              style={{ marginBottom: 0, paddingLeft: "12px" }}
                            >
                              Active
                            </label>
                            <ErrorMessage
                              name="is_active"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>  */}
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                          <div className="form-group">
                            <label htmlFor="name"> Product Name *</label>
                            <Field
                              name="name"
                              type="text"
                              onChange={handleChange}
                              placeholder="Product Name"
                              className={
                                'form-control' +
                                (errors.name && touched.name
                                  ? ' is-invalid'
                                  : '')
                              }
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="discount_price">
                              Discounted Price *
                            </label>
                            <Field
                              name="discount_price"
                              type="number"
                              validate={validateDiscountedPrice}
                              onChange={handleChange}
                              placeholder="Discounted Price"
                              className={
                                'form-control' +
                                (errors.discount_price && touched.discount_price
                                  ? ' is-invalid'
                                  : '')
                              }
                            />
                            <ErrorMessage
                              name="discount_price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="sub_cat_id">
                              Select Sub Category *
                            </label>
                            <Field
                              as="select"
                              name="sub_cat_id"
                              onChange={handleChange}
                              className={
                                'form-control' +
                                (errors.sub_cat_id && touched.sub_cat_id
                                  ? ' is-invalid'
                                  : '')
                              }
                            >
                              <option value="" style={{ fontSize: '16px' }}>
                                Select Sub Category
                              </option>
                              {filteredSubCategory.length > 0 ? (
                                filteredSubCategory?.map((val) => (
                                  <option
                                    style={{ fontSize: '20px' }}
                                    value={val?._id}
                                  >
                                    {val?.name}
                                  </option>
                                ))
                              ) : (
                                <option
                                  value=""
                                  style={{
                                    fontSize: '14px',
                                  }}
                                >
                                  Subcategory not found.
                                </option>
                              )}
                            </Field>
                            <ErrorMessage
                              name="sub_cat_id"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="your_earning">Your Earning *</label>
                            <Field
                              name="your_earning"
                              type="number"
                              // onChange={handleChange}
                              // placeholder="Your earning"
                              // className={
                              //   "form-control" +
                              //   (errors.your_earning && touched.your_earning
                              //     ? " is-invalid"
                              //     : "")
                              // }
                              className="form-control"
                              value={
                                (values.your_earning =
                                  Math.floor
                                    ( values.price - values.discount_price )
                                )    
                              }
                            />
                            <ErrorMessage
                              name="your_earning"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          {/* <div className="form-group">
                            <label htmlFor="final_price"> Final Price *</label>
                            <Field
                              name="final_price"
                              type="number"
                              onChange={handleChange}
                              placeholder="Final Price"
                              className={
                                "form-control" +
                                (errors.final_price && touched.final_price
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="final_price"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                           */}
                          {/* <div className="form-group">
                            <label htmlFor="product_code">
                              {" "}
                              Product code *
                            </label>
                            <Field
                              name="product_code"
                              type="text"
                              value={values.product_code}
                              onChange={handleChange}
                              placeholder="Product code e.g PRODUCT123"
                              className={
                                "form-control" +
                                (errors.product_code && touched.product_code
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="product_code"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="weight"> Weight *</label>
                            <Field
                              name="weight"
                              type="number"
                              value={values.weight}
                              onChange={handleChange}
                              placeholder="Product weight"
                              className={
                                "form-control" +
                                (errors.weight && touched.weight
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="weight"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div> */}
                          <div className="form-group">
                            <label htmlFor="qty"> Quantities *</label>
                            <Field
                              name="qty"
                              type="number"
                              onChange={handleChange}
                              placeholder="Quantities"
                              className={
                                'form-control' +
                                (errors.qty && touched.qty ? ' is-invalid' : '')
                              }
                            />
                            <ErrorMessage
                              name="qty"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="size"> Size *</label>
                            <Field
                              as="select"
                              name="size"
                              label="Select Size"
                              onChange={(e) => {
                                handleChange(e)
                              }}
                              className={`form-control ${
                                touched.size && errors.size ? 'is-invalid' : ''
                              }`}
                            >
                              <option value="" className="select-bg">
                                Select Size
                              </option>
                              {productSizes?.map((size) => (
                                <option
                                  aria-label={size}
                                  value={size}
                                  className="select-bg"
                                >
                                  {size}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="size"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="description"> Description *</label>
                            <Field
                              component="textarea"
                              placeholder="Description"
                              rows="4"
                              cols="20"
                              id="description"
                              name="description"
                              onChange={handleChange}
                              variant="outlined"
                              className={
                                'form-control' +
                                (errors.description && touched.description
                                  ? ' is-invalid'
                                  : '')
                              }
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                          {/* <div className="form-group">
                            <label htmlFor="year"> Year *</label>
                            <Field
                              name="year"
                              type="text"
                              value={values.year}
                              onChange={handleChange}
                              placeholder="Year"
                              className={
                                "form-control" +
                                (errors.year && touched.year
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="year"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} md={4} lg={3}>
                          <button
                            className="btn btn-lg btn-block theme-btn mt-2"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isLoading && (
                              <span className="spinner-border spinner-border-sm mb-1"></span>
                            )}
                            {isLoading ? '' : 'Save'}
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </Container>
          )}
        />
      </Box>
    </>
  )
}
export default AddEditProducts
