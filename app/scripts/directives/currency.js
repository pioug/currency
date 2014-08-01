app.directive('currency', ['$compile', '$location', '$resource', function($compile, $location, $resource) {
  return {
    replace: true,
    scope: {
      toCurrency: "@",
      from: "="
    },
    templateUrl: 'views/components/currency.html',
    link: function(scope, iElement, iAttrs, controller) {
      scope.changeBase = function(evt) {
        scope.from.value = +scope.toValue;
        scope.from.currency = scope.toCurrency;
      };

      scope.$watch('from', function() {
        if (scope.from.currency === scope.toCurrency) {
          scope.toValue = scope.from.value;
        } else {
          var Rate = $resource('http://rate-exchange.appspot.com/currency?from=:from&to=:to');
          Rate.get({from: scope.from.currency, to: scope.toCurrency}, function(rate) {
            scope.exchange = rate;
            scope.toValue = +(scope.from.value * scope.exchange.rate).toFixed(4);
          });
        }
      }, true);
    }
  };
}]);
