import React from "react";
import earthImg from "../assets/imgs/earth.png";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <img src={earthImg} alt="Logo" />
      <p>
        Welcome to EarthTrackr, your go-to platform for tracking and visualizing
        real-time Earth events. Dive in and start exploring the planet like
        never before!
      </p>
    </div>
  );
};

export default Welcome;
