import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../slices/user.details";
import { IMG_URL } from "../../lib/constant";
import { Avatar } from "@mui/material";
import { getAllTranscation } from "../../services/transaction.service";
import { useState } from "react";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 0 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "auto",
    paddingBottom: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  large: {
    width: "100px !important",
    height: "100px !important",
    marginLeft: "10px",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "20px",
    backgroundColor: "#fbdead",
    borderRadius: "10px",
    height: "150px",
  },
}));

const Transaction = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("userid");
    dispatch(fetchUserDetails(id));
  }, [dispatch]);

  useEffect(() => {
    getTransactionList();
  }, []);

  const getTransactionList = async () => {
    const response = await getAllTranscation();
    if (response?.isSuccess) {
      setTransactionData(response?.data);
    }
  };

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Transaction History</Typography>
        <Tabs
          defaultActiveKey="mypurchase"
          id="justify-tab-example"
          className="transaction-tab mb-3"
          justify
        >
          <Tab eventKey="mypurchase" title="My Purchase">
            <Box className={classes.profileWrapper}>
              <Avatar
                alt="Avatar"
                src={
                  !user?.image
                    ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
                    : `${user?.image}`
                }
                className={classes.large}
              />
              <Box style={{ paddingLeft: "45px" }}>
                <Typography className={classes.smallText}>
                  Welcome Back
                </Typography>
                <Typography className={classes.boldText}>
                  {user?.firstName + " " + user?.lastName}
                </Typography>
                <Typography className={classes.boldText}>
                  {"Feb 24th, 2023"}
                </Typography>
              </Box>
              <Box style={{ paddingLeft: "45px" }}>
                <Typography
                  className={classes.smallText}
                >{`$ ${transactionData?.purchase?.amount}`}</Typography>
                <Typography className={classes.boldText}>
                  {"Total Expense"}
                </Typography>
              </Box>
            </Box>
            <Box>
              {transactionData &&
                transactionData?.purchase?.list?.length > 0 ? (
                transactionData?.purchase?.list?.map((seller) => {
                  return (
                    <>
                      <div className="container">
                        <div className="sellerTransaction row">
                          <div className="col-md-6 d-flex justify-content-start align-items-center">
                            {moment(seller?.ordered_date).format('MMMM Do YYYY, h:mm:ss a')}
                          </div>
                          <div className="col-md-6 text-right">
                            <div className="sellingprice">{`${"+ $"}${seller?.items_price
                              }`}</div>
                            <div className="label">
                              {"85% of sale price"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <img
                  className="emptydataImg"
                  src={require("../../assets/img/emptydata/EmptyData.png")}
                  alt="emptyDataImg"
                />
              )}
            </Box>
          </Tab>
          <Tab eventKey="mysale" title="My Sale">
            <Box className={classes.profileWrapper}>
              <Avatar
                alt="Avatar"
                src={
                  !user?.image
                    ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
                    : `${user?.image}`
                }
                className={classes.large}
              />
              <Box style={{ paddingLeft: "45px" }}>
                <Typography className={classes.smallText}>
                  Welcome Back
                </Typography>
                <Typography className={classes.boldText}>
                  {user?.firstName + " " + user?.lastName}
                </Typography>
                <Typography className={classes.boldText}>
                  {"Feb 24th, 2023"}
                </Typography>
              </Box>
              <Box style={{ paddingLeft: "45px" }}>
                <Typography className={classes.smallText}>
                  {`$ ${transactionData?.seller?.amount}`}
                </Typography>
                <Typography className={classes.boldText}>
                  {"Total Earning"}
                </Typography>
              </Box>
            </Box>

            <Box>
              {transactionData && transactionData?.seller?.list?.length > 0 ? (
                transactionData?.seller?.list?.map((seller) => {
                  return (
                    <>
                      <div className="container">
                        <div className="sellerTransaction row">
                          <div className="col-md-6 text-left">
                            <div className="sellingprice">{`${"+ $"}${seller?.items_price
                              }`}</div>
                            <div className="">{moment(seller?.ordered_date).format('MMMM Do YYYY, h:mm:ss a')}</div>
                          </div>
                          <div className="col-md-6 d-flex justify-content-end">
                            {"85% of sale price"}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <img
                  className="emptydataImg"
                  src={require("../../assets/img/emptydata/EmptyData.png")}
                  alt="emptyDataImg"
                />
              )}
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </>
  );
};

export default Transaction;


// 
{/* <div className="col-md-6 col-lg-6 col-sm-12">
{moment(seller?.ordered_date).format('MMMM Do YYYY, h:mm:ss a')}
</div>
<div className="ml-2 col-md-6 col-lg-6 col-sm-12">
<div className="sellingprice">{`${"+ $"}${seller?.items_price
  }`}</div>
<div className="label">
  {"85% of sale price"}
</div>
</div> */}

// 
{/* <div className="sellingprice">{`${"+ $"}${seller?.items_price
}`}</div>
<div className="col-md-6">{seller?.ordered_date}</div>
<div className="row ml-2">
<div className="col-md-6 d-flex justify-content-end label">
  
</div>
</div> */}