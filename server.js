// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function(req, res) {
  let params = req.params;
  let dateInput = params.date;
  let parsedTime;
  if (dateInput === undefined) {
    parsedTime = new Date();
    res.json({
      "unix": parsedTime.getTime(),
      "utc": parsedTime.toUTCString(),
    });
  }

  if (/^[0-9]*$/.test(dateInput)) {
    dateInput = parseInt(dateInput);
  }
  parsedTime = new Date(dateInput);
  
  if (parsedTime.toUTCString() === 'Invalid Date') {
    res.json({
      "error": "Invalid Date"
    })
  }
  res.json({
    "unix": parsedTime.getTime(),
    "utc": parsedTime.toUTCString(),
  });
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
