import React from 'react'
import '../../assets/css/tnc-policy.css'
import { Container } from 'react-bootstrap'
import FooterOne from '../../wrappers/footer/FooterOne'
import HeaderOne from '../../wrappers/header/HeaderOne'

const TermsAndCondition = () => {
    return (
        <>
            <HeaderOne />
            <Container className='policy faq-container'>
                <h2>TERMS AND CONDITIONS</h2>
                <p>Welcome to Inani!</p>
                <p>These are terms and conditions that govern your use of Inani Application unless we express
                    those specific terms (and not these) apply and provide the details of the Peer-to-Peer Service
                    ("Services") specified below.</p>
                <p>Please read these terms and conditions carefully before using this application operated by
                    ("us," 'we," "our").</p>
                <h3>Inani Services</h3>
                <p>We provide an online social marketplace where Users can list and sell items. Users who purchase Items are called "Buyers," and Users who sell Items are called "Sellers." Users may be both Buyers and Sellers on the Service. Using this Service, Buyers and Sellers enter into a contract for the sale and purchase of Items directly between themselves, and Inani is not a party to such sale or purchase.
                </p>
                <p>There are risks that you assume when dealing with others. These risks are borne by you alone, and not Inani.  You are solely responsible for your evaluation of, and decision to use, the Service, Buy, Sell, or transact any business or communications on the Service, and will be liable for all of your actions on the Service.
                </p>
                <h3>Registration</h3>
                <p>As a user of this Application, you will be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
                </p>
                <p>If you think there are any possible issues regarding the security of your account on the application, inform us immediately so we may address them accordingly.
                </p>
                <p>We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.
                </p>
                <h3>Commission on sale.</h3>
                <p>Inani is a social marketplace that provides a platform for buyers and sellers to interact and purchase fashion and lifestyle items.
                </p>
                <p>For every sale, Inani takes a flat rate of 15% on the final sale price and the seller gets 85%. Sale price is the final price accepted by the seller after all negotiations. This is excluding the cost of shipping and any applicable taxes that are borne by the buyer.
                </p>
                <h3>Shipping</h3>
                <p>Inani will provide a prepaid shipping label to the Seller when an item is purchased and Inani expects its seller to ship immediately. The Seller has a maximum of 4 days (96 hours) to ship. After the 4th day, Inani will cancel the order and refund the buyer. The Seller must use the label to ship only the item(s) that was bought by the Buyer as the Seller is fully responsible for the content of the parcel.
                </p>
                <p>When an item is delivered, the Buyer has 2 days to confirm the item is as described before Inani credits the sellers account.
                </p>
                <h3>Purchases, Returns and Refund</h3>
                <p>All purchases are final with no refunds and returns. Once an offer is accepted, it is considered a purchase.
                </p>
                <p>In very limited circumstance, Inani may allow you to return an item if the item is not as described on the platform. This is at the sole discretion of Inani after carrying out an investigation. The buyer is solely responsible for the purchase of an item and it is important that you review items before it is purchased. When in doubt, ask for clarification from the seller before making an offer.
                </p>
                <h3>Conditions of use</h3>
                <p>By using this application, you certify that you have read and reviewed this Agreement and agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the application accordingly. Inani only grants use and access of this application, its products, and its services to those who have accepted its terms.
                </p>
                <h3>Privacy policy</h3>
                <p>Before you continue using our application, we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.
                </p>
                <h3>Intellectual property</h3>
                <p>You agree that all materials, products, and services provided on this Application are the property of Inani, its affiliates, directors, officers, employees, agents, suppliers, or licensors, including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the Inani’s intellectual property in any way, including electronic, digital, or new trademark registrations.
                </p>
                <p>You grant Inani a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company to agree.
                </p>
                <h3>Applicable law</h3>
                <p>By visiting this Application, you agree that the laws of Canada, without regard to principles of conflict laws, will govern these terms and conditions or any dispute of any sort that might come between Inani and you, or its business partners and associates.
                </p>
                <h3>Disputes</h3>
                <p>Any dispute relating in any way to your visit to this Application or to products you purchase from us shall be arbitrated by state or federal court. Inani, and you consent to exclusive jurisdiction and venue of such courts.
                </p>
                <h3>Indemnification</h3>
                <p>You agree to indemnify Inani and its affiliates and hold Inani harmless against legal claims and
                    demands that may arise from your use or misuse of our services. We reserve the right to select
                    our legal counsel.</p>
                <h3>Limitation on liability</h3>
                <p>Inani is not liable for any damages that may occur to you as a result of your misuse of our
                    application.
                </p>
                <p>
                    Inani reserves the right to edit, modify, and change this Agreement at any time. We shall let our
                    users know of these changes through electronic mail. This Agreement is an understanding
                    between Inani and the user, and this supersedes and replaces all prior agreements regarding the
                    use of this application.
                </p>
                <h3>Disclaimer of Warranties</h3>
                <p>YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN
                    "AS IS" AND "AS AVAILABLE" BASIS. TO THE MAXIMUM EXTENT PERMITTED BY
                    APPLICABLE LAWS, INANI EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
                    WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE
                    IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                    TITLE, AND NON-INFRINGEMENT</p>
                <p>Effective as of this date: <b>08<sup>th</sup> March 2021</b></p>
            </Container>
            <FooterOne
                backgroundColorClass="bg-gray"
                spaceTopClass="pt-100"
                spaceBottomClass="pb-70"
            />
        </>
    )
}

export default TermsAndCondition