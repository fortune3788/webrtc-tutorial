import FirebaseSignallingClient from './FirebaseSignallingClient';

export default class RtcClient {
  constructor(setRtcClient, remoteVideoRef) {
    const config = {
      iceServers: [
        {
          urls: 'stun:stunserver.stunprotocol.org',
        },
      ],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignallingClient = new FirebaseSignallingClient();
    this.localPeerName = "";
    this.remotePeerName = "";
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
    this.remoteVideoRef = remoteVideoRef;
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

   async setMediaStream(){
    await this.getUserMedia();
    this.addTracks();
    this.setRtcClient();
   }

   addTracks(){
    this.addAudioTrack();
    this.addVideoTrack();
   }

   addAudioTrack(){
    this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
   }

   addVideoTrack(){
    this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
   }

   get audioTrack(){
    return this.mediaStream.getAudioTracks()[0];
   }

   get videoTrack(){
    return this.mediaStream.getVideoTracks()[0];
   }

   async offer(){
    const sessionDescription = await this.createOffer();
    await this.setLocalDescription(sessionDescription);
    await this.sendOffer();
   }

    async createOffer(){
      try {
        return await this.rtcPeerConnection.createOffer();
      } catch(e){
        console.log(e);
      } 
    }

    async setLocalDescription(sessionDescription){
      try {
        await this.rtcPeerConnection.setLocalDescription(sessionDescription);
      } catch(e){
        console.log(e);
      }
    }

    async sendOffer(){
      this.firebaseSignallingClient.setPeerNames(
        this.localPeerName,
        this.remotePeerName
      );
      await this.firebaseSignallingClient.sendOffer(this.localDescription);
    }

   setOntrack(){
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if(rtcTrackEvent.track.kind !== 'video') return;

      const remoteMediaStream = rtcTrackEvent.streams[0];
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient();
    };

    this.setRtcClient();
   }

   async answer(sender, sessionDescription){
    try {
      this.remotePeerName = sender;
      this.setOnicecandidateCallback();
      this.setOntrack();
      await this.setRemoteDescription(sessionDescription);
      const answer = await this.rtcPeerConnection.createAnswer();
      this.rtcPeerConnection.setLocalDescription(answer);
      await this.sendAnswer(); 
    } catch(e) {
      console.error(e);
    }
   }

   async connect(remotePeerName){
    this.remotePeerName = remotePeerName;
    this.setOnicecandidateCallback();
    this.setOntrack();
    await this.offer();
    this.setRtcClient();
   }

   async setRemoteDescription(sessionDescription){
    await this.rtcPeerConnection.setRemoteDescription(sessionDescription);
   }

   async sendAnswer(){
    this.firebaseSignallingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );

    await this.firebaseSignallingClient.sendAnswer(this.localDescription);
   }

   async saveReceiveSessionDescription(sessionDescription){
    try{
      await this.setRemoteDescription(sessionDescription);
    } catch(e){
      console.error(e);
    }
   }

   get localDescription(){
    return this.rtcPeerConnection.localDescription.toJSON();
   }

   setOnicecandidateCallback(){
    this.rtcPeerConnection.onicecandidate = ({ candidate }) => {
      if(candidate){
        console.log({candidate});
        // TODO: remoetへcandidateを通知する。
      }
    };
   }

 async stratListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    await this.firebaseSignallingClient.remove(localPeerName);
    this.firebaseSignallingClient.database
      .ref('localPeerName')
      .on('value', async (snapshot) => {
        const data = snapshot.val();
        if(data === null) return;

        console.log({data});
        const { sender, sessionDescription, type } = data;
        switch(type) {
          case 'offer':
            await this.answer(sender, sessionDescription);
            break;
          case 'answer':
            await this.saveReceiveSessionDescription(sessionDescription);
            break;
          default:
            break;
        }
      });
  }
}

