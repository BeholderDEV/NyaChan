(function () {
  var app = angular.module('nya-chan', ['angular-loading-bar', 'ngCookies', 'toastr','ui.bootstrap'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false
    }])

  app.controller('profileController', function ($scope, $http, $window, $cookies, $cookieStore, toastr) {

    $scope.init = function () {
      $scope.isUserLogged = false
      $scope.isUserAdmin = false
      if ($cookies.get('user') !== undefined) {
        var user = JSON.parse($cookies.get('user'))
        $scope.userName = user.login
        $scope.userImage = user.avatar
        $scope.isUserLogged = true
        $scope.isUserAdmin = user.role === 'admin'
      } else {
        $scope.userName = 'Anon'
      }
    }
  })
  $scope.search = function () {
    $http({
      method: 'GET',
      url: 'https://nyachan-server.herokuapp.com/api/threads?sortType=numberOfPosts'
              // url: "http://localhost:3000/api/tag/" + searchTag + '?sortType=lastDate&archived=false'
    }).then(function mySucces (response) {
      var out = [];
      for(var i = 0 ; i < response.data.length ; i++){
        if(response.data[i].userName === $scope.userName){
          out.put(response.data[i])
        }
      }
      $scope.threads = out
    }, function myError (response) {
      $window.location.href = 'https://nyachan-server.herokuapp.com/404'
    })
  }
  $scope.threads = $scope.search()
})()
