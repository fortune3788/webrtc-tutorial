import React from 'react';
import { Button } from '@material-ui/core';

const getMedia = async () => {
  const constraints = {
    video: true,
    audio: true,
  };

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch (err) {
    /* エラーを処理 */
    console.log(err);
  }
}

getMedia();

const App = () => {
  return <Button variant="contained">Hello, React!</Button>;
};

export default App;
