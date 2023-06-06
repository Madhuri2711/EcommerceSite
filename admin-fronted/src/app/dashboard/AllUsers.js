import { Category } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Nav, Tab, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllUserAddress from "./AllUserAddress";
import AllUserBankDetails from "./AllUserBankDetails";
import AllUserOrder from "./AllUserOrder";
import AllUserProducts from "./AllUserProducts";
import AllUserReview from "./AllUserReview";
import AllUserComments from "./AllUserComments";
import UserList from "./UserList";
import AllUserCartItems from "./AllUserCartItems";
import AllUserWishList from "./AllUserWishList";
import AllUserNotification from "./AllUserNotification";
import AllUserMakeOffer from "./AllUserMakeOffer";
import AllUserTransactionHistory from "./AllUserTransactionHistory";
import { Card, Button } from "react-bootstrap";
import "../dashboard/listbasic-ui/icon.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
import UserProfile from "react-user-profile";

const theme = createTheme();

theme.typography.h2 = {
  fontSize: "1rem !important",
  "@media (min-width:600px)": {
    fontSize: "1rem !important",
  },
  "@media (min-width:280px) and (max-width:653px)": {
    fontSize: "1rem !important",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(1),
  },
  text: {
    fontSize: "20px",
    left: "45% !important",
  },
  backbutton: {
    float: "right",
    // left: '93%',
    bottom: "5px",
    position: "relative",
    height: "25px",
    "@media (min-width:300px) and (max-width:600px)": {
      left: "82%",
      bottom: "26px",
      position: "relative",
      height: "25px",
    },
    "@media (min-width:280px) and (max-width:600px)": {
      left: "70%",
      bottom: "26px",
      position: "relative",
      height: "25px",
    },
    "@media (min-width:400px) and (max-width:650px)": {
      left: "5%",
      bottom: "26px",
      position: "relative",
      height: "25px",
    },
    "@media (min-width:375px) and (max-width:670px)": {
      left: "5%",
      bottom: "26px",
      position: "relative",
      height: "25px",
    },
    "@media (min-width:280px) and (max-width:655px)": {
      left: "5%",
      bottom: "26px",
      position: "relative",
      height: "25px",
    },
  },
}));

