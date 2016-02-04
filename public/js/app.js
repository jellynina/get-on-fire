var app = angular.module('power-up', ['ngRoute', 'firebase', 'ngAutocomplete']);

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

    $scope.result = ''
    $scope.options = {};

    $scope.form = {
      type: 'geocode',
      bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
      country: 'ca',
      typesEnabled: false,
      boundsEnabled: false,
      componentEnabled: false,
      watchEnter: true
    }

    //watch form for changes
    $scope.watchForm = function () {
      return $scope.form
    };
    $scope.$watch($scope.watchForm, function () {
      $scope.checkForm();
    }, true);


    //set options from form selections
    $scope.checkForm = function() {

      $scope.options = {

      };


      $scope.options.watchEnter = $scope.form.watchEnter

      if ($scope.form.typesEnabled) {
        $scope.options.types = $scope.form.type
      }
      if ($scope.form.boundsEnabled) {

        var SW = new google.maps.LatLng($scope.form.bounds.SWLat, $scope.form.bounds.SWLng)
        var NE = new google.maps.LatLng($scope.form.bounds.NELat, $scope.form.bounds.NELng)
        var bounds = new google.maps.LatLngBounds(SW, NE);
        $scope.options.bounds = bounds

      }
      if ($scope.form.componentEnabled) {
        $scope.options.country = $scope.form.country
      }
    };


});
