export default class RtcClient {
  constructor(setRtcClient) {
    const config = {
      iceServers: [
        {
          urls: 'stun:stunserver.stunprotocol.org',
        },
      ],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = "";
    this.remotePeerName = "";
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
  }

  setRtcClient(){
    this._setRtcClient(this);
  }

  async getUserMedia() {
    try {
      const constraints = {
        video: true,
        audio: true,
      };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);  
    } catch (error) {
      console.log(error);
    }
  }

  stratListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    // TODO: ここにシグナリングサーバをリスンする処理を追加する。
  }
}

