import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategory } from "../../slices/category";
//import { Box } from "@mui/system";
//import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
//import Typography from "@mui/material/Typography";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Card from "react-bootstrap/Card";
import SectionTitle from "../../components/section-title/SectionTitle";
//import featureIconData from "../../data/feature-icons/feature-icon.json";
//import FeatureIconSingle from "../../components/feature-icon/FeatureIconSingle";
//import ShopGridStandard from "../../pages/shop/ShopGridStandard";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const useStyles = makeStyles((theme) => ({
  component: {
    marginLeft: "25px",
  },
  large: {
    borderRadius: "50px",
    display: "flex",
    height: "150px",
    width: "80px",
  },
}));


const FeatureIcon = ({ spaceTopClass, spaceBottomClass, props, deviceType }) => {

  const [asd, setAsd] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    // arrows: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };
  // const renderArrows = () => {
  //   return (
  //     <div className="slider-arrow">
  //       <ButtonBase
  //         className="arrow-btn prev"
  //         onClick={() => this.slider.slickPrev()}
  //       >
  //         <ArrowLeft />
  //       </ButtonBase>
  //       <ButtonBase
  //         className="arrow-btn next"
  //         onClick={() => this.slider.slickNext()}
  //       >
  //         <ArrowRight />
  //       </ButtonBase>
  //     </div>
  //   );
  // };
  const dispatch = useDispatch();
  const classes = useStyles();
  const { category } = useSelector((state) => state.category);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const loadcategory = (id) => {
    history.push(`/shop-grid-standard/${id}`);
  };

  return (
    <div

      className={`support-area  ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
      style={{width:'100%',overflowX:'hidden'}}
    >
      <div className="container">
        <SectionTitle titleText="CATEGORIES" positionClass="text-center" />
        <div className="row ">
          {/* {renderArrows()} */}
          <Slider ref={c => setAsd(c)}  {...settings} >
            {category?.length > 0 &&
              category !== undefined &&
              category?.map((category) => {
                return (
                  <>
                    <div className="mt-4 mb-1 col  d-flex justify-content-center flex-column align-items-center" role='button' onClick={() => loadcategory(category?._id)}>
                      <div className="circular--portrait">
                        <img
                          variant="top"
                          src={`${category?.img}`}
                          alt="catImg"
                        />
                      </div>
                      <div className="">
                        <p style={{ textAlign: "center" }} className='text-center text-black'>{category?.name}</p>
                      </div>



                    </div>
                  </>
                );
              })}
            {category?.length === 0 && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Slider >
        </div>

      </div>
    </div>
  );
};

FeatureIcon.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default FeatureIcon;
