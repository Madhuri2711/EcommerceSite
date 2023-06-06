import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderTop from "../../components/header/HeaderTop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
//import { IMG_URL } from "../../lib/constant";
import { Button } from "react-bootstrap";
import { getProductList } from "../../services/product.service";
const useStyles = makeStyles((theme) => ({
  listComponent: {
    height: 300,
    overflowY: "auto",
    background: "#ffff",
    color: "#000",
    marginLeft: "8px",
  },
  productAvatar: {
    width: 75,
    height: 75,
    objectFit: "contain",
  },
  listItem: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#fbdead",
      color:'#fff'
    },
    color: "#fff",
  },
  listText: {
    margin: "0px 10px",
    color: "#000",
  },
}));

const HeaderOne = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,
  iconWhiteClass,
}) => {
  const classes = useStyles();
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  useEffect(() => {
    getProductListForSearch();
  }, []);

  const getProductListForSearch = async () => {
    try {
      const response = await getProductList();
      if (response?.isSuccess) {
        setProducts(response?.data);
      }
    } catch (error) {
      return error;
    }
  };

  /*const handleSearchInput = async (values) => {
    setSearchText(values?.search);
    setIsOpen(true);
    const searchValue = {
      search: values?.search,
      sortBy: "",
      price: {
        min: 1,
        max: 10000,
      },
      condition: [],
      brand: [],
      size: [],
      pageLimit: 10,
      skip: 0,
    };
    try {
      const response = await dispatch(fetchSearchProducts(searchValue));
      if (response?.payload?.status === 200) {
        history.push(`/shop-grid-standard?search=${searchValue?.search}`);
      }
    } catch (error) {
      return error;
    }
  };*/

  const handleSearchInput = (event) => {
    setSearchText(event.target.value);
    setIsOpen(true);
  };

  const closeSearchBox = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  return (
    <header
      className={`header-area clearfix ${headerBgClass ? headerBgClass : ""} ${
        headerPositionClass ? headerPositionClass : ""
      }`}
    >
      <div
        className={`${headerPaddingClass ?  headerPaddingClass : "" } ${
          top === "visible" ? "d-none d-lg-block" : "d-none "
        } header-top-area ${
          borderStyle === "fluid-border" ? "border-none" : ""
        }`}
      >
        <div className={layout === "container" ? layout : "container-fluid"}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={` ${
          headerPaddingClass ? headerPaddingClass : ""
        } sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? "stick" : "stick"
        }`}
      >
        <div className="container-fluid ">
        {/* ={layout === "container" ? layout : "container-fluid"} */}
          <div className="row d-flex align-item-center">
            <div className="col-xl-1 col-lg-1 col-md-3 col-4 ">
              {/* header logo */}
              <Logo
                imageUrl="https://www.inanihub.com/static/media/mobile-nav-logo.3a5d6751f1deb92aa503a04517b6695b.svg"
                logoClass="logo"
              />
            </div>
            <div className="col-xl-4 col-lg-4 d-none d-lg-block">
              {/* Nav menu */}
              <NavMenu />
            </div>
            <div className="col-xl-5 col-lg-5 col-md-6 col-4 search-box">
              <Formik
                initialValues={{
                  search: "",
                  sortBy: "",
                  price: {
                    min: "",
                    max: "",
                  },
                  condition: [],
                  brand: [],
                  size: [],
                  pageLimit: 10,
                  skip: 0,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  // handleSearchInput(values);
                  setSubmitting(false);
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div
                      className="search-content ml-2 d-flex"
                      onBlur={closeSearchBox}
                      style={{ marginTop: "16px", position: "relative" }}
                    >
                      <Field
                        type="text"
                        placeholder="Search for products, brands and more"
                        name="search"
                        value={searchText}
                        className='change'
                        onChange={handleSearchInput}
                      />
                      <button className="search-btn" type="submit">
                        <i className="pe-7s-search" />
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              {searchText && isOpen && (
                <Box boxShadow={4} className={classes.listComponent}>
                  <List>
                    {products
                      ?.filter((product) =>
                        product?.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      ?.map((product) => (
                        <a href={`/product/${product._id}`} target="blank">
                          <ListItem className={classes.listItem}>
                            <ListItemAvatar className={classes.listAvatar}>
                              <img
                                className={classes.productAvatar}
                                src={`${product.images[0]}`}
                                alt="searchImage"
                              />
                            </ListItemAvatar>
                            <ListItemText>
                              <Typography className={classes.listText}>
                                {product?.name}
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        </a>
                      ))}
                  </List>
                </Box>
              )}
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3 col-8 icongroup text-right login-signup-btn ">
              <div
                className={`header-right-wrap ${
                  iconWhiteClass ? iconWhiteClass : ""
                }`}
              >
                {!localStorage.getItem("token") ? (
                  <>
                    <Link to="/sign-in">
                      <Button className="theme-btn mt-1">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="theme-btn ml-2 mt-1 sign-up-mobile">
                        Sign Up
                      </Button>
                    </Link>

                    <div className="same-style mobile-off-canvas d-block d-lg-none">
                      <button
                        className="mobile-aside-button"
                        style={{ marginTop: "11px" }}
                        onClick={() => triggerMobileMenu()}
                      >
                        <i className="pe-7s-menu" />
                      </button>
                    </div>
                  </>
                ) : (
                  <IconGroup />
                )}

                {/* Icon group */}
              </div>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
};

export default HeaderOne;
