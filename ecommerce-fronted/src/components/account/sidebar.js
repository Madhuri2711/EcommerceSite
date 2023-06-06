import React, { useCallback, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportIcon from "@mui/icons-material/Support";
import { femaleAvatarUrl, maleAvatarUrl } from "../../constant/data";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../slices/auth";
import { fetchUserDetails } from "../../slices/user.details";
import { IMG_URL } from "../../lib/constant";
import swal from "sweetalert";
import { removeUser } from "../../services/profile.service";
// import toastMessage from "../../utils/toastMessage";
// import { setIsAuthenticate, setUserInfo } from "../../actions/userActions";
// import { clearCart } from "../../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  //   component: {
  //     marginTop: 55,
  //     padding: "30px 135px",
  //     display: "flex",
  //     [theme.breakpoints.down("sm")]: {
  //       padding: "15px 0",
  //     },
  //   },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  //   leftComponent: {
  //     // width: '67%',
  //     paddingRight: 15,
  //     [theme.breakpoints.down("sm")]: {
  //       marginBottom: 15,
  //     },
  //   },
  header: {
    padding: "10px 24px",
    paddingLeft: 15,
    marginBottom: 15,
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
  },
  bottom: {
    minHeight: "500px",
    padding: "16px 22px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
  },
  large: {
    // width: theme.spacing(6.5),
    // height: theme.spacing(6.5),
  },
  smallText: {
    fontSize: 12,
    opacity: 0.8,
  },
  boldText: {
    color: "#2C3E50",
    fontSize: 16,
    fontWeight: 600,
  },
  divider: {
    opacity: "0.6",
    marginBottom: 20,
  },
  sideBarLink: {
    display: "flex",
    alignItems: "center",
    color: "#878787",
    padding: "12px 0 12px 5px",
    fontSize: 16,
    fontWeight: 500,
  },
  sideBarLinkIcon: {
    color: "#F47240",
    marginRight: 15,
  },
  subMenu: {
    padding: "5px 0 10px 0",
  },
  subLink: {
    color: "#2C3E50",
    padding: "12px 5px 12px 45px",
    fontSize: 14,
  },
  hoverTab: {
    "&:hover": {
      fontWeight: 500,
      color: "#000",
      backgroundColor: "#fbdead",
    },
  },
  deleteAccount: {
    WebkitBoxShadow: "3px 10px 14px -2px rgba(0,0,0,0.75)",
    MozBoxShadow: "3px 10px 14px -2px rgba(0,0,0,0.75)",
    boxShadow: "3px 10px 14px -2px rgba(0,0,0,0.75)",
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useSelector((state) => state.user);
  const histroy = useHistory();
  useEffect(() => {
    const id = localStorage.getItem("userid");
    dispatch(fetchUserDetails(id));
  }, [dispatch]);

  const activeStyle = {
    fontWeight: 500,
    color: "#000",
    backgroundColor: "#fbdead",
  };

  const logOut = useCallback(() => {
    window.location.reload(false);
    dispatch(logout());
  }, [dispatch]);
  
  const deleteUser = async () => {
    const id = localStorage.getItem("userid");
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see your account!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        catch: "Delete",
      },
      
      // confirmButtonColor: "#DD6B55",
      // cancelButtonColor: "#DD6B55",
      //   confirmButtonText: "Yes, delete it!",
      //   cancelButtonText: "No, cancel plx!"
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await removeUser(id);
        console.log(response);
        if (response?.data?.isSuccess) {
          swal("Your account has been deleted!", {
            icon: "warning",
          });
          dispatch(logout());
          histroy.push("/");
        }
      } else {
        swal("Your account has been safe!");
      }
    });
  };
  return (
    <>
      <Box boxShadow={1} className={classes.header}>
        <Box className={classes.profileWrapper}>
          <Avatar
            alt="Avatar"
            src ="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            // src={
            //   !user?.image
            //     ? "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            //     : `${user?.image}`
            //}
            className={classes.large}
          />
          <Box style={{ paddingLeft: 15 }}>
            <Typography className={classes.smallText}>Hello,</Typography>
            {/* <Typography className={classes.boldText}>{`${user?.fname} ${user?.lname}`}</Typography> */}
            <Typography className={classes.boldText}>
              {!user?.firstName && !user?.lastName
                ? "Inani Customer"
                : user?.firstName + " " + user?.lastName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.bottom}>
        {/* <Link to="/">
          <Box className={clsx(classes.sideBarLink, classes.hoverTab)}>
            <img src="/order-icon.svg" className={classes.sideBarLinkIcon} />
            <p>MY ORDERS</p>
            <ChevronRightIcon style={{ marginLeft: "auto" }} />
          </Box>
        </Link>
        <Divider className={classes.divider} style={{ marginTop: 5 }} /> */}
        <Box className={classes.sideBarLink}>
          <PersonIcon className={classes.sideBarLinkIcon} />
          <p>ACCOUNT SETTINGS</p>
        </Box>
        <Box className={classes.subMenu}>
          <Link to="/my-account">
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={currentPath === "/my-account" ? activeStyle : {}}
            >
              Edit Profile
            </Typography>
          </Link>
          <Link to="/my-account/change-password">
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={
                currentPath === "/my-account/change-password" ? activeStyle : {}
              }
            >
              Change Password
            </Typography>
          </Link>
          <Link to="/my-account/notification">
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={
                currentPath === "/my-account/notification" ? activeStyle : {}
              }
            >
              Notification
            </Typography>
          </Link>
          <Link to="/my-account/address" aria-disabled={true}>
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={currentPath === "/my-account/address" ? activeStyle : {}}
            >
              Manage Addresses
            </Typography>
          </Link>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.sideBarLink}>
          <PersonIcon className={classes.sideBarLinkIcon} />
          <p>My Products</p>
        </Box>
        <Box className={classes.subMenu}>
          <Link to="/my-account/profile">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Profile
            </Typography>
          </Link>
          <Link to="/my-account/profile/product">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Product
            </Typography>
          </Link>
          {/* <Link to="/my-account/bundle">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Bundle
            </Typography>
          </Link> */}
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.sideBarLink}>
          <PaymentIcon className={classes.sideBarLinkIcon} />
          <p>PAYMENTS</p>
        </Box>
        <Box className={classes.subMenu}>
          {/* <Link to="/my-account/payment/wallet">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Wallet
            </Typography>
          </Link> */}
          <Link to="/my-account/payment/transaction">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Transaction History
            </Typography>
          </Link>
          {/* <Link to="/my-account/payment/dashboard">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Dashboard
            </Typography>
          </Link> */}
          <Link to="/my-account/payment/card">
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Saved Cards
            </Typography>
          </Link>
          <Link to="/my-account/bank-details" aria-disabled={true}>
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={
                currentPath === "/my-account/bank-details" ? activeStyle : {}
              }
            >
              Bank Details
            </Typography>
          </Link>
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.sideBarLink}>
          <SupportIcon className={classes.sideBarLinkIcon} />
          <p>Support</p>
        </Box>
        <Box className={classes.subMenu}>
          <Link to="/my-account/support/contact">
            <Typography
              className={clsx(classes.subLink, classes.hoverTab)}
              style={
                currentPath === "/my-account/support/contact" ? activeStyle : {}
              }
            >
              Contact
            </Typography>
          </Link>
          {/* <Link
            to={{
              pathname:
                "https://play.google.com/store/apps/details?id=com.service.inanihub",
            }}
            target="_blank"
          >
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Feedback
            </Typography>
          </Link> */}
          <Link
            to={{ pathname: "/privacy-policy" }}
          >
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Privacy Policy
            </Typography>
          </Link>
          <Link
            to={{ pathname: "/terms-and-conditions" }}
          >
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Terms and Condition
            </Typography>
          </Link>
        </Box>
        <Divider className={classes.divider} />
        <Box
          className={clsx(classes.sideBarLink, classes.hoverTab)}
          style={{ cursor: "pointer" }}
        >
          <LogoutIcon className={classes.sideBarLinkIcon} />
          <Link to={process.env.PUBLIC_URL + "/"} onClick={logOut}>
            {/* <Typography className={clsx(classes.subLink, classes.hoverTab)}> */}
            Logout
            {/* </Typography> */}
          </Link>
        </Box>
      </Box>
      <Box
        boxShadow={1}
        style={{ cursor: "pointer", marginLeft: "15px" ,marginBottom:'15px'}}
        className={clsx(classes.sideBarLink, classes.hoverTab)}
      >
        <Typography
          className={clsx(classes.subLink)}
          onClick={() => deleteUser()}
        >
          Delete My Account
        </Typography>
      </Box>
    </>
  );
}
