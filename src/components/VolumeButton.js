import React from "react";

import { IconButton } from "@mui/material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const VolumeButton = ({ muted, setMuted }) => {
  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;
  
  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((previousState) => !previousState);
      }}
    >
      <Icon />
    </IconButton>
  );
};

export default VolumeButton;