const AllUsers = () => {
  let history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState();
  const [profileuserName, setProfileUserName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [deviceType, setdeviceType] = useState("");

  const [loading, setloading] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [review, setreview] = useState([]);
  const [address, setaddress] = useState([]);
  const [bankDetails, setbankDetails] = useState([]);
  const [comments, setcomments] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [wishList, setwishList] = useState([]);
  const [notifications, setnotifications] = useState([]);
  const [makeOffer, setmakeOffer] = useState([]);
  const [transHistory, settransHistory] = useState([]);

  const tagStyles = {
    a: {
      padding: "1rem 0.5rem",
      margin: "1px",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  const GET_USER_BYID = `${BASE_URL}user/${id}`;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(GET_USER_BYID, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data);

      const email = data.data.email;
      const img = data.data.image;
      const uname = data.data.userName;
      const fname = data.data.firstName;
      const lname = data.data.lastName;
      const deviceName = data.data.device_type;
      setUserEmail(email);
      setUserImage(img);
      setProfileUserName(uname);
      setfirstName(fname);
      setlastName(lname);
      setdeviceType(deviceName);

      setProducts(data?.data?.product);
      setOrders(data?.data?.orderlist);
      setreview(data?.data?.review);
      setaddress(data?.data?.address);
      setbankDetails(data?.data?.bank_details);
      setcomments(data?.data?.comment);
      setcartItems(data?.data?.cart);
      setwishList(data?.data?.whishlist);
      setnotifications(data?.data?.notification);
      setmakeOffer(data?.data?.makeoffer);
      settransHistory(data?.data?.wallet);
      // setusers(data?.data)

      setloading(false);
    } catch (e) {
      setloading(false);
      console.log(e);
    }
  };

  const backbtn = () => {
    history.push("/users");
  };

  // console.log(address);

  return (
    <>
      <Tab.Container
        id="left-tabs-example"
        className="d-flex flex-row tabcustom"
        defaultActiveKey="userProducts"
      >
        <Card>
          <div className="card-header">
            <div className={classes.backbutton}>
              <Button variant="primary" onClick={backbtn}>
                Back
              </Button>
            </div>
          </div>
          <Card.Body>
            {/* <div style={{ margin: "0 auto", width: "100%" }}>
              <UserProfile
                photo={userImage}
                userName={profileuserName}
                email={userEmail}
              />
            </div> */}
            <hr />
            <Container>
              <Row md={4}>
                <Col>
                  <div style={{marginTop:'10px',right:'5px'}}>
                    {loading ? (
                      <div>{""}</div>
                    ) : (
                      <div>
                        <img
                          src={`https://inani-hub.s3.amazonaws.com/${userImage}`}
                          alt="userProfile"
                          style={{
                            marginRight: "2px",
                            width: "90px",
                            height: "90px",
                            borderRadius: "100px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Col>
                <Col
                  xs={6}
                  style={{
                    margin: "0 auto",
                    right: "35%",
                    top: "10px",
                  }}
                >
                  {loading ? (
                    <div>{""}</div>
                  ) : (
                    <div>
                      {`Name:   ${firstName + "  " + lastName}`}
                      <br />
                      <Card.Text
                        style={{
                          fontSize: "1rem !important",
                        }}
                      >
                        {`UserName:   ${profileuserName}`}
                        <br />
                        <div
                          style={{
                            fontSize: "1rem !important",
                          }}
                        >{`Email:   ${userEmail}`}</div>
                        <div>{`Device-Type:  ${deviceType}`}</div>
                      </Card.Text>
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
            <hr />
            <Nav fill variant="tabs" className="flex-row">
              <Nav.Item className="m-0">
                <Nav.Link eventKey="userProducts" style={tagStyles.a}>
                  Products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="orders" style={tagStyles.a}>
                  Orders
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item className='m-0'>
                        <Nav.Link eventKey="cart" style={tagStyles.a} >Cart Items</Nav.Link>
                    </Nav.Item> */}
              <Nav.Item className="m-0">
                <Nav.Link eventKey="whishlist" style={tagStyles.a}>
                  Wishlist
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="comments" style={tagStyles.a}>
                  Comments
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="review" style={tagStyles.a}>
                  Reviews
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="makeOffer" style={tagStyles.a}>
                  Make Offers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="transHistory" style={tagStyles.a}>
                  Transaction History
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="notifications" style={tagStyles.a}>
                  Notifications
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="bankDetails" style={tagStyles.a}>
                  Bank Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="m-0">
                <Nav.Link eventKey="address" style={tagStyles.a}>
                  Address
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="userProducts">
                <AllUserProducts
                  products={products}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="orders">
                <AllUserOrder
                  orders={orders}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="cart">
                <AllUserCartItems
                  cartItems={cartItems}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="whishlist">
                <AllUserWishList
                  wishList={wishList}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="transHistory">
                <AllUserTransactionHistory
                  transHistory={transHistory}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="makeOffer">
                <AllUserMakeOffer
                  makeOffer={makeOffer}
                  message={message}
                  loading={loading}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="notifications">
                <AllUserNotification
                  notifications={notifications}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="comments">
                <AllUserComments
                  comments={comments}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="review">
                <AllUserReview
                  review={review}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="address">
                <AllUserAddress
                  address={address}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="bankDetails">
                <AllUserBankDetails
                  bankDetails={bankDetails}
                  loading={loading}
                  message={message}
                />
              </Tab.Pane>
            </Tab.Content>
          </Card.Body>
        </Card>
      </Tab.Container>
    </>
  );
};

export default AllUsers;
