import React, { useState } from 'react';

import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';

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
  const [localPeerName, setLocalPeerName] = useState('');
  const [remotePeerName, setRemotePeerName] = useState('');

  return (
  <>
    <InputFormLocal
      localPeerName={localPeerName}
      setLocalPeerName={setLocalPeerName}
    />
    <InputFormRemote
      localPeerName={localPeerName}
      remotePeerName={remotePeerName}
      setRemotePeerName={setRemotePeerName}
    />
  </>
  );
};

export default App;
