var http = require("http");
var url = require("url");
var fs = require("fs");
var Cookies = require("cookies");

var http = require("http"),
  path = require("path"),
  mime = require("mime"),
  fs = require("fs"),
  GUID = require("GUID"),
  formidable = require("formidable"),
  util = require("util");

//var someTools = require('someTools');

/*
var https = require("https");

var options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};*/

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    var cookieJar = new Cookies(request, response /*, { "keys": keys } */);
    //cookieJar.set( "email", "yourmom@gmail.com", { httpOnly: false, expires: new Date(new Date().getTime()+86409000).toUTCString()} );

    console.log("Request for " + pathname + " received.");
    //console.log('JSON = ' + JSON.stringify(cookies));

    //request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      //Texto que manda el POST request
      console.log("Received POST data chunk");
      // '"+ postDataChunk + "'.");
      console.log("\n Add listener data \n");
    });

    if (request.method === "POST" && request.url === "/uploadIMG") {
      request.on("error", function(e) {
        console.log("Problem with requestuest: " + e.message);
      });

      var fileDirectory = __dirname + "/imagenes/",
        form = new formidable.IncomingForm();

      form.keepExtensions = true;
      form.uploadDir = fileDirectory;

      form.on("file", function(field, file) {
        //rename the incoming file to the file's name
        fs.rename(file.path, form.uploadDir + "/" + "fotoTest.jpg", function(
          error
        ) {});
      });

      form.parse(request, function(err, fields, files) {
        if (err) throw err;

        var pic = JSON.stringify(util.inspect(files)),
          upIndx = pic.indexOf("imagenesdb"),
          path = pic.slice(upIndx + 6, upIndx + 42);

        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        // fs.readFile("sucess.html", function(err, page) {
        //   response.writeHead(200, {
        //     "Content-Type": "text/html"
        //   });
        //   response.write(page);
        //   response.end();
        // });
      });
    } else {
      request.addListener("end", function() {
        route(handle, pathname, response, postData, cookieJar);
        console.log("\n Add listener end \n");
      });
    }
  }

  //https.createServer(options, onRequest).listen(8888);

  http.createServer(onRequest).listen(3000);
  console.log("Server has started.");
}
exports.start = start;
