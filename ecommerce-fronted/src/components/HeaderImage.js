import React from 'react';
import '../assets/css/Blog.css'

export default function HeaderImage({ pageTitle }) {
    return <div className='container-fluid position-relative  mx-0 px-0'>
        <img className='desktop-header-img' src={require('../assets/img/ceosection/blog-bg.png')}
            width="100%"
            alt='blog' />
        <img className='mobile-header-img' src={require('../assets/img/ceosection/mobile-header.png')}
            width="100%"
            alt='blog' />
        <div className='page-title position-absolute top-50 start-50 translate-middle'>
            <h2>{pageTitle}</h2>
            <p>Home / {pageTitle}</p>
        </div>
    </div>;
}
