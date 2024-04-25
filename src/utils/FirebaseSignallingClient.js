import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export default class FirebaseSignallingClient {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDvHLkRZ3aKSnuz8y3KUM8Dq3_qycJ3qbk",
      authDomain: "webrtc-tutorial-37e06.firebaseapp.com",
      databaseURL: "https://webrtc-tutorial-37e06-default-rtdb.firebaseio.com",
      projectId: "webrtc-tutorial-37e06",
      storageBucket: "webrtc-tutorial-37e06.appspot.com",
      messagingSenderId: "591419662104",
      appId: "1:591419662104:web:4167f34f85fdcdc97c886d"
    };
    if(firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.localPeerName = '';
    this.remotePeerName = '';
  }

  setPeerNames(localPeerName, remotePeerName){
    this.localPeerName = localPeerName;
    this.remotePeerName = remotePeerName;
  }

  get targetRef(){
    return this.database.ref(this.remotePeerName);
  }

  async sendOffer(sessionDescription){
    await this.targetRef.set({
      type: 'offer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendAnswer(sessionDescription){
    await this.targetRef.set({
      type: 'answer',
      sender: this.localPeerName,
      sessionDescription,
    })
  }

  async sendCandidate(candidate){
    await this.targetRef.set({
      type: 'candidate',
      sender: this.localPeerName,
      candidate,
    })
  }

  async remove(path){
    await this.database.ref(path).remove();
  }
}

