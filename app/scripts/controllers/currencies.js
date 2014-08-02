app.controller('currenciesCtrl', ['$scope', '$http', function($scope, $http) {


  try {
    $scope.currencies = JSON.parse(localStorage.currencies)
  } catch(e) {
    $scope.currencies = ['XBT'];
  }

  try {
    $scope.from = JSON.parse(localStorage.from)
  } catch(e) {
    $scope.from = { value: 1, currency: 'XBT' };
  }

  $http.get('https://gist.githubusercontent.com/pioug/aa0b42824d91a0b916af/raw/de8dac8ee03d56bb7e9d69b4d2606959b9f6b226/currencies.json')
    .success(function(data) {
      $scope.currenciesList = _.sortBy(data, 'code');
    });

  $scope.$watch('from', function(newValues, oldValues, scope) {
    localStorage.from = JSON.stringify(newValues);
  }, true);

  $scope.$watch('currencies', function(newValues, oldValues, scope) {
    localStorage.currencies = JSON.stringify(newValues);
  }, true);

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

  $scope.hideAside = function(event) {
    $scope.aside = false;
  };

  $scope.toggleAside = function(event) {
    event.stopPropagation();
    $scope.aside = !$scope.aside;
    if ($scope.aside) {
      $scope.nextCurrency = '';
    }
  };

}]);
