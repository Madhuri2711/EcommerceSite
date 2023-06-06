import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function HomeHeroContent({ headerInfo }) {

    return <div className='home-hero-container px-0'>
        {/* <Row> */}
        {/* <Col className='mx-auto' xxl={8} xl={9} lg={11} md={10} xs={10}> */}
        {// <h1 className='sell-your-closet'>Sell Your Closet</h1>
            // <h1>Earn More Cash</h1>
            // <p>Discover thousands of fashionable items, lifestyle items and accessories at a
            //     lower price.
            // </p>
        }
        <h1 className='sell-your-closet' dangerouslySetInnerHTML={{ __html: headerInfo?.landingTitle || 'Sell Your Closet <br/> Earn More Cash' }} />
        <p> {headerInfo?.landingDescription || 'Discover thousands of fashionable items, lifestyle items and accessories at a lower price.'} </p>
        {/* <Link className='get-start-btn' to='/'>Get Started</Link> */}
        {/* </Col> */}
        {/* </Row> */}
    </div>;
}
