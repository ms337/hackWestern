const { Chirp } = ChirpConnectSDK;
var processData;
var myWallet_id = "1234567589";
var transaction = {};
sendPressed = false;

var sendChirp = function(){
  sendPressed = true;
  receiveChirp();
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
        convertDataAndSave();
      }
    }
  }).then(sdk => {
    if(sendPressed){
      //first arg is phone number of person you send to
      sdk.send("1234567589,50");
      sendPressed = false;
    }

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
    var ASCIIData = hex2a(sdk.asString(processData));
    var splitData = ASCIIData.split(",");
    if(splitData[0]=="1"){
      console.log("payment confirmed")
      sdk.stop();
    }else if(splitData[0]=="0"){
      console.log("payment cancelled")
      sdk.stop();
    }
    //date: is the current time stamp, type: always received in this case, wallet_id: id for user wallet, amount: is amount $
    else if (myWallet_id == splitData[0]) {
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

var updateWallet = function() {
  const Http = new XMLHttpRequest();
  const url = 'https://8080-dot-4934063-dot-devshell.appspot.com/';

  Http.open("POST", url);

  Http.send(info = {"amount" : 50,
  "creditCard": {
              "cardNumber": "5424000000000015",
              "expirationDate": "2020-12",
              "cardCode": "999" }
  });
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText);
  //console.log(xhttp.responseText);
  }
}

var updateWallet = function() {
  const Http = new XMLHttpRequest();
  const url = 'https://8080-dot-4934063-dot-devshell.appspot.com/';

  Http.open("POST", url);

  Http.send(info = {"amount" : 50,
  "creditCard": {
              "cardNumber": "5424000000000015",
              "expirationDate": "2020-12",
              "cardCode": "999" }
  });
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText);
  //console.log(xhttp.responseText);
  }
}



/*

*/

/*https://jsonplaceholder.typicode.com/posts   TEST FOR POST METHOD
*/