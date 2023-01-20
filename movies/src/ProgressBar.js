import React from "react";

const ProgressBar = ({ likes, dislikes }) => {
  const ratio = likes / dislikes;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar likes" style={{ width: `${ratio}%` }} />
    </div>
  );
};

export default ProgressBar;
