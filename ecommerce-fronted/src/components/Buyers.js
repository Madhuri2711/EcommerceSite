import React from 'react';
import { Col, Row } from 'react-bootstrap';

function Buyers({ buyersData }) {
    return <div className='buyers'>

        <Row className='body'>

            <Col className='right'>
                <div className='points'>
                    <h2>{buyersData?.BuyerTitle || "Buyers"}</h2>
                    <ol dangerouslySetInnerHTML=
                        {{
                            __html: buyersData?.BuyerStepsInfo[0] ||
                                `<li>Inani has several categories that should match what you need.</li>
                        <li>
                            Sign up, select an item that you like from various listings.</li>
                        <li>
                            Accept the sale price or make an offer for a reduced price</li>
                        <li>
                            When the seller accepts your offer, a sale
                            is made.
                        </li>
                        <li>
                            Receive your goods/item when it is delivered
                            (usually 3-5 business days after the seller ships)
                        </li>
                        <li> Confirm the item is in good quality.</li>`}}
                    />
                </div>
            </Col>
            <Col className='left'>
                <div className='outer-div'>
                    <div className='inner-div'>
                        <img className='mobile-img-buyers' src={require('../assets/img/ceosection/buyersimg1.png')} alt='' />
                    </div>
                </div>
            </Col>
        </Row>
    </div>;


}

export default Buyers;
