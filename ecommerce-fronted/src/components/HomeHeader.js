import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../assets/css/home.css'
import HeaderOne from '../wrappers/header/HeaderOne';
import HomeHeroContent from '../components/HomeHeroContent'
function HomeHeader({
    children,
    headerContainerClass,
    headerTop,
    headerPaddingClass,
    headerPositionClass,
    headerInfo
  }) {
    return <Container fluid className='home-header-container'>
        <Row className='header-imgs'>
            <img className='home-header-img' src={require('../assets/img/ceosection/Vector-4.png')} alt='orange-home-img' />
            <img className='pink-header-img ' src={require('../assets/img/ceosection/Mask_Group1.png')} alt='orange-home-img' />
            <div className='orange-prop'></div>
            <div className='gradient-prop'></div>
            <div className='blue-prop'></div>
            <div className='grey-prop'></div>
        </Row>
        <Row className='mobile-header-imgs'>
            <img className='mobile-home-header-img' src={require('../assets/img/ceosection/mobile-Vector-4.png')} alt='orange-home-img' />
            <img className='mobile-pink-header-img' src={require('../assets/img/ceosection/mobile_mask1.png')} alt='orange-home-img' />
        </Row>
        <HeaderOne
            layout={headerContainerClass}
            top={headerTop}
            headerPaddingClass={headerPaddingClass}
            headerPositionClass={headerPositionClass}
        />
        <HomeHeroContent headerInfo={headerInfo} />
    </Container>;
}
// <img className='home-header-img' src={require('./imgs/Vector 4.png')} alt='orange-home-img' />


export default HomeHeader;
