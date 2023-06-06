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
import { BASE_URL, IMAGE_URL, TOKEN } from "../../lib/constant";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { Badge, Col, Form, Row } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "../dashboard/listbasic-ui/icon.css";
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
}));

const headCells = [
  { id: "name", label: "Product Name" },
  { id: "images", label: "Images" },
  { id: "price", label: "Price" },
  { id: "qty", label: "Quantity" },
  { id: "is_active", label: "IsActive" },
  { id: "created_date", label: "Created Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Products = () => {
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

  const { formState } = useForm();
  const { isSubmitting } = formState;
  const [loading, setloading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [productList, setProductList] = useState([]);

  const FETCH_ALL_CATEGORY = `${BASE_URL}category/`;
  const FETCH_ALL_SUB_CATEGORY = `${BASE_URL}sub-category/`;
  const FETCH_PRODUCT_ON_SEARCH = `${BASE_URL}product/search/`;
  const PRODUCT_DELETE = `${BASE_URL}product/isdelete/`;

  const productInitVal = {
    search: "",
    category_id: "",
    sub_cat_id: "",
    qty: "",
    min: "",
    max: "",
  };
  
  const history = useHistory();

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
    fetchProductData(productInitVal);
  }, []);

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_CATEGORY, {
        headers: { Authorization: `${TOKEN}` },
      });
      setCategory(data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchSubCategory = async () => {
    try {
      const { data } = await axios.get(FETCH_ALL_SUB_CATEGORY, {
        headers: { Authorization: `${TOKEN}` },
      });
      setSubCategory(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProductData = async (fields) => {
    try {
      const { data } = await axios.post(FETCH_PRODUCT_ON_SEARCH, fields, {
        headers: { Authorization: `${TOKEN}` },
      });
      if (data.data?.productList.length === 0) {
        setMessage("No Data Found.");
      } else {
        setMessage("");
      }
      const newArray = data?.data?.productList?.map((element, index) => {
        element.indexNumber = index + 1;
        return element;
      });
      // setCategory(newArray);

      const newSortedArray = data?.data?.productList?.reverse(
        (element, index) => {
          return element;
        }
      );
      const arraydata = newSortedArray.map((element, index) => {
        element.indexNewNumber = index + 1;
        return element;
      });
      setProductList(newArray);
      setloading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onDelete = async (id, is_delete) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    console.log(is_delete);
    try {
      const postData = {
        is_delete: !is_delete,
      };
      const { data } = await axios.put(`${PRODUCT_DELETE}${id}`, postData, {
        headers: { Authorization: `${TOKEN}` },
      });
      fetchProductData(productInitVal);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleDataReset = () => {
    fetchProductData(productInitVal);
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(productList, headCells, filterFn);

  // const handleSearch = (e) => {
  //   let target = e.target;
  //   setFilterFn({
  //     fn: (items) => {
  //       if (target.value == "") return items;
  //       else
  //         return items.filter((x) =>
  //           x?.name.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

  const AddNewProduct = () => {
    history.push("/add/product");
  };

  const mystyle = {
    top: 0,
  };

  return (
    <>
      <div className="heading">
        <h2>Products</h2>
        <Controls.Button
          text="Add New"
          style={mystyle}
          variant="outlined"
          color="newbtn"
          startIcon={<AddIcon />}
          className={classes.newButton}
          onClick={AddNewProduct}
        />
      </div>
      <MaUTable>
        <br />
        <Paper className={classes.pageContent}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Product Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Formik
                initialValues={productInitVal}
                onSubmit={(fields) => {
                  fetchProductData(fields);
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
                      <Col>
                        <div className="form-group">
                          <label htmlFor="category_id"> Select Category </label>
                          <Field
                            as="select"
                            name="category_id"
                            className={
                              "form-control" +
                              (errors.category_id && touched.category_id
                                ? " is-invalid"
                                : "")
                            }
                            style={{
                              height: "55px",
                              border: "1px solid #999C9F",
                              outline: "none",
                              color: "#545353",
                            }}
                          >
                            <option value="" style={{ fontSize: "20px" }}>
                              Select Category
                            </option>
                            {category?.map((val) => (
                              <option
                                value={val?._id}
                                style={{ fontSize: "20px" }}
                              >
                                {val?.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="category_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="sub_cat_id">
                            Select Sub Category
                          </label>
                          <Field
                            as="select"
                            name="sub_cat_id"
                            className={
                              "form-control" +
                              (errors.sub_cat_id && touched.sub_cat_id
                                ? " is-invalid"
                                : "")
                            }
                            style={{
                              height: "55px",
                              border: "1px solid #999C9F",
                              outline: "none",
                              color: "#545353",
                            }}
                          >
                            <option value="" style={{ fontSize: "20px" }}>
                              Select Sub Category
                            </option>
                            {subCategory?.map((val) => (
                              <option
                                style={{ fontSize: "20px" }}
                                value={val?._id}
                              >
                                {val?.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="sub_cat_id"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group">
                          <label htmlFor="qty"> Quantity</label>
                          <Field
                            name="qty"
                            type="number"
                            value={values.qty}
                            style={{ height: "55px", borderColor: "#999C9F" }}
                            onChange={handleChange}
                            placeholder="Enter Quantity"
                            className={
                              "form-control" +
                              (errors.qty && touched.qty ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="qty"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="m-2 ">
                      <Col>
                        <div className="form-group">
                          <label htmlFor="min"> Min Price</label>
                          <Field
                            name="min"
                            type="number"
                            value={values.min}
                            onChange={(e) => {
                              //handleSearchPrice(e)
                              handleChange(e);
                            }}
                            style={{ height: "55px", borderColor: "#999C9F" }}
                            placeholder="Enter minimum price"
                            className={
                              "form-control" +
                              (errors.min && touched.min ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="min"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="form-group justify-content-center">
                          <label htmlFor="max">Max price</label>
                          <Field
                            name="max"
                            type="number"
                            value={values.max}
                            style={{ height: "55px", borderColor: "#999C9F" }}
                            onChange={handleChange}
                            placeholder="Enter maximum price"
                            className={
                              "form-control" +
                              (errors.max && touched.max ? " is-invalid" : "")
                            }
                          />
                          <ErrorMessage
                            name="max"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </Col>
                      <Col className="mt-auto ps-4 ">
                        <div className="form-group">
                          <label htmlFor="search"> Product Name *</label>
                          <Field
                            name="search"
                            type="text"
                            value={values.search}
                            style={{ height: "55px", borderColor: "#999C9F" }}
                            onChange={handleChange}
                            placeholder="Enter Product Name"
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
          <TblContainer>
            <TblHead />
            <TableBody>
              {loading ? (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell style={{ textTransform: "capitalize" }}>
                      {item?.name}
                    </TableCell>
                    <TableCell>
                      {item?.images && loading ? (
                        <img
                          src={`${IMAGE_URL}${item?.images[0]}`}
                          alt="product-image"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "100px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell
                      style={{ textTransform: "capitalize" }}
                    >{`$${item?.price}`}</TableCell>
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
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span> :
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>InActive</span>}
                                                 */}
                    </TableCell>
                    {/* <TableCell >
                                            {item?.is_delete === false ?
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'green' }}>Active</span>
                                                :
                                                <span style={{ borderRadius: '13px', padding: '10px', color: 'white', fontWeight: 700, background: 'red' }}>Deleted</span>}
                                        </TableCell> */}
                    <TableCell>
                      {moment(item?.created_date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin/product/update/${item._id}`}>
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
                              onDelete(item._id, item?.is_delete);
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
          {productList.length === 0 && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {Message}
            </div>
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

export default Products;
