app.directive('format', ['$filter', function($filter) {
  return {
    require:'ngModel',
    link: function(scope, element, attrs, controller) {

      element.bind('blur', function() {
        this.value = $filter('currency')(this.value.replace(/,/g, ''), '');
      });

      controller.$formatters.push(function(value) {
        return $filter('currency')(value, '');
      });

      controller.$parsers.push(function(value) {
        var val = ('' + value).replace(/,/g, '');
        return +val;
      });

    }
  }
}]);
