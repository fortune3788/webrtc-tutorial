import React from 'react';

import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';
import VideoArea from './VideoArea';
import RtcClient from '../utils/RtcClient';

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
  const rtcClient = new RtcClient();

  return (
  <>
    <InputFormLocal rtcClient={rtcClient} />
    <InputFormRemote rtcClient={rtcClient} />
    <VideoArea rtcClient={rtcClient} />
  </>
  );
};

export default App;
