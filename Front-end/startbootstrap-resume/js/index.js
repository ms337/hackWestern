const { Chirp } = ChirpConnectSDK;
var processData;
var myWallet_id = "1234567589";
var transaction = {};
sendPressed = false;
var balance = 0;


var stateText = document.getElementById("state");
var infoText = document.getElementById("info");



var sendChirp = function(){
  sendPressed = true;
  stateText.innerHTML = "Sending";
  infoText.innerHTML = "awaiting transaction validation"
  receiveChirp();
}
var receiveChirp = function () {

  Chirp({
    key: 'CFaaF6C954bA8ddb5f5CFDeBD',
    onStateChanged: (previous, current) => 
    {
      console.log(current);
    },
    onReceived: data => {
      stateText.innerHTML = "Received"
      if (data.length > 0) {
        console.log(data);
        processData = data;
        convertDataAndSave();
      }
    }
  }).then(sdk => {
    if(sendPressed){
      //first arg is phone number of person you send to
      var toSend = document.getElementById("amount").value;
      var toSendTo = document.getElementById("phoneNumberToSendTo2").value;
      sdk.send(toSendTo + "," + toSend);

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
      infoText.innerHTML = "Transaction Success"
      sendMoney();
  
      sdk.stop();
    }else if(splitData[0]=="0"){
      infoText.innerHTML = "Transaction Failure"
      sdk.stop();
    }
    //date: is the current time stamp, type: always received in this case, wallet_id: id for user wallet, amount: is amount $
    else if (myWallet_id == splitData[0]) {
      transaction += 
      {
        "date": new Date(),
        "type": "received",
        "wallet_id": splitData[0],
        "amount": splitData[1]
      };
      localStorage.setItem('transaction', JSON.stringify(transaction));
      infoText.innerHTML = "Proceed with transaction"
      sdk.send("1");
  
      sdk.stop();
    } else {

      infoText.innerHTML = "Cancel the transaction"
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
  var cardNumber = document.getElementById("cardNumber").value;
  var expiryDate = document.getElementById("expiryDate").value;
  var cardCode = document.getElementById("cardCode").value;
  var amountToAdd = document.getElementById("amountToAdd").value;
  balance += parseFloat(amountToAdd);
  const xhttp = new XMLHttpRequest();
  const url = 'http://35.231.228.196:80/update_user';
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      print("WORKS");
    }
  }
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(info = {"amount" : amountToAdd,
  "creditCard": {
              "cardNumber": cardNumber,
              "expirationDate": expiryDate,
              "cardCode": cardCode }
  });
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText);
  //console.log(xhttp.responseText);
  }
}

var withdrawFromWallet = function() {
  var accountType = document.getElementById("accountType").value;
  var routingNumber = document.getElementById("routingNumber").value;
  var accountNumber = document.getElementById("accountNumber").value;
  var nameOnAccount = document.getElementById("nameOnAccount").value;
  var amountToTakeOut = document.getElementById("amountToTakeOut").value;
  balance -= parseFloat(amountToTakeOut);
  const Http = new XMLHttpRequest();
  const url = 'http://35.231.228.196:80/withdraw'; //CHECK URL

  Http.open("POST", url);

  Http.send(info = {"amount" : amountToTakeOut,
            "payment":{
                "bankAccount": {
                    "accountType": accountType,
                    "routingNumber": routingNumber,
                    "accountNumber": accountNumber,
                    "nameOnAccount": nameOnAccount
                }
            }
          });
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText);
  //console.log(xhttp.responseText);
  }
}

var userSignUp = function() {
  var phoneNumber = document.getElementById("phoneNumber").value;
  var password = document.getElementById('registerPassword').value;

  const Http = new XMLHttpRequest();
  const url = 'http://35.231.228.196:80/create_user'; 

  Http.open("POST", url);
  Http.send(info = 
                {
                  "wallet_id" : phoneNumber,
                  "password" : password,
          });
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText);
  //console.log(xhttp.responseText);
  }
}

//FINISH
var sendMoney = function() {
  var phoneNumber = document.getElementById("phoneNumber2").value;
  var amountToTakeOut = document.getElementById("amount").value;
  balance -= parseFloat(amountToTakeOut);
  const Http = new XMLHttpRequest();
  const url = 'http://35.231.228.196:80/update_transactions'; //CHECK URL

  Http.open("POST", url);
  Http.send(info = {"amount" : amountToTakeOut,
                    "wallet_id_recipient": phoneNumber,
                    "wallet_id_sender": myWallet_id,
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