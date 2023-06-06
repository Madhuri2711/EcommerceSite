import React from 'react';
import '../assets/css/ceosection.css'
import { Col, Container, Row } from 'react-bootstrap';

export default function HomeCeoSection({ ceoData }) {
    return <Container className='ceo-section-continer'>
        <Row className='ceo-inner-container'>
            <Col lg={4} className='left-white-div'>
                <div className='pink-box'>
                    <img className='girl-img' src={require('../assets/img/ceosection/woman_smiling_at_computer_2-removebg 1.png')} alt='lady-img' />
                    <img className='sign-curve' src={require('../assets/img/ceosection/Vector-67.png')} alt='' />
                    <img className='person-1' src={require('../assets/img/ceosection/Ellipse-799.png')} alt='person-img' />
                    <img className='person-2' src={require('../assets/img/ceosection/Ellipse-800.png')} alt='person-img' />
                    <img className='person-3' src={require('../assets/img/ceosection/Ellipse-801.png')} alt='person-img' />
                </div>
            </Col>
            <Col lg={8} className='right-orange-div'>
                <div className='ceo-detail-container'>
                    {// <p>
                        //     “Inani is more than just a fashion marketplace, it is a community. A community of fashion lovers, friends, colleagues looking to help others meet their fashion and lifestyle needs while earning cash. A community where you can get quality new/used luxury items at discounted prices from peers!”
                        // </p>
                    }
                    <p> {ceoData?.productDescription ||
                        `“Inani is more than just a fashion marketplace, it is a community. 
                        A community of fashion lovers, friends, colleagues looking to help others meet their 
                        fashion and lifestyle needs while earning cash. A community where you can get quality 
                        new/used luxury items at discounted prices from peers!”`
                    } </p>
                    <div className='ceo-detail'>
                        <img src={require('../assets/img/ceosection/NelsonCEOProfile.jpeg')} alt='ceo-img' className='ceo-img' />
                        <div className='ceo-name'>
                            <h4>{ceoData?.productCEOText || "CEO"}</h4>
                            <p className='inani-hub-p'>Inanihub</p>
                        </div>
                    </div>
                </div>
            </Col>

        </Row>
    </Container>;
}
