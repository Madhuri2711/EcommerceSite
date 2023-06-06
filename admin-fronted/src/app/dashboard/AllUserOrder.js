import React, { useEffect, useState } from "react";
import { BASE_URL, TOKEN } from "../../lib/constant";
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
  { id: "product_id.name", label: "Product Name" },
  { id: "order_id", label: "Order Id" },
  { id: "payment_method", label: "Payement Method" },
  { id: "total_price", label: "Price" },
  { id: "status", label: "Status" },
  { id: "address", label: "Address" },
  { id: "delivery", label: "Delivery status" },
  { id: "payment", label: "Payment Succeed!" },
];
const AllUserOrder = ({ orders, loading, Message }) => {
  const classes = useStyles();
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

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(orders, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.products[0].product_id.name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  return (
    <>
      <MaUTable>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search By Product Name"
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

            <TableBody>
              {loading ? (
                <LoadingSpinner />
              ) : (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?.products[0].product_id.name}</TableCell>
                    <TableCell>{item?.order_id}</TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.payment_method}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {`$${item?.total_price}`}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.status}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.address?.address}, {item?.address?.city},
                      {item?.address?.state}, {item?.address?.country},
                      {item?.address?.postal_code},
                      {item?.address?.phone_number}
                    </TableCell>
                    <TableCell>
                      {item?.is_delivered === true ? (
                        <h4>
                          <Badge bg="success">Yes</Badge>
                        </h4>
                      ) : (
                        <h4>
                          <Badge bg="danger">No</Badge>
                        </h4>
                      )}
                      {/* {item?.is_delivered === true ?
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        //onConfirm: () => { isActiveUser(item?._id, item?.is_active) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Delivered</span> :
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        // onConfirm: () => { isActiveUser(item?._id, item?.is_active) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>On Way</span>} */}
                    </TableCell>
                    <TableCell>
                      {item?.is_payment_success === true ? (
                        <h4>
                          <Badge bg="success">Yes</Badge>
                        </h4>
                      ) : (
                        <h4>
                          {" "}
                          <Badge bg="danger">No</Badge>
                        </h4>
                      )}
                      {/* {item?.is_payment_success === true ?
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Yes</span>
                                                :
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>No</span>}
                                                 */}
                    </TableCell>
                    {/* <TableCell>
                                            {
                                                moment(item?.ordered_date).format("DD-MM-YYYY")
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                moment(item?.created_date).format("DD-MM-YYYY")
                                            }
                                        </TableCell> */}
                    {/* <TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </TblContainer>
          {orders.length == 0 && !loading ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {"No Data Found."}
            </div>
          ) : (
            ""
          )}
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
};

export default AllUserOrder;
