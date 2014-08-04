app.directive('currency', ['$http', function($http) {
  return {
    replace: true,
    scope: {
      toCurrency: "@",
      from: "="
    },
    templateUrl: 'views/components/currency.html',
    link: function(scope, element, attrs, controller) {

      scope.changeBase = function(event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105)) {
          scope.from.value = +scope.toValue;
          scope.from.currency = scope.toCurrency;
        }
      };

      scope.$watch('from', function() {
        if (scope.from.currency === scope.toCurrency) {
          scope.toValue = scope.from.value;
        } else {
          $http.get('http://aqueous-temple-6169.herokuapp.com/api/v1/rate/' + scope.from.currency + '/' + scope.toCurrency).success(function(rate) {
            scope.exchange = rate;
            scope.toValue = +(scope.from.value * scope.exchange.rate);
          });
        }
      }, true);

    }
  };
}]);
