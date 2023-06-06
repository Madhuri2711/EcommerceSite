import React from 'react'
import '../../assets/img/payment/failed.png'
import { Col, Row } from 'react-bootstrap'
import HeaderOne from '../../wrappers/header/HeaderOne'
import FooterOne from '../../wrappers/footer/FooterOne'
import { Link } from 'react-router-dom'

function paymentFail() {
  return (
    <div>
      <HeaderOne />
      <Row>
        <Col>
          <img
            className="d-block mx-auto"
            style={{marginTop:'5rem'}}
            src={require('../../assets/img/payment/failed1.png')}
            alt="Payment-fail"
          />
          <Link to='/'>
            <button
              className="btn btn-dark btn-lg d-block mx-auto mt-5 mb-5"
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
      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </div>
  )
}

export default paymentFail
