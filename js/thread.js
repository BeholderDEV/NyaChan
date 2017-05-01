(function () {
  var app = angular.module('nya-chan', ['angular-loading-bar', 'ngCookies', 'vcRecaptcha', 'toastr'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false
    }])

  app.controller('threadController', function ($scope, $http, $window, $cookies, $cookieStore, vcRecaptchaService, toastr) {
    $scope.init = function () {
      $scope.isUserLogged = false
      if ($cookies.get('user') !== undefined) {
        var user = JSON.parse($cookies.get('user'))
        $scope.userName = user.login
        $scope.userImage = user.avatar
        $scope.isUserLogged = true
      }
    }

    $scope.time_zone = new Date().getTimezoneOffset()
    var url = $(location).attr('href')
    var searchId = url.substring(url.lastIndexOf('/') + 1)
    $scope.response = null
    $scope.widgetId = null

    $scope.model = {
      key: '6LfogRgUAAAAACNUIiCwMJPsPJ0NxiS7tafx-B55'
    }

    $scope.setWidgetId = function (widgetId) {
      console.info('Created widget ID: %s', widgetId)

      $scope.widgetId = widgetId
    }

    $scope.cbExpiration = function () {
      console.info('Captcha expired. Resetting response object')

      vcRecaptchaService.reload($scope.widgetId)

      $scope.response = null
    }

    $scope.setResponse = function (response) {
      console.info('Response available')

      $scope.response = response
    }

    $scope.searchThread = function (threadID) {
      $http({
        method: 'GET',
        url: 'https://nyachan-server.herokuapp.com/api/thread/' + threadID
              // url: "http://localhost:3000/app/thread/" + threadID
      }).then(function mySucces (response) {
        $scope.thread = response.data[0]
      }, function myError (response) {
        $window.location.href = 'https://nyachan-server.herokuapp.com/404'
      })
    }

    $scope.thread = $scope.searchThread(searchId)

    $scope.addPost = function (post) {
      $http({
        url: 'https://nyachan-server.herokuapp.com/recaptcha',
        method: 'POST',
        data: {'response': $scope.response},
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(function successCallback (response) {
        validatedPost(JSON.parse(response.data.body).success)
        toastr.success('Right in the Post', 'You\'ve just answered it')
      }, function errorCallback (response) {
        console.log(response)
        toastr.error('O my gof', 'Why is it happening? Try again')
      })

      function validatedPost (valid) {
        if (valid) {

        } else {
          vcRecaptchaService.reload($scope.widgetId)
          return
        }
        var files = $('#file')[0].files[0]

        if (typeof post === 'undefined') {
          post = {}
          post.body = ' '
        }

        if (!validarPost(post, files)) {
            return
        }

        if (files !== null) {
          if (!validFile(files.name)) {
            alert('Arquivo Invalido')
            return
          }
        }

        if (typeof files !== 'undefined') {
          var formData = new FormData()
          formData.append('fileData', files)
          var xhr = new XMLHttpRequest()
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              var uploadedFile = JSON.parse(xhr.response)
              sendPost(files, uploadedFile)
            }
          }
          xhr.upload.addEventListener('progress', function (evt) {
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total
              $('#loader').width(Math.round(percentComplete * 100) + '%')
            }
          }, false)
          xhr.open('post', '/dbxPost/0/' + $scope.thread._id, true)
          xhr.send(formData)
        } else {
          sendPost(null, null)
        }

        function sendPost (file, uploadedFile) {
          if (typeof files !== 'undefined') {
            var ext = files.name.substring(files.name.lastIndexOf('.') + 1).toLowerCase()
            var dataPost = {
              threadid: $scope.thread._id,
              body: post.body,
              date: '2016-01-02 19:33:00',
              title: post.title,
              userName: 'Anon',
              file: [{
                size: uploadedFile.size,
                name: files.name,
                extension: ext,
                height: uploadedFile.height,
                width: uploadedFile.width,
                source: uploadedFile.mainUrl,
                thumb: uploadedFile.thumbUrl
              }]
            }
          } else {
            var dataPost = {
              threadid: $scope.thread._id,
              body: post.body,
              date: '2016-01-02 19:33:00',
              title: post.title,
              userName: 'Anon'
            }
          }

          $http({
            method: 'POST',
            url: 'https://nyachan-server.herokuapp.com/api/thread/newPost',
            data: dataPost,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function mySucces (response) {
            $scope.thread = $scope.searchThread(searchId)
            vcRecaptchaService.reload($scope.widgetId)
            $('#newThreadModal').modal('hide')
            $('#loader').width('0%')
            toastr.success('You\'ve posted it', 'Why?')
          }, function myError (response) {
            console.log(response || 'Request failed')
          })
        }
      }
    }
  })
})()
