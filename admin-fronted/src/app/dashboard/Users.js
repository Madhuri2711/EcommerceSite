import React, { useEffect, useState } from "react";
import { BASE_URL, TOKEN } from "../../lib/constant";
import axios from "axios";
import Controls from "./listbasic-ui/Controls";
import Notification from "./listbasic-ui/Notification";
import ConfirmDialog from "./listbasic-ui/ConfirmDialog";
import "../dashboard/listbasic-ui/icon.css";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { makeStyles, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
import SendIcon from "@mui/icons-material/Send";
import Popup from "./listbasic-ui/Popup";
import EmailSetting from "../shared/EmailSetting";
import useTable from "../dashboard/listbasic-ui/useTable";
import LoadingSpinner from "./listbasic-ui/LoadingSpinner";
import { ErrorMessage, Field, Formik } from "formik";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Badge, Col, Form, Row } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useForm } from "react-hook-form";

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
  title:{
    top:'10px',
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "firstName", label: "FullName", disableSorting: false },
  { id: "userName", label: "Username" },
  { id: "email", label: "Email" },
  { id: "userName", label: "IsActive" },
  { id: "userName", label: "IsDelete" },
  { id: "created_date", label: "Created Date" },
  { id: "details", label: "Details", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* UsersList */}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>{/* <DeleteIcon /> */}</IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Users(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setusers] = useState([]);
  const [Message, setMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { formState } = useForm();
  const { isSubmitting } = formState;

  const userInitVal = {
    search: "",
    pageLimit: "",
    page: "",
  };

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
  const classes = useStyles();
  console.log(selected);
  const GET_ALL_USER = `${BASE_URL}user`;

  useEffect(() => {
    fetchAllUser(userInitVal);
  }, []);

  const fetchAllUser = async (fields) => {
    try {
      const { data } = await axios.post(GET_ALL_USER, fields, {
        headers: { Authorization: `${TOKEN}` },
      });
      console.log(data);
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      setusers(data?.data?.usersList);
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteUser = async (id, deleted) => {
    try {
      const postData = {
        is_delete: !deleted,
      };
      const { data } = await axios.put(
        `${GET_ALL_USER}/isdelete/${id}`,
        postData,
        {
          headers: { Authorization: `${TOKEN}` },
        }
      );
      if (data.data == "") {
        setMessage("No Data Found.");
      }
      setConfirmDialog(false);
      fetchAllUser();
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const isActiveUser = async (id, isActive) => {
    try {
      const postData = {
        isActive: !isActive,
      };
      const { data } = await axios.put(`${GET_ALL_USER}/${id}`, postData, {
        headers: { Authorization: `${TOKEN}` },
      });
      fetchAllUser();
      setConfirmDialog(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (email) => selected.indexOf(email) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  //   useTable(users, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleDataReset = () => {
    fetchAllUser(userInitVal);
  };

  const mystyle = {
    left: '91%',
    bottom: '55px',
  };

  return (
    <>
      <div className={classes.title}>
        <h2>Users</h2>
        <Controls.Button
          text="Send"
          variant="outlined"
          color="newbtn"
          startIcon={<SendIcon />}
          style={mystyle}
          onClick={() => {
            setOpenPopup(true);
          }}
        />
      </div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <br />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>User Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Formik
                initialValues={userInitVal}
                onSubmit={(fields) => {
                  fetchAllUser(fields);
                }}
                render={({
                  errors,
                  status,
                  touched,
                  handleChange,
                  handleReset,
                  handleSubmit,
                  handleBlur,
                  values,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} onReset={handleReset}>
                    <Row className="m-2 ">
                      <Col className="mt-auto ps-4 ">
                        <div className="form-group">
                          <label htmlFor="search"> User Name *</label>
                          <Field
                            name="search"
                            type="text"
                            value={values.search}
                            style={{ height: "55px", borderColor: "#999C9F" }}
                            onChange={handleChange}
                            placeholder="Enter User Name"
                            className={
                              "form-control" +
                              (errors.search && touched.search
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="search"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group ">
                          <button
                            type="submit"
                            className="btn btn-primary mr-2"
                            disabled={isSubmitting}
                          >
                            {isLoading && (
                              <span className="spinner-border spinner-border-sm mr-1"></span>
                            )}
                            Filter
                          </button>
                          <button
                            type="reset"
                            onClick={handleDataReset}
                            className="btn btn-secondary ms-2"
                          >
                            Reset
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
              />
            </AccordionDetails>
          </Accordion>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {loading ? (
                    stableSort(users, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.email);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.email)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.email}
                          selected={isItemSelected}
                          message={Message}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            {row?.firstName + " " + row?.lastName}
                          </TableCell>
                          <TableCell align="left">{row.userName}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell>
                            {row?.isActive === true ? (
                              <h4>
                                <Badge bg="success">Yes</Badge>
                              </h4>
                            ) : (
                              <h4>
                                <Badge bg="danger">No</Badge>
                              </h4>
                            )}
                            {/* {row?.isActive === true ?
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { isActiveUser(row?._id, row?.isActive) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span> :
                                                <span onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { isActiveUser(row?._id, row?.isActive) }
                                                    })
                                                }} style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>InActive</span>}
                                                 */}
                          </TableCell>
                          <TableCell>
                            {row?.is_delete === true ? (
                              <h4>
                                <Badge bg="success">Yes</Badge>
                              </h4>
                            ) : (
                              <h4>
                                <Badge bg="danger">No</Badge>
                              </h4>
                            )}
                            {/* {row?.is_delete === true ?
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span>
                                                :
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>Deleted</span>}
                                                 */}
                          </TableCell>
                          <TableCell>
                            {moment(row?.created_date).format("DD-MM-YYYY")}
                          </TableCell>
                          <TableCell>
                            <Link to={`/user/${row._id}`}>
                              View Details
                              {/* <Controls.ActionButton
                                                    color="primary">
                                                    <EditOutlinedIcon fontSize="small" className='iconcolor' />
                                                </Controls.ActionButton> */}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Controls.ActionButton
                              color="secondary"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: "Are you sure to delete this record?",
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    deleteUser(row?._id, row?.is_delete);
                                  },
                                });
                              }}
                            >
                              <DeleteIcon
                                fontSize="small"
                                className="iconcolor"
                              />
                            </Controls.ActionButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <LoadingSpinner />
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
          <Popup
            title="Email Setting"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <EmailSetting emailList={selected} />
          </Popup>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
      </Box>
    </>
  );
}
