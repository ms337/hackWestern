const { Chirp } = ChirpConnectSDK;

Chirp({
  key: 'CFaaF6C954bA8ddb5f5CFDeBD',
  onStateChanged: (previous, current) => {
    console.log(current)
  },
  onReceived: data => {
    if (data.length > 0) {
      console.log(data)
    }
  }
}).then(sdk => {
  sdk.send([0, 1, 2, 3]);
}).catch(console.error)
