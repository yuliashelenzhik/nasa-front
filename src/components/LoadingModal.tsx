import React from "react";
import { useLoading } from "../context/LoadingContext";

const LoadingModal: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-modal">
        <p>Please give me a minute,</p>
        <p>I'm retrieveing the most recent data...</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoadingModal;
