import React from "react";

import Video from "./Video";

const VideoRemote = ({ rtcClient }) => {
  const videoRef = rtcClient.remoteVideoRef;

  return (
    <Video
      videoRef={videoRef}
      name={rtcClient.remotePeerName}
      isLocal={false} 
      rtcClient={rtcClient}
    />
  );
};

export default VideoRemote;

