import React, { useEffect, useRef } from "react";

import Video from "./Video";

const VideoRemote = ({ name }) => {
  const videoRef = null;
  

  return <Video videoRef={videoRef} name={name} isLocal={false} />;
};

export default VideoRemote;

