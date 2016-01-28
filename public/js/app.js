var app = angular.module('power-up', ['ngRoute', 'firebase']);

app.constant('fbUrl', 'https://power-up.firebaseio.com/');
app.constant('fbUrlStores', 'https://power-up.firebaseio.com/stores/')

app.factory('Stores', function ($firebase, fbUrl, fbUrlStores) {
    return $firebase(new Firebase(fbUrlStores)).$asArray();
});
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: '../main.html'
    })
    .when('/search', {
      controller: 'MainController',
      templateUrl: '../views/search.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});


app.controller('MainController', function ($scope, $firebase, Stores) {
    $scope.stores = Stores;
    $scope.savePower = function(store) {
      if (store.city && store.address && store.time && store.title) {

        Stores.$add({
          title: store.title,
          city: store.city,
          address: store.address,
          time: store.time
        })
        store.title = "";
        store.city = "";
        store.address = "";
        store.time = "";

      }else {
        alert("Plz fill all");
      }
    }
});
