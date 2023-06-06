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
import { BASE_URL } from "../../lib/constant";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "70%",
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
  { id: "email", label: "Email" },
  { id: "created_date", label: "Created Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function News_SubscribersList() {
  const classes = useStyles();
  const [subscribers, setsubscribers] = useState([]);
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
  const [newSubScribers, setnewSubScribers] = useState([]);

  const FETCH_ALL_NEWS_SUBSCRIBERS = `${BASE_URL}news-letter`;

  let history = useHistory();

  useEffect(() => {
    fetchNewsSubscribers();
  }, []);

  const fetchNewsSubscribers = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_NEWS_SUBSCRIBERS);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      const newArray = data.data.map((element, index) => {
        element.indexNumber = index + 1;
        return element;
      });
      setsubscribers(newArray);

      const newSortedArray = data.data.reverse((element, index) => {
        return element;
      });
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setnewSubScribers(newSortedArray);
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(newSubScribers, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.email.toLowerCase().includes(target.value)
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
      const deleteresponse = await axios.delete(`${BASE_URL}news-letter/${id}`);
      const { data } = await axios.get(FETCH_ALL_NEWS_SUBSCRIBERS);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      const newArray = data.data.map((element, index) => {
        element.indexNumber = index + 1;
        return element;
      });
      setsubscribers(newArray);
      const newSortedArray = data.data.reverse((element, index) => {
        return element;
      });
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setnewSubScribers(newSortedArray);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const AddNewSubscribers = () => {
    history.push("/news-subscriber");
  };

  return (
    <>
      <div className="heading">
        <h2>News-SubscribersList</h2>
      </div>
      <MaUTable>
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Inquiries"
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
              onClick={AddNewSubscribers}
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
                    {/* <TableCell>{item.indexNewNumber}</TableCell> */}
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>
                      {moment(item.created_date).format("MM-DD-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/news-subscribers/update/${item._id}`}>
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
}
