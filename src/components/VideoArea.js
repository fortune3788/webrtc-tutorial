import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import VideoLocal from './VideoLocal';
import VideoRemote from './VideoRemote';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const VideoArea = ( { rtcClient }) => {

  if(rtcClient === null) return <></>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6} md={6}>
          <VideoLocal rtcClient={rtcClient} />
        </Grid>
        <Grid item xs={6} md={6}>
          <VideoRemote rtcClient={rtcClient} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default VideoArea;

