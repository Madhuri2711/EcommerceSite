import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { getDashboard } from "../../services/profile.service";

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
}));

const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const res = await getDashboard();
    if (res?.status === 200) {
      setData(res?.data);
    }
  };

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Dashboard</Typography>
        <div>
          <div className="container mt-1">
            <div className="row ">
              <div className="col-md-12 bg-gray border border-white p-3 ">
                <p className="text">Today</p>
                <h3 className="text">
                  $ {data?.dashboard?.today?.amount}
                </h3>
                <p className=" text">
                  {data?.dashboard?.today?.count} Orders
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 bg-gray border border-white p-3 ">
                <p className=" text">Yesterday</p>
                <h3 className=" text">
                  $ {data?.dashboard?.yesterday?.amount}
                </h3>
                <p className=" text">
                  {data?.dashboard?.yesterday?.count} Orders
                </p>
              </div>
              <div className="col-md-6 bg-gray border border-white p-3 ">
                <p className=" text">This week</p>
                <h3 className=" text">
                  $ {data?.dashboard?.week?.amount}
                </h3>
                <p className=" text">
                  {data?.dashboard?.week?.count} Orders
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 bg-gray border border-white p-3 ">
                <p className=" text">This month</p>
                <h3 className=" text">
                  $ {data?.dashboard?.month?.amount}
                </h3>
                <p className=" text">
                  {data?.dashboard?.month?.count} Orders
                </p>
              </div>
              <div className="col-md-6 bg-gray border border-white p-3 ">
                <p className=" text">This Year</p>
                <h3 className=" text">
                  $ {data?.dashboard?.all_time?.amount}
                </h3>
                <p className=" text">
                  {" "}
                  {data?.dashboard?.all_time?.count} Orders
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mt-3">Rejected one</h4>
          </div>
          <div className="container mt-2">
            <div className="row">
              <div className="col-md-12  dashboard-border   p-3 ">
                <p>Today</p>
                <h3>$ {data?.declined?.today?.amount}</h3>
                <p>{data?.declined?.today?.count} Orders</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6  dashboard-border   p-3 ">
                <p>Yesterday</p>
                <h3>$ {data?.declined?.yesterday?.amount}</h3>
                <p>{data?.declined?.yesterday?.count} Orders</p>
              </div>
              <div className="col-md-6 dashboard-border   p-3 ">
                <p>This week</p>
                <h3>$ {data?.declined?.week?.amount}</h3>
                <p>{data?.declined?.week?.count} Orders</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6  dashboard-border  p-3 ">
                <p>This month</p>
                <h3>$ {data?.declined?.month?.amount}</h3>
                <p>{data?.declined?.month?.count} Orders</p>
              </div>
              <div className="col-md-6  dashboard-border  p-3 ">
                <p>This Year</p>
                <h3>$ {data?.declined?.all_time?.amount}</h3>
                <p>{data?.declined?.all_time?.count} Orders</p>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
export default Dashboard;
