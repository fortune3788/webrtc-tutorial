import React, { useEffect, useRef } from "react";

import Video from "./Video";

const VideoLocal = ({ rtcClient }) => {
  const videoRef = useRef(null);
  const currentVideoRef = videoRef.current;  
  const mediaStream = rtcClient.mediaStream;

  useEffect(() => {
    if (currentVideoRef === null) return;

    const getMedia = () => {
      try {
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.log(err);
      }
    }

    getMedia();
  }, [currentVideoRef, mediaStream]);

  return <Video videoRef={videoRef} name={rtcClient.localPeerName} isLocal={true} />;
};

export default VideoLocal;

