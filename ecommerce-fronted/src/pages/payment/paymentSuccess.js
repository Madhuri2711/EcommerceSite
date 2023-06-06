import React, { useEffect } from 'react'
import '../../assets/img/payment/failed.png'
import { Col, Row } from 'react-bootstrap'
import HeaderOne from '../../wrappers/header/HeaderOne'
import FooterOne from '../../wrappers/footer/FooterOne'
import { checkoutProduct } from '../../services/order.service'
import { Link } from 'react-router-dom'

export default function PaymentSuccess() {
  const orderCreate = async () => {
    try {
      const request = localStorage.getItem('myObject')
      console.log(request)
      const myObj = JSON.parse(request)
      console.log('myObj', myObj)
      const response = await checkoutProduct(myObj)
      console.log("response", response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('jksjk')
    orderCreate()
  }, [])

  return (
    <div>
      <HeaderOne />
      <div className='container'>
      <Row>
        <Col>
          <img
            className="d-block mx-auto "
            src={require('../../assets/img/payment/payment-successful1.png')}
            alt="Payment-successfull"
            style={{ marginTop:"7rem"}}
          />
          <Link to='/'>
            <button
              className="btn btn-dark btn-lg d-block mx-auto mt-2 mb-5"
              type="submit"
              style={{
                fontSize: "15px",
                backgroundColor: "#F28B27",
              }}
            >
              Back To Home
            </button>
          </Link>
        </Col>
      </Row>
      </div>
      <FooterOne
        backgroundColorClass="bg-gray"
       
        spaceTopClass="pt-100"
       spaceBottomClass="pb-100"
      />
    </div>
  )
}

// export default paymentSuccess
