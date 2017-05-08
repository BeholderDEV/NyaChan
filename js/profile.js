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
  }
})
