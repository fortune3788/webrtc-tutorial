import React from "react";

const Video = ( {name, videoRef, isLocal} ) => {
  return (
    <div>
      <video ref={videoRef} autoPlay={true} muted={isLocal} />
      <div>{name}</div>
    </div>
  );
};

export default Video;

