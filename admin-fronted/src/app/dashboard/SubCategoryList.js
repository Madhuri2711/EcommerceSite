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
import { BASE_URL,IMAGE_URL, TOKEN } from "../../lib/constant";
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
    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "name", label: "Name" },
//   { id: "image", label: "Image" },
  { id: "size", label: "Size" },
  { id: "isActive", label: "Status" },
  { id: "created_date", label: "Created Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const SubCategoryList = () => {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
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
  const [newCategory, setNewCategory] = useState([]);

  const FETCH_ALL_BANNERS = `${BASE_URL}sub-category/`;

  let history = useHistory();
  useEffect(() => {
    fetchSubCategory();
  }, []);

  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_BANNERS, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      const newArray = data.data.map((element, index) => {
        const newsize = element.size;
        // element.sizeSplited = newsize.split(',');
        return element;
      });
      setCategory(newArray);

      const newSortedArray = data.data.reverse((element, index) => {
        return element;
      });
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setNewCategory(newSortedArray);

      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newCategory, headCells, filterFn);

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
  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const deleteresponse = await axios.delete(
        `${BASE_URL}sub-category/${id}`,
        {
          headers: { Authorization: `${TOKEN}` },
        }
      );
      const { data } = await axios.get(FETCH_ALL_BANNERS, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      const newArray = data.data.map((element, index) => {
        element.indexNumber = index + 1;
        return element;
      });
      setCategory(newArray);

      const newSortedArray = data.data.reverse((element, index) => {
        return element;
      });
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setNewCategory(newSortedArray);

      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const AddNewCategory = () => {
    history.push("sub-category");
  };

  const mystyle = {
    width: "90px",
    height: "90px",
    borderRadius: "100px",
  };

  return (
    <>
      <div className="heading">
        <h2>Sub-Categories</h2>
      </div>
      <MaUTable>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Sub Category"
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
            <Controls.Button
              text="Add New"
              variant="outlined"
              color="newbtn"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={AddNewCategory}
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
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.name}
                    </TableCell>
                    {/* <TableCell>
                      <img style={mystyle} src={`${IMAGE_URL}${item?.img}`} />
                    </TableCell> */}
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {
                        item?.size ? 
                        <h4>
                          <Badge bg="info">{item?.size}</Badge>
                        </h4>
                        :
                        <h4>{""}</h4>
                      }
                    </TableCell>
                    <TableCell>
                      {item?.isActive === true ? (
                        <span
                          style={{
                            borderRadius: "13px",
                            padding: "10px",
                            color: "white",
                            fontWeight: 700,
                            background: "green",
                          }}
                        >
                          Active
                        </span>
                      ) : (
                        <span
                          style={{
                            borderRadius: "13px",
                            padding: "10px",
                            color: "white",
                            fontWeight: 700,
                            background: "red",
                          }}
                        >
                          InActive
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(item?.created_date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/sub-category/update/${item._id}`}>
                        <Controls.ActionButton color="primary">
                          <EditOutlinedIcon
                            fontSize="small"
                            className="iconcolor"
                          />
                        </Controls.ActionButton>
                      </Link>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item._id);
                            },
                          });
                        }}
                      >
                        <DeleteIcon fontSize="small" className="iconcolor" />
                      </Controls.ActionButton>
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
};

export default SubCategoryList;
