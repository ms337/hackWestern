const { Chirp } = ChirpConnectSDK;
var processData;

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
    sdk.send("hello");
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
        processData = data;
        convertDataAndSave();
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

var convertDataAndSave = function(){
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    }
  }).then(sdk => {
    console.log(processData);
    console.log(sdk.asString(processData));
    console.log(hex2a(sdk.asString(processData)));
    var ASCIIData = hex2a(sdk.asString(processData));
    var splitData = ASCIIData.split(",");
    //date: is the current time stamp, type: 0 = receive, 1 = send, wallet_id: id for user wallet, amount: is amount $
    var transaction = {
          "date":new Date(),
          "type":splitData[0],
          "wallet_id":splitData[1],
          "amount":splitData[2]
    };
    localStorage.setItem('transaction', JSON.stringify(transaction));
    
  }).catch(console.error)
}

var hex2a = function (hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}