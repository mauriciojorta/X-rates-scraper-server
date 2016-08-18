var request = require('request');
var cheerio = require('cheerio');
var currency = require('./currency.json');
var fs = require('fs');
var outputFilename = "./currency.json";	
var wait = require('wait.for');


var exchangeRates = (function() {
	
	function callback(write)
	{
		return write;
	}
	
function updateAll(update_status)
{
	update_status.ready = false;
	wait.launchFiber(updateAllCurrencies, update_status);
}
	
	function updateAllCurrencies(update_status)
	{
		var currencies = ["USD - US Dollar", "EUR - Euro", "GBP - British Pound", "JPY - Yen", "INR - Indian Rupee", "CNY - Chinese Yuan",  "ARS - Argentine Peso", "COP - Colombian Peso", "CLP - Chilean Peso", "MXN - Mexican Peso", "BRL - Brazilian Real", "RUB - Russian Ruble"];
		currencies.sort();
		for (var i = 0; i<currencies.length; i++)
		{
			//console.log("Updating " + currencies[i] + " rates");
			for (var j = 0; j<currencies.length; j++)
			{
				//updateCurrencyRate(currencies[i], currencies[j]);
				wait.for(updateCurrencyRate, currencies[i], currencies[j]);
				console.log(j);
			}
		}
		fs.writeFileSync(outputFilename, JSON.stringify(currency, null, 2));
		update_status.ready = true;
		
		
	
		
	}
	
function updateCurrencyRate(currency1, currency2, callback)
	{
		
		   var url = 'http://www.x-rates.com/calculator/?from=' + currency1.substring(0,3) + '&to=' + currency2.substring(0,3) +'&amount=1';
		   
		   var options = {
	      url: url,
	        headers: { 'User-Agent': 'request' }
	    };
           
		   request(options, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
              var data = $('.ccOutputRslt').first().contents().filter(function(){	
			  return this.type === 'text';
            });
			console.log(currency1 + " " + currency2 + ""+ data.text());
			currency[currency1][currency2+"_rate"] = Number(data.text().replace(",", ""));
				  //console.log(currency[currency1][currency2.substring(0,3)+"_rate"]);
				 return callback(console.log("Ready"));
				  
        }
    })
	}
	

	
		return {
		updateAll : updateAll
	}

})();

module.exports = exchangeRates;
