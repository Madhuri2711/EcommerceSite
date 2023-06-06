import React, { useEffect, useState } from "react";
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
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
}));

const headCells = [
  { id: "name", label: "Product Detail" },
  { id: "product_code", label: "Product Code" },
  { id: "comment", label: "Comments" },
  { id: "created_date", label: "Created Date" },
];
const AllUserComments = ({ comments, loading, Message }) => {
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
    useTable(comments, headCells, filterFn);

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
                    {/* <TableCell>{item?.indexNewNumber}</TableCell> */}
                    <TableCell style={{ textTransform: "capitalize" }}>
                      <div className="d-flex">
                        <div>
                          {item?.product_id.images && loading ? (
                            <img
                              src={`${IMAGE_URL}${item?.product_id.images[0]}`}
                              alt="product-image"
                              style={{
                                marginRight: "2px",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "bold" }}> Name: </span>
                            {item?.product_id.name}
                          </p>                         
                          <p style={{ fontSize: "13px", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "bold" }}> Brand: </span>
                            {item?.product_id.brand}
                          </p>
                        </div>
                      </div>
                    </TableCell>                    
                    <TableCell>{item?.product_id.product_code}</TableCell>
                    <TableCell>{item?.comment}</TableCell>
                    <TableCell>
                      {moment(item?.created_date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      {/* <Link to={`/admin/sub-category/update/${item._id}`}>
                                            <Controls.ActionButton
                                                color="primary"
                                            >
                                                <EditOutlinedIcon fontSize="small" className='iconcolor' />
                                            </Controls.ActionButton>
                                        </Link> */}
                      {/* <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { deleteUser(item?._id, item?.is_delete) }
                                                    })
                                                }}>
                                                <DeleteIcon fontSize="small" className='iconcolor' />
                                            </Controls.ActionButton> */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TblContainer>
          {comments.length == 0 && !loading ? (
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

export default AllUserComments;
