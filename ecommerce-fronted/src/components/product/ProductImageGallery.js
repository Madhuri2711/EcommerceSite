import React, { Fragment, useEffect, useState } from "react";
//import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
//import Swiper from "react-id-swiper";
//import { IMG_URL } from "../../lib/constant";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "../SkeletonLoader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import { fetchProduct } from "../../slices/product";

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  //const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, []);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  // const gallerySwiperParams = {
  //   getSwiper: getGallerySwiper,
  //   spaceBetween: 10,
  //   loopedSlides: 4,
  //   loop: true,
  //   effect: "fade",
  // };

  // const thumbnailSwiperParams = {
  //   getSwiper: getThumbnailSwiper,
  //   spaceBetween: 10,
  //   slidesPerView: 4,
  //   loopedSlides: 4,
  //   touchRatio: 0.2,
  //   freeMode: true,
  //   loop: true,
  //   slideToClickedSlide: true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   renderPrevButton: () => (
  //     <button className="swiper-button-prev ht-swiper-button-nav">
  //       <i className="pe-7s-angle-left" />
  //     </button>
  //   ),
  //   renderNextButton: () => (
  //     <button className="swiper-button-next ht-swiper-button-nav">
  //       <i className="pe-7s-angle-right" />
  //     </button>
  //   ),
  // };

  return (
    <Fragment>
      {products?.status === "loading" && (
        <SkeletonLoader count={1} height="400px" />
      )}
      <div className="product-large-image-wrapper">
        {product?.discount || product?.new ? (
          <div className="product-img-badges">
            {product?.discount ? (
              <span className="pink">-{product?.discount}%</span>
            ) : (
              ""
            )}
            {product?.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        <Carousel width="90%" showArrows={false} showIndicators={false} >
          {product?.images ? (
            product?.images.map((image, index) => {
              return (
                <div key={index} style={{maxHeight:'500px'}}>
                  <img
                    src={`${image}`}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              );
            })
          ) : (
            <SkeletonLoader count={1} height="400px" />
          )}
        </Carousel>
        {/* <Swiper {...gallerySwiperParams}>
          {product?.images ? (
            product?.images.map((image, index) => {
              return (
                <div key={index}>
                  <LightgalleryItem
                    group="any"
                    src={`${IMG_URL}${image}`}
                    alt="product"
                  >
                    <button>
                      <i
                        className="pe-7s-expand1"
                        style={{ color: "white" }}
                      ></i>
                    </button>
                  </LightgalleryItem>
                  <div className="single-image">
                    <img
                      src={`${IMG_URL}${image}`}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <SkeletonLoader count={1} height="400px" />
          )}
        </Swiper> */}
      </div>
      {/* <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>
          {product?.images &&
            product?.images.map((image, key) => {
              return (
                <div key={key}>
                  <div className="single-image">
                    <img
                      src={`${IMG_URL}${image}`}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div> */}
    </Fragment>
  );
};

export default ProductImageGallery;
