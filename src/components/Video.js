import React, { useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import AudioAnalyser from './AudioAnalyser';
import VolumeButton from './VolumeButton';
import useDimensions from "./hooks/useDimensions";

const Video = ({ name, videoRef, isLocal, rtcClient }) => {
  const [muted, setMuted] = useState(rtcClient.initialAudioMuted);
  const refCard = useRef(null);
  const dimensionsCard = useDimensions(refCard);
  const refVolumeButton = useRef(null);
  const dimensionsVolumeButton = useDimensions(refVolumeButton);

  return (
    <Card ref={refCard}>
      <video 
      ref={videoRef}
      autoPlay={true} 
      muted={isLocal || muted }
      width={dimensionsCard.width}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <VolumeButton
        isLocal={isLocal}
        muted={muted} 
        setMuted={setMuted} 
        rtcClient={rtcClient} 
        refVolumeButton={refVolumeButton}
        />
        { !muted && videoRef.current && videoRef.current.srcObject &&(
          <AudioAnalyser 
          audio={videoRef.current.srcObject} 
          width={dimensionsCard.width - dimensionsVolumeButton.width - 100}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default Video;

