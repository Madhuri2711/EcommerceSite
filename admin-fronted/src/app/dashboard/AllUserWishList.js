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
import useTable from "./listbasic-ui/useTable";
import Controls from "./listbasic-ui/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Notification from "./listbasic-ui/Notification";
import ConfirmDialog from "./listbasic-ui/ConfirmDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import "../dashboard/listbasic-ui/icon.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "./listbasic-ui/LoadingSpinner";
import Box from "@mui/material/Box";
import MaUTable from "@material-ui/core/Table";
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
  {id:"name",label:"Product Name"},
  {id:"brand",label:"Product Brand"},
  { id: "created_date", label: "Created Date" },
];
const AllUserWishList = ({ wishList, loading, Message }) => {
  const classes = useStyles();
  // const [users, setusers] = useState([]);
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
    useTable(wishList, headCells, filterFn);
  // console.log(recordsAfterPagingAndSorting())
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.product_id.name.toLowerCase().includes(target.value)
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
                    <TableCell>{item?.product_id.name}</TableCell>
                    <TableCell>{item?.product_id.brand}</TableCell>
                    <TableCell>
                      {moment(item?.created_date).format("DD-MM-YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TblContainer>
          {wishList.length == 0 && !loading ? (
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

export default AllUserWishList;
