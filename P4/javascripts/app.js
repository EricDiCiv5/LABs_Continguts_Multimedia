var express = require('express');
var app = express();
app.use(express.static('./'));

// GET method route to the two different pages
app.get('/Tenda_Virtual.html', function (req, res) {
res.send('GET request to the homepage');
});

app.get('/Tenda_Virtual_2.html', function (req, res) {
res.send('GET request to the homepage');
});

// POST method route
app.post(’/’, function (req, res) {
res.send('POST request to the homepage');
});

// Server start
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
