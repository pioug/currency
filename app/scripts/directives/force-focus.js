app.directive('forceFocus', ['$timeout', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.forceFocus, function(value) {
        if(value === false) return;
        $timeout(function() { element[0].focus(); }, 0);
      });
    }
  };
}]);
