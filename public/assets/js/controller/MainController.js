

app.controller('MainController', ['$scope', function($scope) { 
  $scope.quantity = 0;
  $scope.sel = "";
  $scope.opt = "";
  $scope.exchange_rate = 0;
  $scope.result = 0;
  $scope.calc_conversion = function() { 
  	$scope.quantity = document.getElementById("quantity").value;
	$scope.sel = document.getElementById("to_convert");
	$scope.opt = $scope.sel.options[$scope.sel.selectedIndex].text.substring(0,3);
	console.log("Valor :" + $scope.opt);
	$scope.exchange_rate = 1.2;
	$scope.result = $scope.quantity * $scope.exchange_rate + " " + $scope.opt;
	};
  
}]);