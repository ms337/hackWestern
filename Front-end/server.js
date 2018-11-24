const express = require('express')
const app = express()
var path = require('path');
const port = 3000
app.use(express.static('www'));
var fs = require('fs');
var filename = "../Back-End/sample_collection_data.json";

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

// fs.exists(filename, function(exists) {
//   if (exists) {
//     fs.stat(filename, function(err, stats) { 
//       if (stats.isDirectory()) {
//         console.log(filename + ": is a directory");
//       } else {
//         // do something with file
//         console.log(filename);
//         var myJSONdata = JSON.stringify("hello");
//         fs.writeFileSync(filename, myJSONdata); //default: 'utf8'
//       }
//     });
//   } else {
//     console.log(filename + ": no such file");
//   }
// });