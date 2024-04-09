import React, { useEffect, useRef } from "react";

import Video from "./Video";

const VideoLocal = ({ name }) => {
  const videoRef = useRef(null);
  const currentVideoRef = videoRef.current;  

  useEffect(() => {
    if (currentVideoRef === null) return;

    const getMedia = async () => {
      const constraints = {
        video: true,
        audio: true,
      };
    
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.log(err);
      }
    }

    getMedia();
  }, [currentVideoRef]);

  return <Video videoRef={videoRef} name={name} isLocal={true} />;
};

export default VideoLocal;

