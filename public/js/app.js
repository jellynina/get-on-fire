var app = angular.module('powerup', ['ngRoute', 'firebase']);

//The Firebase URL set as a Constant
app.constant('fbURL', 'https://power-up.firebaseio.com/');

//Configuring the route providers to redirect to the right location
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'main.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});
