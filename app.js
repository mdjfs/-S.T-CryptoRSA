var crypto = require('./CryptoRSA');
let CryptoRSA = crypto.CryptoRSA;

var private_key = [3485113537, 2763870401];
var public_key = private_key[0] * private_key[1];

const servercrypto = new CryptoRSA(private_key, public_key);


const http = require('http');
var fs = require('fs');
var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "svg": "image/svg+xml",
  "json": "application/json",
  "js": "text/javascript",
  "css": "text/css"
};

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if(req.method == "GET"){
    var path = __dirname + req.url;
    fs.readFile(path, (error, file) => {
      if(!error){
        var extension = path.split(".");
        var extension = extension[extension.length-1]
        res.setHeader('Content-Type', mimeTypes[extension]);
        res.write(file);
      }
      res.end();
    });
  }
  else if(req.method == "POST"){
    res.setHeader('Content-Type', 'application/json');
    let body = ''; 
    req.on('data', chunk => body += chunk)
    .on('error', error => console.log(error))
    .on('end', () => {
      try{
        var json = JSON.parse(body);
        console.log("================ ENCRYPTED STRING =====================");
        console.log(json.content);
        console.log("=======================================================");
        console.log("================ DECRYPTED STRING =====================");
        var ArrayBuff = servercrypto.decrypt(json.content);
        console.log(String.fromCharCode.apply(null, new Uint16Array(ArrayBuff)));
        console.log("=======================================================");
      }
      catch(e){
        var json = {"public_key": servercrypto.getpublic_key()}
        res.write(JSON.stringify(json));
      }
      finally{
        res.end();
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});