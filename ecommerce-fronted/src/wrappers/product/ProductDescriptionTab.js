import PropTypes from 'prop-types'
import React, { useState,useEffect } from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import { IMG_URL } from '../../lib/constant'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { addProductComment } from '../../services/product.service'
import { productDetails } from '../../slices/product'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserProfile } from '../../services/profile.service'

const ProductDescriptionTab = ({ spaceBottomClass, product }) => {
  const [loading, setLoading] = useState(false)
  const [prodctUserDetails,setProdctUserDetails] = useState()
  const dispatch = useDispatch()
  const history = useHistory()

  // const { productDetail } = useSelector((state) => state.products)

  const handleSubmit = async (values) => {
    if (localStorage.getItem("token")) {
      const data = {
        ...values,
        product_id: product._id,
      }
      try {
        setLoading(true)
        const response = await addProductComment(data)
        if (response.status === 200) {
          dispatch(productDetails(product._id))
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
    } else {
      history.push("/sign-in")
    }

  }

  const getProductUserDetail = async() =>{
    const response  = await getUserProfile(product?.created_by?._id)
    setProdctUserDetails(response?.data)
  }
  useEffect(() => {
    if(product?.created_by?._id){
    getProductUserDetail()
    }
  }, [product?.created_by?._id])
  
  const commentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment message is required'),
  })
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  About the Seller
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Comments</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-md-6">
                        <div class="card user-card">
                          <div class="card-block">
                            {/* <div className='row'> */}
                            {/* <div class='row'> */}
                              <img
                                src={`${product?.created_by?.image}`}
                                class="img-radius"
                                alt="User-Profile-Img"
                              />
                              <h6 class="f-w-600 m-t-25 m-b-10">{`${product?.created_by?.firstName} ${product?.created_by?.lastName}`}</h6>
                            {/* </div> */}
                              <div class="bg-c-blue counter-block m-t-10 p-20 row">
                                <div class="col-md-4">
                                  <div className='d-flex align-items-center justify-content-center'>
                                    <i class="fa fa-list-alt"></i>
                                    <h5 class='mb-0 ml-2' style={{ color: "#fff" ,fontSize:'17px'}}>Items</h5>
                                  </div>
                                  <p className='d-flex align-items-center justify-content-center mt-2'>{prodctUserDetails?.totalItems ? prodctUserDetails?.totalItems  : 0}</p>
                                </div>
                                <div class="col-md-4">
                                  <div className='d-flex align-items-center justify-content-center'>
                                    <i class="fa fa-light fa fa-eye"> </i>
                                    <h5 class='mb-0 ml-2' style={{ color: "#fff" ,fontSize:'17px'}}>Sold Items</h5>
                                  </div>
                                  <p className='d-flex align-items-center justify-content-center mt-2'>{prodctUserDetails?.soldItems ? prodctUserDetails?.soldItems  : 0}</p>
                                </div>
                                <div class="col-md-4">
                                  <div className='d-flex align-items-center justify-content-center'>
                                    <i class="fa fa-light fa fa-eye"> </i>
                                    <h5 class='mb-0 ml-2' style={{ color: "#fff" ,fontSize:'17px'}}>View</h5>
                                  </div>
                                  <p className='d-flex align-items-center justify-content-center mt-2'>{prodctUserDetails?.totalViews ? prodctUserDetails?.totalViews  : 0}</p>
                                </div>
                              </div>
                            </div>
                          
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {product?.description}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7 commentSection">
                    {product?.comments.map((comment, index) => (
                      <div className="review-wrapper">
                        <div className="single-review">
                          <div className="review-img">
                            <img
                              src={`${IMG_URL}${comment?.user_id?.image}`}
                              alt=""
                              style={{
                                width: '60px',
                                height: '60px',
                                border: '50%',
                                borderRadius: '50px',
                              }}
                            />
                          </div>
                          <div className="review-content">
                            <div className="review-top-wrap">
                              <div className="review-left">
                                <div className="review-name">
                                  <h4>{`${comment?.user_id?.firstName} ${comment?.user_id?.firstName}`}</h4>
                                </div>
                                {/* <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div> */}
                              </div>
                              {/* <div className="review-left">
                              <button>Reply</button>
                            </div> */}
                            </div>
                            <div className="review-bottom">
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50 ">
                      <h3 className="mb-4">Add a Review</h3>
                      <div className="ratting-form">
                        <Formik
                          initialValues={{ comment: '' }}
                          validationSchema={commentSchema}
                          onSubmit={(values, { resetForm }) => {
                            // setSubmitting(false)
                            handleSubmit(values)
                            resetForm()
                          }}
                        >
                          {({ touched, errors }) => (
                            <Form>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="rating-form-style ">
                                    <div className="form-group">
                                      <Field
                                        as="textarea"
                                        name="comment"
                                        placeholder="Message"
                                        className={`form-control ${touched.comment && errors.comment
                                          ? 'is-invalid'
                                          : ''
                                          }`}
                                      />
                                      <ErrorMessage
                                        component="div"
                                        name="comment"
                                        className="invalid-feedback"
                                      />
                                    </div>
                                    {/* <textarea
                                    name="Your Review"
                                    placeholder="Message"
                                    defaultValue={''}
                                  /> */}
                                    <button
                                      className="btn  btn-lg btn-block"
                                      type="submit"
                                      // disabled={loading}
                                      style={{
                                        fontSize: '15px',
                                        backgroundColor: '#F28B27',
                                        color: '#fff',
                                      }}
                                    >
                                      Comment
                                      {loading && (
                                        <span className="spinner-border spinner-border-sm mb-1"></span>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  )
}

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductDescriptionTab
