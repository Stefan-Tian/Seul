import React from "react";
import LandingHeader from "./landings/LandingHeader";
import LandingFeatures from "./landings/LandingFeatures";
import LandingDesign from "./landings/LandingDesign";

const Landing = props => (
  <div className="landing--container">
    <LandingHeader />
    <LandingFeatures />
    <LandingDesign />
  </div>
);

export default Landing;
