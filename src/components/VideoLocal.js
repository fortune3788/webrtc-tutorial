import React, { useEffect, useRef } from "react";

const VideoLocal = () => {
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

  return <></>;
};

export default VideoLocal;

