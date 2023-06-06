import React from "react";
import { Col, Row } from "react-bootstrap";

function Sellers({ sellersData }) {
  return (
    <div className="sellers">
      <div className="head">
        <h2>{sellersData?.howItworksTitle || "How It Works"}</h2>
        <hr />
      </div>
      <Row className="body">
        <Col className="left">
          <div className="outer-div">
            <div className="inner-div">
              <img
                className="mobile-img-sellers"
                src={require("../assets/img/ceosection/selllersimg.png")}
                alt=""
              />
            </div>
          </div>
        </Col>
        <Col className="right">
          <div className="points">
            <h2>{sellersData?.SellerTitle || "Sellers"}</h2>
            <ol
              dangerouslySetInnerHTML={{
                __html:
                  sellersData?.SellerStepsInfo[0] ||
                  `<li>
                            <span>Sign up – </span>
                            It is easy and convenient with multiple ways of signing up to use the Inani platform.
                        </li>
                        <li>
                            <span>List an item – </span>
                            Listing an item is quite easy. Select the item you want to sell, confirm that it is in a good condition, take pictures of the item showing various angles and upload it to your closet.
                        </li>
                        <li>
                            <span>Setup- </span>
                            Set a product price and discounted price
                        </li>
                        <li>
                            <span>Earn Cash – </span>
                            When a sale is made, you get a prepaid shipping label sent with instructions. Attach the shipping label to the item and drop off at any Canada post near you. Earn cash when your listings are delivered.
                        </li>`,
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Sellers;
