import React from 'react'
import FooterOne from '../wrappers/footer/FooterOne'
import HeaderOne from '../wrappers/header/HeaderOne'
import "../assets/css/faq.css";
import { Accordion, Container } from "react-bootstrap"

const Faq = () => {
    return (
        <>
            <HeaderOne />
            <Container className="accodion-container my-5" >
                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What is Inani</Accordion.Header>
                        <Accordion.Body>
                            <p>Inani is more than just a marketplace, it is a community. A
                                <b> community</b> of fashion lovers, friends, colleagues looking to help
                                others meet their fashion and lifestyle needs while earning cash.</p>

                            <p>Inani platform was created to welcome <b>everyone</b> and <b>everything </b>
                                fashion/lifestyle regardless of race, religion or gender. We know
                                that life is a journey blessed with so many wants and needs. While
                                we cannot guarantee that we will get to the destination faster, we
                                know it is better that we get there together.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Why we started</Accordion.Header>
                        <Accordion.Body>
                            <p>The pandemic showed that there are a lot of fashionable new/used items
                                hoarding our closets. Some we no longer need, some we outgrow and some
                                we have just forgotten. These items are all waiting to be cashed in. </p>
                            <p>With the negative impact of the pandemic, we believe we can find some
                                positivity and joy in making extra cash and also acquiring quality items at a
                                cheaper rate bringing a win – win situation for the buyer and seller.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Who can use the Inani Platform?</Accordion.Header>
                        <Accordion.Body>
                            <p>Everyone is welcome. We have no judgements here</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How to list</Accordion.Header>
                        <Accordion.Body className='policy'>
                            <ul>
                                <li>Select the + button at the bottom of the screen</li>
                                <li>Fill in the details of your item including size, brand, description, price
                                    and discounted price</li>
                                <li>Click on list. Your item is available to potential buyers on the
                                    marketplace</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>What are Inani’s fees</Accordion.Header>
                        <Accordion.Body>
                            <p>Inani takes only 15% on the final price of the sold item leaving you with more
                                cash in your pocket</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                        <Accordion.Header>How to redeem my earnings</Accordion.Header>
                        <Accordion.Body>
                            <p>A user can redeem their earnings by direct deposit. Inani will send the funds
                                to the bank information entered on the app so please make sure that it is the
                                correct banking information.</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="6">
                        <Accordion.Header>What are the shipping rates</Accordion.Header>
                        <Accordion.Body>
                            <p>Inani charges a flat rate of $15 and GST/HST/QST on expedited shipping to
                                any location in Canada</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="7">
                        <Accordion.Header>Where does Inani ship to?</Accordion.Header>
                        <Accordion.Body>
                            <p>Inani ships to all location in Canada covered Canada post services</p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="8">
                        <Accordion.Header>Purchases & refunds</Accordion.Header>
                        <Accordion.Body className='policy'>
                            <p>All   purchases   are   final   with   no   refunds   and   returns.   Once   an   offer   is
                                accepted, it is considered a purchase.</p>
                            <p>In very limited circumstance, Inani may allow you to return an item if the
                                item is not as described on the platform. This is at the sole discretion of Inani
                                after carrying out an investigation. The buyer is solely responsible for the
                                purchase of an item and it is important that you review items before it is
                                purchased. When in doubt, ask for clarification from the seller before making
                                an offer.</p>
                            <p>For an item to be returned, a buyer needs to contact Inani within 2 business
                                days of the item being delivered.
                            </p>
                            <p>Items cannot be returned because:</p>
                            <ul>
                                <li>It is too big, too small or it doesn’t fit</li>
                                <li>A buyer changed their mind about the item</li>
                                <li>Delayed delivery</li>
                                <li>A buyer found a better deal.</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
            <FooterOne
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
        </>
    )
}

export default Faq