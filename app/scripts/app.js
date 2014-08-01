var app = angular
  .module('Currency',['ngAnimate', 'ngResource'])
  .controller('currencyCtrl', ['$scope', function($scope) {
    $scope.currencies = [{ toCurrency: "EUR" }, { toCurrency: "USD" }, { toCurrency: "XBT" }];
    $scope.from = {
      value: 10,
      currency: 'USD'
    };

    $scope.addCurrency = function() {
      $scope.currencies.push({});
    };

    $scope.$watch('from', function() {
      console.log($scope.from)
    }, true);

  }]);
