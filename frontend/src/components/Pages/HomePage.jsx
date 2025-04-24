import React from "react";
import HomeAboutSection from "../Home/HomeAboutSection";
import HomeBlogSection from "../Home/HomeBlogSection";
import HomeServiceSection from "../Home/HomeServiceSection";
import HomeTestimonialSection from "../Home/HomeTestimonialSection";
const HomePage = () => {
  return (
    <>
      <HomeAboutSection />
      <HomeServiceSection />
      <HomeTestimonialSection />
      <HomeBlogSection />
    </>
  );
};

export default HomePage;
