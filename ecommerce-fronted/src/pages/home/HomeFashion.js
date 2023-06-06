import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import HomeCeoSection from "../../components/HomeCeoSection";
import DownloadApp from "../../components/DownlaodApp";
import HowToSection from "../../components/HowToSection";
import BlogCard from "../../components/BlogCard";
import HomeHeader from "../../components/HomeHeader";
import FooterOne from "../../wrappers/footer/FooterOne";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Inanihub | Fashion Home</title>
        <meta
          name="description"
          content="Fashion home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <HomeHeader />
      {/* <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      > */}
      {/* hero slider */}
      {/* <HeroSliderOne /> */}

      {/* Ceo section */}
      <HomeCeoSection />

      {/* download section */}
      <DownloadApp />

      {/* How to section */}
      <HowToSection />

      {/* featured icon */}
      <FeatureIcon spaceTopClass="pt-50" spaceBottomClass="pb-50" />

      {/* tab product */}
      <TabProduct spaceBottomClass="pb-50" category="fashion" />

      {/* blog featured */}
      <BlogCard />

      {/* <BlogFeatured spaceBottomClass="pb-55" /> */}

      <FooterOne
        backgroundColorClass="bg-gray"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
      {/* </LayoutOne> */}
    </Fragment>
  );
};

export default HomeFashion;
