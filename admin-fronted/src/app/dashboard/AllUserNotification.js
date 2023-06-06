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
  price:{
    fontSize:"15px",
  },
}));

const headCells = [
  // { id: 'id', label: 'Id' },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "type", label: "Type" },
  // { id: 'image', label: 'Image' },
  { id: "price", label: "Price" },
  { id: "created_date", label: "Created Date" },
];
const AllUserNotification = ({ notifications, loading, Message }) => {
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
    useTable(notifications, headCells, filterFn);
  // console.log(recordsAfterPagingAndSorting())
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.title.toLowerCase().includes(target.value)
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
              label="Search Notification By Title"
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
                    {/* <TableCell>{item?.indexNewNumber}</TableCell> */}

                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.title}
                    </TableCell>
                    {/* <TableCell>
                                        <img width={100} src={item?.image} />
                                    </TableCell> */}
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.description}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.type}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item.price ? (
                        <h4 className={classes.price}>{`$${item?.price}`}</h4>
                      ) : (
                        <h4>{""}</h4>
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(item?.created_date).format("DD-MM-YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TblContainer>
          {notifications.length == 0 && !loading ? (
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

export default AllUserNotification;
