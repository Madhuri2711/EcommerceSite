import React, { useState, useEffect } from 'react';
import '../assets/css/Blog.css';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import img1 from './imgs/blog-card-img-1.png';
// import img2 from './imgs/blog-card-img-2.png';
// import img3 from './imgs/blog-card-img-3.png';
// import img4 from './imgs/blog-card-img-4.png';
// import img5 from './imgs/blog-card-img-5.png';
// import img6 from './imgs/blog-card-img-6.png';
// import img7 from './imgs/blog-card-img-7.png';
// import img8 from './imgs/blog-card-img-8.png';
// import img9 from './imgs/blog-card-img-9.png';
import { Link } from 'react-router-dom'
import { getBlog } from '../services/blog.service';
//import { Container } from 'react-bootstrap';
import defaulImage from '../assets/img/ceosection/defaultImage.jpg'
import moment from 'moment';

export default function BlogCard(props) {
    const [blogs, setBlog] = useState([]);

    const getByBlog = async () => {
        const response = await getBlog()
        setBlog(response)
    }

    useEffect(() => {
        getByBlog()
    }, [])
    return <div className="container mx-auto mb-5" >
        <div className='blog-header'>
            <h1>Latest News <br />
                and blog 
                <hr /></h1>
            <div className='blog-header-btn blog-desktop-btn'>
                <Link to='/blog'>Explore More </Link>
            </div>
        </div>
        <Row xs={1} lg={3} className="container mx-auto">
            {blogs?.length > 0 &&
                blogs?.map(blog => (
                    <Col className="mx-auto my-3" key={blogs.id}>
                        <Card className='card-box'>
                            <Link to={`/blogs/${blog?._id}`}>
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
                                    <img src={require('../assets/img/ceosection/Calendar.png')} alt='' />
                                </span>

                                <span className='mx-3'>{moment(blog?.created_date).format("D MMM, YYYY")}</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>

        {/* <Col className="mx-auto my-3">
            <Card className='card-box'>
                <Link to="/blog/2">
                    <Card.Img variant="top" src={require("../assets/img/ceosection/blog-card-img-3.png")}
                        width="370px" height="295px"
                    />
                </Link>
                <Card.Body className='card-body'>
                    <Card.Title>Eradicating Fast Fashion</Card.Title>
                    <Card.Text>
                        "Cheap, Yet Costly"- Why We Need to Eradicate Fast Fashion
                        "My Shein order has just arrived at the door"....</Card.Text>
                    <span>
                        <img src={require('../assets/img/ceosection/Calendar.png')} alt='' />
                    </span>

                    <span className='mx-3'>12 Mar, 2022</span>

                </Card.Body>
            </Card>
        </Col>
        <Col className="mx-auto my-3">
            <Card className='card-box'>
                <Link to="/blog/3">
                    <Card.Img variant="top" src={require("../assets/img/ceosection/blog-card-img-4.png")}
                        width="370px" height="295px"
                    />
                </Link>
                <Card.Body className='card-body'>
                    <Card.Title>Importance of Side Income</Card.Title>
                    <Card.Text>
                        How Do I Keep Up with My Bills Payments Despite Working a 9 to 5?  The Importance of Earning Side Income...</Card.Text>
                    <span>
                        <img src={require('../assets/img/ceosection/Calendar.png')} alt='' />
                    </span>

                    <span className='mx-3'>12 Mar, 2022</span>

                </Card.Body>
            </Card>
        </Col> */}
        {/* {isLanding && <div className='blog-header-btn blog-mobile-btn'>
            <Link to='/blog'>View More </Link>
        </div>} */}
    </div>;
}
