app.controller('currencyCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.currencies = ['EUR', 'USD', 'XBT'];
  $scope.from = {
    value: 10,
    currency: 'USD'
  };

  $http.get('https://gist.githubusercontent.com/pioug/aa0b42824d91a0b916af/raw/61fac7996969bcbaf22aac1a1c6a5eaf22ea835b/currencies.json')
    .success(function(data) {
      $scope.currenciesList = _.sortBy(data, 'code');
    });

  $scope.addCurrency = function(currency) {
    if (!$scope.isSelected(currency)) {
      $scope.currencies.push(currency);
    } else {
      $scope.currencies.splice($scope.currencies.indexOf(currency), 1);
    }
  };

  $scope.isSelected = function(currency) {
    return $scope.currencies.indexOf(currency) !== -1;
  };

}]);
