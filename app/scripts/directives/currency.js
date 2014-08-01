app.directive('currency', ['$compile', '$location', '$http', function($compile, $location, $http) {
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
          $http.jsonp('http://rate-exchange.appspot.com/currency?from=' + scope.from.currency + '&to=' + scope.toCurrency + '&callback=JSON_CALLBACK').success(function(rate) {
            scope.exchange = rate;
            scope.toValue = +(scope.from.value * scope.exchange.rate).toFixed(4);
          });
        }
      }, true);

    }
  };
}]);
