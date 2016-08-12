
$("#action_button").click(function(){
		calc_exchange_rate();
	});

function calc_exchange_rate()
{
	var quantity = document.getElementById("quantity").value;
	var sel = document.getElementById("to_convert");
	var opt = sel.options[sel.selectedIndex];
	console.log("Valor :" + opt.text);
	var exchange_value = 1.2;
	var result = quantity * exchange_value;
	currency.rate_value = result;
	$("#result h1").text(result);
	
}