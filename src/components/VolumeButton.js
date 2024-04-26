import React from "react";

import { IconButton } from "@mui/material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const VolumeButton = ({ isLocal, muted, setMuted, rtcClient }) => {
  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;
  
  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((previousState) => !previousState);
        // 以下はlocal側だけで実行可能
        if (isLocal) rtcClient.toggleAudio();
      }}
    >
      <Icon />
    </IconButton>
  );
};

export default VolumeButton;