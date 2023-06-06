import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getBanner } from "../../services/banner.service";
import { Link } from "react-router-dom";
const HeroSliderOne = () => {
  const [banners, setBanner] = useState([]);
  useEffect(() => {
    async function fetchBannerAPI() {
      let res = await getBanner();
      setBanner(res?.data);
    }
    fetchBannerAPI();
  }, []);

  return (
    <Carousel className="container mt-5">
      {banners?.map((banner) => (
        <Carousel.Item key={banner.id}>
          <div
            className="banner-image "
            style={{
              backgroundImage: `url(${
                "https://inani-hub.s3.amazonaws.com/" + banner.image
              })`,
            }}
          >
            <div className="d-flex flex-column-reverse align-items-center justify-content-center h-100  ">
              <div>
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + banner.url}
                >
                  <button className="btn btn-outline-secondary">
                    SHOP NOW
                  </button>
                </Link>
              </div>
              <div>
                <h3 className="animated  ">{banner.title}</h3>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default HeroSliderOne;
