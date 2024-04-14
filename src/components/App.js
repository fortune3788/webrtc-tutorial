import React, { useReducer, useState } from 'react';

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
  const [rtcClient, _setRtcClient] = useState(new RtcClient());
  const [, forceRender] = useReducer((boolean => !boolean), false);

  const setRtcClient = (rtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  return (
  <>
    <InputFormLocal rtcClient={rtcClient} setRtcClient={setRtcClient} />
    <InputFormRemote rtcClient={rtcClient} setRtcClient={setRtcClient} />
    <VideoArea rtcClient={rtcClient} />
  </>
  );
};

export default App;
