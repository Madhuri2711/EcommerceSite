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
import Notification from "../dashboard/listbasic-ui/Notification";
import ConfirmDialog from "../dashboard/listbasic-ui/ConfirmDialog";
import "../dashboard/listbasic-ui/icon.css";
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
    width: "70%",
    position: "absolute",
    left: "0px",
    [theme.breakpoints.down("xs")]: {
      width: "65%",
    },
  },
}));

const headCells = [
  { id: "screen", label: "Screen" },
  { id: "description", label: "Description" },
  { id: "created_date", label: "Created Date" },
];

export default function ErrorLogs() {
  const classes = useStyles();
  let history = useHistory();
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
  const [errorLogs, setErrorLogs] = useState([]);

  const FETCH_ALL_ERRORLOGS = `${BASE_URL}errors`;

  useEffect(() => {
    fetchErrorLogs();
  }, []);

  const fetchErrorLogs = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_ERRORLOGS, {
        headers: { Authorization: `${TOKEN}` },
      });
      if(data.data == "" && data.data == undefined){
        setMessage("No Data Found.")
      }
      setErrorLogs(data.data);
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(errorLogs, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.screen.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <div className="heading">
        <h2>ErrorLogs</h2>
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
                    <TableCell>{item?.screen}</TableCell>
                    <TableCell>
                      {item?.description}
                    </TableCell>
                    <TableCell>
                      {moment(item.created_date).format("MM-DD-YYYY")}
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
