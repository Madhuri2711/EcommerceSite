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
  { id: "first_name", label: "FullName" },
  { id: "phone_number", label: "Contact No." },
  { id: "address", label: "Town" },
  { id: "city", label: "City" },
  { id: "state", label: "State" },
  { id: "country", label: "Country" },
  { id: "postal_code", label: "Postal Code" },
  { id: "default", label: "Default Address" },
  { id: "created_date", label: "Created Date" },
  // { id: 'actions', label: 'Actions', disableSorting: true }
];
const AllUserAddress = ({ address, loading, Message }) => {
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
    useTable(address, headCells, filterFn);
  // console.log(recordsAfterPagingAndSorting())
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.first_name.toLowerCase().includes(target.value)
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
            {/* <Controls.Button
                        text="Add New"
                        variant="outlined"
                        color="newbtn"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={AddNewCategory}
                    /> */}
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
                    <TableCell>
                      {item?.first_name + " " + item?.last_name}
                    </TableCell>
                    <TableCell>{item?.phone_number}</TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.address}
                    </TableCell>
                    {/* <TableCell>
                                        <img width={100} src={item?.image} />
                                    </TableCell> */}
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.city}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.state}
                    </TableCell>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.country}
                    </TableCell>
                    <TableCell>{item?.postal_code}</TableCell>

                    <TableCell>
                      {item?.is_default === true ? (
                        <h4>
                          <Badge bg="success">Yes</Badge>
                        </h4>
                      ) : (
                        <h4>
                          {" "}
                          <Badge bg="danger">No</Badge>{" "}
                        </h4>
                      )}
                      {/* {item?.is_default === true ?
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        //onConfirm: () => { isActiveUser(item?._id, item?.is_active) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Yes</span> :
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        // onConfirm: () => { isActiveUser(item?._id, item?.is_active) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>No</span>}
                                                 */}
                    </TableCell>
                    {/* <TableCell>{item?.otherImage}</TableCell> */}
                    {/* < TableCell >
                                        {item?.is_delete === true ?
                                            <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span>
                                            :
                                            <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>Deleted</span>}
                                    </TableCell> */}
                    <TableCell>
                      {moment(item?.created_date).format("DD-MM-YYYY")}
                    </TableCell>
                    {/* <TableCell> */}
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
                    {/* </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </TblContainer>
          {address.length == 0 && !loading ? (
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

export default AllUserAddress;
