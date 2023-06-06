import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../assets/css/downloadApp.css'
import img01 from '../assets/img/ceosection/shuttle-01.svg'

export default function DownlaodApp({ downlaodAppData }) {
    // <img src={require('../imgs/Profile-Picture.png')}></img>
    return <Container className='download-sec-container'>
        <div className='download-inner-sec'>
            <Row className='download-head'>
                <h2>{downlaodAppData?.downloadAppTitle || "Download the app"}</h2>
                <hr />
                <p dangerouslySetInnerHTML={{
                    __html: downlaodAppData?.downloadAppInfo || `<p><span>Inanihub</span> provides a marketplace platform that enables peer to peer sales
                of fashion and lifestyle items.</p>` }} />

            </Row>
            <Row className='download-body' lg={3} sm={12}>
                <Col className='feature-01'>
                    <div className='features-detail'>
                        <h1>01</h1>
                        <h3>{downlaodAppData?.stepOneTitle || "Setup"}</h3>
                        <p>{downlaodAppData?.stepOneInfo || "Download the app on google playstore and apple app store"}</p>

                    </div>
                    <div className='img-01-container'>
                        <img className='img-01' src={img01} alt="" />
                    </div>
                </Col>
                <Col className='feature-02'>
                    <div className='features-detail'>
                        <h1>02</h1>
                        <h3>{downlaodAppData?.stepTwoTitle || "Get Started"}</h3>
                        <p>{downlaodAppData?.stepTwoInfo || "Sign up and join thousands of people exploring fashion, growing a community and generating cash."}</p>
                    </div>
                    <div className='img-02-container'>
                        <div className='img-02'></div>
                    </div>
                </Col>
                <Col className='feature-03'>
                    <div className='features-detail'>
                        <h1>03</h1>
                        <h3>{downlaodAppData?.stepThreeTitle || "Go!"}</h3>
                        <p>{downlaodAppData?.stepThreeInfo || "let your style do the talking!"}</p>
                    </div>
                    <div className='img-03-container'>
                        <div className='img-03'></div>
                    </div>
                </Col>
            </Row>

            <div className='app-btn-continer'>
                <a style={{ textDecoration: 'none' }} href='https://play.google.com/store/apps/details?id=com.service.inanihub' target="_blank" rel="noreferrer" >
                    <button className='app-btn'>
                        <img src={require('../assets/img/ceosection/ps-btn.png')} alt='app-btn' />
                        <div className='btn-content'>
                            <p>GET IT ON</p>
                            <h4>Google Play</h4>
                        </div>
                    </button>
                </a>
                <a style={{ textDecoration: 'none' }} href='https://apps.apple.com/ca/app/inani/id1611295309' target="_blank" rel="noreferrer" >
                    <button className='app-btn'>
                        <img src={require('../assets/img/ceosection/applestore-btn.png')} alt='app-btn' />
                        <div className='btn-content'>
                            <p>Download on the</p>
                            <h4>App  Store</h4>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    </Container >
}


