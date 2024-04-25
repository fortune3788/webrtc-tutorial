import React, { useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import VolumeButton from './VolumeButton';
import useDimensions from "./hooks/useDimensions";

const Video = ({name, videoRef, isLocal}) => {
  const [muted, setMuted] = useState(true);
  const refCard = useRef(null);
  const dimensionsCard = useDimensions(refCard);

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
        <VolumeButton muted={muted} setMuted={setMuted} />
      </CardActions>
    </Card>
  );
}

export default Video;

