function calc_exchange_rate()
{
	var quantity = 3;
	var exchange_value = 1.2;
	var result = quantity * exchange_value;
	currency.rate_value = result;
	$("#result h1").text(result);
	
}