var app = angular
  .module('Currency',['ngAnimate', 'ngResource'])
  .controller('currencyCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.currencies = [{ toCurrency: "EUR" }, { toCurrency: "USD" }, { toCurrency: "XBT" }];
    $scope.from = {
      value: 10,
      currency: 'USD'
    };

    $http.get('https://gist.githubusercontent.com/pioug/aa0b42824d91a0b916af/raw/61fac7996969bcbaf22aac1a1c6a5eaf22ea835b/currencies.json')
      .success(function(data) {
        $scope.currenciesList = _.sortBy(data, 'code');
      });

    $scope.addCurrency = function(currency) {
      $scope.currencies.push({ toCurrency: currency });
    };

    $scope.$watch('from', function() {
      console.log($scope.from)
    }, true);

  }]);
