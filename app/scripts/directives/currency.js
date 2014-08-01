app.directive('currency', ['$compile', '$location', function($compile, $location) {
  return {
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
          scope.toValue = scope.from.value * 10;
        }
      }, true);
    }
  };
}]);
