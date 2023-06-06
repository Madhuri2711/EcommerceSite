import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
//import Tab from "react-bootstrap/Tab";
//import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../slices/user.details";
//import { IMG_URL } from "../../lib/constant";
import { Avatar, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
//import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import CategoryIcon from "@mui/icons-material/Category";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
// import Img from "../../assets/img/common/headPhone.jpg";
// import { Button } from "bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import { Link, Redirect, useHistory } from "react-router-dom";
//import AddEditProducts from "./AddEditProducts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteProfileProduct } from "../../services/product.service";
//import toast from "react-hot-toast";
import SellIcon from "@mui/icons-material/Sell";
import swal from "sweetalert";
import { makeShortText } from "../../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  component: {
    padding: "30px 40px 30px 40px",
    background: "#fff",
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
    border: "1px #fff",
    height: "auto",
    // paddingBottom: "30px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600 !important",
    paddingRight: "24px",
    display: "inline-block",
    paddingBottom: "25px",
  },
  large: {
    width: "100px !important",
    height: "100px !important",
    marginLeft: "10px",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    borderRadius: "10px",
    height: "auto",
  },
  profiledetails: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const id = localStorage.getItem("userid");

  useEffect(() => {
    dispatch(fetchUserDetails(id));
  }, [dispatch]);

  // const editProduct = (product) => {
  //   history.push({
  //     pathname: "/my-account/profile/product",
  //     productdata: product,
  //   });
  // };

  const products = user?.productList.filter(
    (product) => !product.is_bundled_product
  );
  console.log("products", products);

  const deleteProductData = async (product) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see your product.!",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        catch: "Delete",
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await deleteProfileProduct(product?._id);
        console.log(response);
        if (response?.isSuccess) {
          dispatch(fetchUserDetails(id));
          swal("Your product has been deleted.!", {
            icon: "success",
          });
        }
      } else {
        swal("Your product has been safe.!");
      }
    });
  };

  return (
    <>
      <Box className={classes.component}>
        <Typography className={classes.title}>Profile</Typography>
        <Box className={classes.profileWrapper}>
          <Avatar
            alt="Avatar"
            src={
              !user?.image
                ? "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
                : `${user?.image}`
            }
            className={classes.large}
          />
        </Box>
        <Box>
          <Typography className={classes.profiledetails}>
            {user?.firstName + " " + user?.lastName}
          </Typography>
          <Typography className={classes.profiledetails}>
            {"Welcome to my closet"}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            className="mt-2"
          >
            <Grid item  sm={4} md={4}>
              <Item>
                <VisibilityIcon className="mb-1 mr-2" />
                {" " + user?.totalViews ? user?.totalViews : 0 + " "}
                <strong className="ml-2">Views</strong>
              </Item>
            </Grid>
            <Grid item  sm={4} md={4}>
              <Item>
                {/* <FavoriteBorderIcon /> */}
                <SellIcon className="mr-2 mb-1 " />
                {" " + user?.soldItems ? user?.soldItems : 0 + " "}
                <strong className="ml-2">SoldItems</strong>
              </Item>
            </Grid>
            <Grid item  sm={4} md={4}>
              <Item>
                <CategoryIcon className="mr-2 mb-1 " />
                {" " + user?.totalItems ? user?.totalItems : 0 + " "}
                <strong className="ml-2">Items</strong>
              </Item>
            </Grid>
            {/* <Grid item xs={2} sm={4} md={4}>
              <Item>
                <FavoriteBorderIcon />
                {" " + user?.totalWishlist + " " + "Wishlists"}
              </Item>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      <div className="row">
        {products?.map((product) => {
          return (
            <div className="mt-4 col-lg-4 col-sm-12 col-md-6">
              <Card
                style={{ width: "100%", margin: "10px", height: "400px" }}
                className="mt-2 ml-1"
              >
                <Card.Img
                  variant="productImg"
                  src={`${product?.images[0]}`}
                  style={{ height: "288px" }}
                  // src={Img}
                />
                <Card.Body>
                  <Card.Text className="d-flex align-item-center justify-content-center">
                    {product?.name}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Text className="" style={{ marginBottom: "0px" }}>
                      {makeShortText(product?.brand)}
                    </Card.Text>
                    <Card.Text className="fw-bold mt-3">
                      {`$${product?.price}`}
                    </Card.Text>
                    <Link
                      to={`/my-account/profile/product/update/${product?._id}`}
                    >
                      <EditIcon
                        className="justify-content-start edit-btn"
                        // onClick={() => editProduct(product)}
                      />
                    </Link>
                    <DeleteForeverIcon
                      className="justify-content-end delete-btn"
                      onClick={() => deleteProductData(product)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
