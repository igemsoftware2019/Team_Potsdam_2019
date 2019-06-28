
var express = require('express');
var app = express();

app.get('/Team:Potsdam/', function (req, res) {
  res.sendFile(__dirname + "/build/igemBuild.html");
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});