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
  tableRow: {
    height: 22,
  },
  tableCell: {
    padding: "0px 14px",
    marginRight:'5px'
  },
}));

const headCells = [
  // { id: "products[0].product_id.images", label: "Product Image" },
  { id: "products[0].product_id.name", label: "Product Name" },
  { id: "products[0].product_id.brand", label: "Product Brand" },
  { id: "products[0].qty", label: "Product Quantity" },
  { id: "total_price", label: "Price" },
  { id: "created_date", label: "Created Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Orders() {
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
  const [loading, setloading] = useState(false);
  const [Message, setMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const FETCH_ALL_ORDERS = `${BASE_URL}order`;

  let history = useHistory();

  console.log("orders", orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_ORDERS, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data);
      if (data.data === "" && data.data === undefined) {
        setMessage("No Data Found.");
      }
      setOrders(data?.data);
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(orders, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x?.products[0].product_id.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <div className="heading">
        <h2>Orders</h2>
      </div>
      <MaUTable>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Products"
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
                  <TableRow key={item._id} className={classes.tableRow}>
                    {/* <TableCell className={classes.tableCell} align="left">
                      <div>
                        <div>
                          {item?.products[0].product_id.images && loading ? (
                            <img
                              src={`https://inani-hub.s3.amazonaws.com/${item?.products[0].product_id.images[0]}`}
                              alt="product-image"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </TableCell> */}
                    <TableCell>{item?.products[0]?.product_id?.name ? item?.products[0]?.product_id?.name : '-' }</TableCell>
                    <TableCell>{item?.products[0]?.product_id?.brand ? item?.products[0]?.product_id?.brand : '-'}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {item?.products[0]?.qty}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                    >{`$${item?.total_price}`}</TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(item.created_date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Link
                        to={{
                          pathname: `/admin/order/update/${item._id}`,
                          state: { orders: item },
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
