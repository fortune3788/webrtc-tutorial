import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const useStyles = makeStyles({
  icon: {
    height: 38,
    width: 38,
  },
});

const VolumeButton = ({ isLocal, muted, setMuted, rtcClient, refVoluemeButton }) => {
  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;
  const classes = useStyles();
  
  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((previousState) => !previousState);
        // 以下はlocal側だけで実行可能
        if (isLocal) rtcClient.toggleAudio();
      }}
      ref={refVoluemeButton}
    >
      <Icon className={classes.icon} />
    </IconButton>
  );
};

export default VolumeButton;