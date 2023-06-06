import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  getWalletBalance,
  getWalletTransaction,
} from "../../services/wallet.service";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 30px 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "auto",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  wallet: {
    borderRadius: "15px",
    height: "200px",
    width: "250px",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundImage: "none",
    overflow: "hidden",
    position: "relative",
    zIndex: 0,
    paddingTop: "40px",
    paddingBottom: "40px",
    boxShadow: "none",
    textAlign: "center",
  },
  balancelabel: {
    fontWeight: "400px",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  walletbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    margin: "auto auto 24px",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: "64px",
    height: "64px",
    justifyContent: "center",
    color: "rgb(0, 123, 85)",
    backgroundImage:
      "linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)",
  },
}));

const Wallet = () => {
  const classes = useStyles();
  const [WalletData, setWalletData] = useState();
  const [WalletTransaction, setWalletTransaction] = useState([]);

  useEffect(() => {
    loadWalletDetails();
    loadWalletTransaction();
  }, []);

  const loadWalletDetails = async () => {
    try {
      const response = await getWalletBalance();
      if (response.isSuccess) {
        setWalletData(response?.data);
      }
    } catch (error) {
      return error;
    }
  };

  const loadWalletTransaction = async () => {
    try {
      const response = await getWalletTransaction();
      if (response.isSuccess) {
        setWalletTransaction(response?.data);
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Wallet</Typography>
        <div className={classes.walletbox}>
          <Box
            className={classes.wallet}
            style={{
              color: "rgb(0, 82, 73)",
              backgroundColor: "rgb(200, 250, 205)",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "rgb(0, 123, 85)",
                backgroundImage:
                  "linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)",
              }}
            >
              <AccountBalanceWalletIcon />
            </div>
            <p className={classes.balancelabel}>
              Wallet Amount : {`$${WalletData?.wallet_amount}`}
            </p>
          </Box>
          <Box
            className={classes.wallet}
            style={{
              color: "rgb(4, 41, 122)",
              backgroundColor: "rgb(208, 242, 255)",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "rgb(12, 83, 183)",
                backgroundImage:
                  "linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
              }}
            >
              <CreditScoreIcon />
            </div>
            <p className={classes.balancelabel}>
              Credited Amount : {`$${WalletTransaction?.credit_amount}`}
            </p>
          </Box>
          <Box
            className={classes.wallet}
            style={{
              color: "rgb(122, 79, 1)",
              backgroundColor: "rgb(255, 247, 205)",
            }}
          >
            <div
              className={classes.icon}
              style={{
                color: "rgb(183, 129, 3)",
                backgroundImage:
                  "linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)",
              }}
            >
              <WalletIcon />
            </div>
            <p className={classes.balancelabel}>
              Debited Amount : {`$${WalletTransaction?.debit_amount}`}
            </p>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Wallet;
