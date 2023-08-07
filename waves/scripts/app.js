angular.module('waves',[]).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: wavesController,
        templateUrl: 'views/waves.html'
      })
      .when('/circles', {
        controller: circlesController,
        templateUrl:'views/circles.html'
      })
      .when('/spiral', {
        controller: spiralController,
        templateUrl:'views/spiral.html'
      // })
      // .when('/parabola', {
      //   controller: parabolaController,
      //   templateUrl:'views/parabola.html'
      });
  });
