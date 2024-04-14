import React from 'react';

import VideoArea from './VideoArea';
import useRtcClient from './hooks/useRtcClient';
import InputForms from './InputForms';

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
  const rtcClient = useRtcClient();
  
  return (
  <>
    <InputForms rtcClient={rtcClient} />
    <VideoArea rtcClient={rtcClient} />
  </>
  );
};

export default App;
