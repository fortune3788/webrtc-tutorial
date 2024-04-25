import React, { useRef } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import useDimensions from "./hooks/useDimensions";

const Video = ({name, videoRef, isLocal}) => {
  const refCard = useRef(null);
  const dimensionsCard = useDimensions(refCard);

  return (
    <Card ref={refCard}>
      <video 
      ref={videoRef}
      autoPlay={true} 
      muted={isLocal}
      width={dimensionsCard.width}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export default Video;

