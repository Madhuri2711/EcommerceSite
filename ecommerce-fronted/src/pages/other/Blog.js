import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
//import Faq from '../../components/Faq';
import HeaderPage from '../HeaderPage';
import { getBlog } from '../../services/blog.service';
import { Link } from 'react-router-dom'
import defaulImage from '../../assets/img/ceosection/defaultImage.jpg'
import moment from 'moment';
import FooterOne from '../../wrappers/footer/FooterOne';
import HeaderOne from '../../wrappers/header/HeaderOne';
//import coverimg from  '../../assets/img/ceosection/blog-card-img-4.png';

export default function Blog() {
    const [blogs, setBlog] = useState([]);

    const getByBlog = async () => {
        const response = await getBlog()
        setBlog(response)
    }

    useEffect(() => {
        getByBlog()
    }, [])
    return <>
        <HeaderOne />
        <HeaderPage pageTitle="Blog" />
        <Row xs={1} lg={3} className="container mx-auto">
            {blogs?.length > 0 &&
                blogs?.map(blog => (
                    <Col className="mx-auto my-3" key={blogs.id}>
                        <Card className='card-box'>
                            <Link to={`/blogs/${blog?._id}`}>

                            {/* <Card.Img variant="top" src={coverimg ? coverimg : defaulImage}
                                    // width="370px" height="295px"
                                    alt="blog-img"
                                    key={blogs?.id}
                                /> */}

                                <Card.Img variant="top" src={blog.coverImage ? blog?.coverImage : defaulImage}
                                    // width="370px" height="295px"
                                    alt="blog-img"
                                    key={blogs?.id}
                                />
                            </Link>
                            <Card.Body className='card-body'>
                                <Card.Title dangerouslySetInnerHTML={{ __html: blog?.title }} />
                                <Card.Text className='blog-desctiption' dangerouslySetInnerHTML={{
                                    __html:
                                        (blog?.description?.length > 80) ?
                                            blog?.description.slice(0, 80).concat('...') : blog?.description
                                }} />
                                <span>
                                    <img src={require('../../assets/img/ceosection/Calendar.png')} alt='' />
                                </span>

                                <span className='mx-3'>{moment(blog?.created_date).format("D MMM, YYYY")}</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>
        <FooterOne
            backgroundColorClass="bg-gray"
            spaceTopClass="pt-100"
            spaceBottomClass="pb-70"
        />
        {//<Footer />
        }
    </>;
}