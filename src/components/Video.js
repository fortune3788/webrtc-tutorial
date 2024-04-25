import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Video = ({name, videoRef, isLocal}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <video ref={videoRef} autoPlay={true} muted={isLocal} />
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

