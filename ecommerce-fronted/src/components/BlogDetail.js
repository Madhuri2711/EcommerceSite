import React, { useEffect, useState } from 'react';
import '../assets/css/Blog.css'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getBlogDetail } from '../services/blog.service';
import HeaderOne from '../wrappers/header/HeaderOne';
import FooterOne from '../wrappers/footer/FooterOne';
import defaulImage from '../assets/img/ceosection/defaultImage.jpg'

export default function BlogDetail() {
    const [blogData, setBlogData] = useState([])
    const { id } = useParams()
    const getByBlogDetail = async () => {
        const response = await getBlogDetail(id)
        setBlogData(response)
    }
    
    useEffect(() => {
        getByBlogDetail()
    }, [])
    return (
        <>
            <HeaderOne />
            {
                <div className='container my-5 blog-detail-container'>
                    <Row className='lg-mt-5 mt-150'>
                        <img className='img-blog' src={blogData.coverImage ? blogData?.coverImage : defaulImage} alt='blog-img' />
                    </Row>
                    <Row>
                        <Col className='align-self-center mt-50'>
                            <span><img src={require('../assets/img/ceosection/Calendar.png')} alt='' /></span>
                            <span className='date'>6 Mar, 2023</span>
                            <h2 className='mt-4'>{blogData.title}</h2>
                            <p dangerouslySetInnerHTML={{
                                __html:
                                    blogData?.description
                            }} className='mt-3' />

                        </Col>
                    </Row>
                </div>
            }
            <FooterOne
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
        </>
    );
}
