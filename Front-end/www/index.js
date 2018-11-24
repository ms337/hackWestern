const { Chirp } = ChirpConnectSDK;

var processChirp = function (){
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
    onReceived: data => {
      if (data.length > 0) {
        console.log(data);
      }
    }
  }).then(sdk => {
    sdk.send([0, 1, 2, 3]);
    sdk.stop();
  }).catch(console.error)
}

var receiveChirp = function(){
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
    onReceived: data => {
      if (data.length > 0) {
        console.log(data);
        stopSDK();
      }
    }
  }).then(sdk => {
    //do nothing for now maybe make the json here
  }).catch(console.error)
}
var stopSDK = function(){
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
  }).then(sdk => {
    sdk.stop();
  }).catch(console.error)
}