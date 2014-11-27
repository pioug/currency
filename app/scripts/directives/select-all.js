app.directive('selectAll', function () {
  return {
    link: function (scope, element, attrs) {
      element.on('click', function () {
        this.select();
      });
    }
  };
});
