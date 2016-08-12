var express = require('express');
var packageInfo = require('./package.json');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var currency = require('./currency.json');
var exchangeRate = require('./exchange_rates');
var update = require('node-cron');
var update_status = {ready: true};

update.schedule('0 * * * *', function(){
	console.log("Updating!");
	exchangeRate.updateAllCurrencies();
  console.log('running a task every hour');
});



var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
	if (update_status.ready == false)
	{
		res.send(401, 'The currencies DB is updating. Please try again later');
	}
	else
	{
		res.sendfile(__dirname + '/currency.json');
	}
 	
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});


app.listen(app.get('port'), function() {
//exchangeRate.updateAll(update_status);
console.log(update);
  console.log('Node app is running on port', app.get('port'));
});






