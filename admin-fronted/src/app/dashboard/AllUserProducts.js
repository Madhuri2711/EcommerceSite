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
  // { id: 'id', label: 'Id' },
  { id: "detail", label: "Product Details", width: "250px" },
  // { id: 'brand', label: 'Brand' },
  // { id: 'code', label: 'Product Code' },
  // { id: 'image', label: 'Image' },
  { id: "price", label: "Price" },
  { id: "qty", label: "In Stock(Qty)" },
  { id: "status", label: "IsActive?" },
  { id: "deleted", label: "IsDeleted?" },
  // { id: 'otherImage', label: 'OtherImage' },
  { id: "created_date", label: "Created Date" },
  // { id: 'actions', label: 'Actions', disableSorting: true }
];
const AllUserProducts = ({ products, loading }) => {
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
    useTable(products, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
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
              label="Search Products By Name"
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
                    <TableCell style={{ textTransform: "capitalize" }}>
                      <div className="d-flex">
                        <div>
                          {item?.images ? (
                            <img
                              src={`${IMAGE_URL}${item?.images[0]}`}
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
                          <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "bold" }}> Name: </span>{" "}
                            {item?.name}
                          </p>
                          <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "bold" }}> Code: </span>{" "}
                            {item?.product_code}{" "}
                          </p>
                          <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "bold" }}> Brand: </span>{" "}
                            {item?.brand}{" "}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ marginTop: "0.8rem" }}>
                        <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                          <span style={{ fontWeight: "bold" }}> MRP: </span>
                          {`$${item?.price}`}
                        </p>
                        <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            Discounted Price:
                          </span>
                          {`$${item?.discount_price}`}
                        </p>
                        <p style={{ fontSize: "10px", marginBottom: "2px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {" "}
                            Your Eearning:{" "}
                          </span>
                          {`$${item?.your_earning}`}
                        </p>
                      </div>
                    </TableCell>
                    {/* <TableCell style={{ textTransform: 'capitalize' }}>{item?.brand}</TableCell> */}
                    {/* <TableCell style={{ textTransform: 'capitalize' }}>{item?.product_code}</TableCell> */}
                    {/* <TableCell> */}
                    {/* {item?.images ?
                                                <img src={`${IMAGE_URL}${item?.images[0]}`} alt="product-image"
                                                    style={{ marginRight: '2px', width: '50px', height: '50px', borderRadius: '50px' }} />
                                                : ""} */}
                    {/* {item?.images.length > 0 ? item?.images?.map(img => (
                                                <img width={100} src={`${IMAGE_URL}${img}`} alt="product-image"
                                                    style={{ marginRight: '2px' }} />
                                            ))
                                                : ""} */}
                    {/* </TableCell> */}
                    {/* <TableCell style={{ textTransform: 'capitalize' }}>{item?.price}</TableCell> */}
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.qty}
                    </TableCell>
                    <TableCell>
                      {item?.is_active === true ? (
                        <h4>
                          <Badge bg="success">Yes</Badge>
                        </h4>
                      ) : (
                        <h4>
                          {" "}
                          <Badge bg="danger">No</Badge>{" "}
                        </h4>
                      )}
                      {/* {item?.is_active === true ?
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        //onConfirm: () => { isActiveUser(item?._id, item?.is_active) }
                                                    })
                                                }} style={{ borderRadius: '13px', fontWeight: 'bold', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span> :
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        // onConfirm: () => { isActiveUser(item?._id, item?.is_active) }
                                                    })
                                                }}
                                                style={{ borderRadius: '13px', fontWeight: 'bold', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>InActive</span>} */}
                    </TableCell>
                    {/* <TableCell>{item?.otherImage}</TableCell> */}
                    <TableCell>
                      {item?.is_delete === true ? (
                        <span
                          style={{
                            fontWeight: "bold",
                            borderRadius: "5px",
                            padding: "10px",
                            color: "white",
                            fontWeight: 700,
                            background: "green",
                          }}
                        >
                          Yes
                        </span>
                      ) : (
                        <span
                          style={{
                            fontWeight: "bold",
                            height:"5px",
                            borderRadius: "5px",
                            padding: "10px",
                            color: "white",
                            fontWeight: 700,
                            background: "red",
                          }}
                        >
                          No
                        </span>
                      )}
                    </TableCell>
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
          {products.length == 0 && !loading ? (
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

export default AllUserProducts;
