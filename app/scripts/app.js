var app = angular
  .module('Currency',['ngAnimate'])
  .controller('currencyCtrl', ['$scope', function($scope) {
    $scope.currencies = [{ toCurrency: "EUR" }, { toCurrency: "USD" }];
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
