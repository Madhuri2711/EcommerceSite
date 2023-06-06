import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 0 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "970px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  notificationImg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "15px",
    backgroundColor: "rgb(244, 246, 248)",
    borderRadius: "10px",
    height: "100px",
  },
  boldText: {
    color: "#8995a0",
  },
  large: {
    width: "100px !important",
    height: "70px !important",
    marginLeft: "10px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Products</Typography>
        <Box className={classes.notificationImg}>
          <Avatar
            alt="Avatar"
            src={
              "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg"
            }
            className={classes.large}
          />
          <Box style={{ paddingLeft: 15 }}>
            <Typography className={clsx(classes.subLink, classes.hoverTab)}>
              Redeem on Fashion, Beauty, Electronics & more on the Big Billion
              Days! Shop Now.
            </Typography>
            <Typography className={classes.boldText}>
              {"26-sep-2022"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Profile;

