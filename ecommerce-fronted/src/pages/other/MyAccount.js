import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Route, Switch } from "react-router";
import Sidebar from "../../components/account/sidebar";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import PersonalInfo from "../../components/account/PersonalInfo";
import ChangePassword from "./AccountChangePassword";
import ManageAddress from "./ManageAddress";
import BankDetails from "./BankDetails";
import Support from "./Support";
import Notification from "./Notification";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import Wallet from "../wallet/Wallet";
import Card from "../payment/PaymentCard";
import Profile from "../profile/Profile";
import AddEditProducts from "../profile/AddEditProducts";
import ManageBundle from "./ManageBundle";

const useStyles = makeStyles((theme) => ({
  component: {
    marginTop: 55,
    padding: "30px 6%",
    display: "flex",
  },
  leftComponent: {
    paddingRight: "15px",
  },
}));

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const classes = useStyles();

  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | My Account</title>
        <meta name="myaccount" />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="hidden">
        {/* breadcrumb */}
        <Breadcrumb />

        <div>
          <Grid container className={classes.component}>
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              className={classes.leftComponent}
            >
              <Sidebar />
            </Grid>
            <Grid
              style={{ background: "#fff" }}
              item
              lg={9}
              md={9}
              sm={12}
              xs={12}
            >
              <Switch>
                <Route exact path="/my-account">
                  <PersonalInfo />
                </Route>
                <Route exact path="/my-account/profile">
                  <Profile />
                </Route>
                <Route exact path="/my-account/profile/product">
                  <AddEditProducts />
                </Route>
                <Route exact path="/my-account/profile/product/update/:id">
                  <AddEditProducts />
                </Route>
                <Route exact path="/my-account/bundle">
                  <ManageBundle />
                </Route>
                <Route exact path="/my-account/change-password">
                  <ChangePassword />
                </Route>
                <Route exact path="/my-account/address">
                  <ManageAddress />
                </Route>
                <Route exact path="/my-account/address/:id">
                  <ManageAddress />
                </Route>
                <Route exact path="/my-account/bank-details">
                  <BankDetails />
                </Route>
                <Route exact path="/my-account/support/contact">
                  <Support />
                </Route>
                <Route exact path="/my-account/notification">
                  <Notification />
                </Route>
                <Route exact path="/my-account/payment/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/my-account/payment/transaction">
                  <Transaction />
                </Route>
                <Route exact path="/my-account/payment/card">
                  <Card />
                </Route>
                <Route exact path="/my-account/payment/wallet">
                  <Wallet />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
