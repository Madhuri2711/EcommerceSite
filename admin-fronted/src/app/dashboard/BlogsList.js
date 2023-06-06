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
import { BASE_URL, IMAGE_URL } from "../../lib/constant";

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
  { id: "title", label: "Blog Title" },
  { id: "coverImage", label: "CoverImage" },
  { id: "otherImage", label: "OtherImage" },
  { id: "created_date", label: "Created Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function BlogList() {
  const classes = useStyles();
  const [blog, setBlog] = useState([]);
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
  const [newblogs, setNewBlogs] = useState([]);

  const FETCH_ALL_BLOGS = `${BASE_URL}blogs`;
  let history = useHistory();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setloading(true);

      const { data } = await axios.get(FETCH_ALL_BLOGS);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      const newArray = data.data.map((element, index) => {
        element.indexNumber = index + 1;
        return element;
      });
      setBlog(newArray);

      const newSortedArray = data.data.reverse((element, index) => {
        return element;
      });
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setNewBlogs(newSortedArray);
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newblogs, headCells, filterFn);

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

  const onDelete = async (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      const deleteresponse = await axios.delete(`${BASE_URL}blog/${id}`);
      const { data } = await axios.get(FETCH_ALL_BLOGS);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      const newArray = data.data.map((element, index) => {
        element.indexNumber = index + 1;
        return element;
      });
      setBlog(newArray);

      const newSortedArray = data.data.reverse((element, index) => {
        return element;
      });
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setNewBlogs(newSortedArray);

      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const AddNewBlog = () => {
    history.push("blogs");
  };

  const mystyle = {
    width: "90px",
    height: "90px",
    borderRadius: "100px",
  };

  return (
    <>
      <div className="heading">
        <h2>BlogList</h2>
      </div>
      <MaUTable>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Blogs"
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
              onClick={AddNewBlog}
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
                <LoadingSpinner />
              ) : (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item._id}>
                    {/* <TableCell>{item?.indexNewNumber}</TableCell> */}
                    <TableCell>{item?.title}</TableCell>
                    <TableCell>
                      <img style={mystyle} src={`${item?.coverImage}`} />
                    </TableCell>
                    <TableCell>
                      <img style={mystyle} src={`${item?.otherImage}`} />
                    </TableCell>
                    <TableCell>
                      {moment(item?.created_date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/blog/update/${item._id}`}>
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
