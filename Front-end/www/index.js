const { Chirp } = ChirpConnectSDK;
var processData;
var myWallet_id = "1234567589";
var transaction = {};

var processChirp = function () {
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
    sdk.send("1234567589,50");
    convertDataAndSave();
    //sdk.stop();
  }).catch(console.error)
}

var receiveChirp = function () {
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
    onReceived: data => {
      if (data.length > 0) {
        console.log(data);
        processData = data;
        var ASCIIData = hex2a(sdk.asString(processData));
        var splitData = ASCIIData.split(",");
        if (splitData[0] == "1") {
          //reduce balance by amount sent
          console.log("payment confirmed");
        } else if (splitData[0] == "0") {
          //cancel/do nothing 
          console.log("payment cancelled");
        }else{
          convertDataAndSave();
        }
        //stopSDK();
      }
    }
  }).then(sdk => {
    //do nothing for now maybe make the json here 

  }).catch(console.error)
}
var stopSDK = function () {
  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => {
      console.log(current);
    },
  }).then(sdk => {
    sdk.stop();
  }).catch(console.error)
}

var convertDataAndSave = function () {
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
    //date: is the current time stamp, type: always received in this case, wallet_id: id for user wallet, amount: is amount $
    if (myWallet_id == splitData[0]) {
      transaction += {
        "date": new Date(),
        "type": "received",
        "wallet_id": splitData[0],
        "amount": splitData[1]
      };
      localStorage.setItem('transaction', JSON.stringify(transaction));
      sdk.send("1");
      sdk.stop();
    } else {
      console.log("wrong phone number");
      sdk.send("0");
      sdk.stop();
    }
  }).catch(console.error)
}

var hex2a = function (hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}