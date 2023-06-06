import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../dashboard/listbasic-ui/useTable";
import Controls from "../dashboard/listbasic-ui/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Notification from "../dashboard/listbasic-ui/Notification";
import ConfirmDialog from "../dashboard/listbasic-ui/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import "../dashboard/listbasic-ui/icon.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "./listbasic-ui/LoadingSpinner";
import Box from "@mui/material/Box";
import MaUTable from "@material-ui/core/Table";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
import { Badge } from "react-bootstrap";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "75%",
    position: "absolute",
    left: "0px",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "user_id.firstName", label: "Name" },
  { id: "amount", label: "Amount" },
  { id: "is_payment_success_to_user", label: "Payment" },
  { id: "created_date", label: "Created Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Payment_Checkout() {
  const classes = useStyles();
  const [checkout, setCheckout] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [loading, setloading] = useState(false);
  const [Message, setMessage] = useState("");

  const FETCH_ALL_PAYMENT_CHECKOUT = `${BASE_URL}payment`;

  let history = useHistory();

  useEffect(() => {
    paymentCheckout();
  }, []);

  const paymentCheckout = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_PAYMENT_CHECKOUT, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data);
      if(data.data === "" && data.data === undefined){
        setMessage("No Data Found.")
      }
      setCheckout(data?.data);
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(checkout, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x?.user_id?.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  console.log(checkout);

  return (
    <>
      <div className="heading">
        <h2>Payment Checkout</h2>
      </div>
      <MaUTable>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Users"
              className={classes.searchInput}
              id="standard-size-small"
              size="small"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            {
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  left: "50%",
                }}
              >
                {Message}
              </Box>
            }
            <TableBody>
              {loading ? (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?.user_id.firstName + " " + item?.user_id.lastName}</TableCell>
                    <TableCell>{item?.amount}</TableCell>
                    <TableCell>
                      {item?.is_payment_success_to_user === true ? (
                        <h4>
                          <Badge bg="success">Yes</Badge>
                        </h4>
                      ) : (
                        <h4>
                          <Badge bg="danger">No</Badge>
                        </h4>
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(item.created_date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={{
                          pathname: `/admin/payment/checkout/${item._id}`,
                          state: { checkout: item },
                        }}
                      >
                        <Controls.ActionButton
                          color="primary"
                          className="iconbox"
                        >
                          <EditOutlinedIcon
                            fontSize="small"
                            className="iconcolor"
                          />
                        </Controls.ActionButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <LoadingSpinner />
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Paper>
      </MaUTable>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
