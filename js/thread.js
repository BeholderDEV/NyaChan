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
      }else{
        $scope.userName = 'Anon'
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

      }, function errorCallback (response) {
        console.log(response)
      })

      function validatedPost (valid) {
        if (valid) {

        } else {
          vcRecaptchaService.reload($scope.widgetId)
          return
        }
        var files = $('#file')[0].files[0]

        if (post === undefined) {
          post = {}
          post.body = ' '
        }

        if (!validarPost(post, files)) {
            return
        }

        if (files !== undefined) {
          if (!validFile(files.name)) {
            alert('Arquivo Invalido')
            return
          }
        }

        if (files !== undefined) {
          var sendFilesToDropbox = function(i, files, uploadedFiles)
          {
              var formData = new FormData()
              formData.append('fileData', files[i])
              var xhr = new XMLHttpRequest()
              xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  var uploadedFile = JSON.parse(xhr.response)
                  uploadedFiles[i] = uploadedFile
                  if(i>=files.length-1)
                  {
                    sendPost(files, uploadedFiles);
                  }
                  else{
                    sendFilesToDropbox(i+1, files, uploadedFiles)
                  }
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
              console.log("UPLOAD "+ i)
          }
          sendFilesToDropbox(0, files, uploadedFiles)
        } else {
          sendPost(null, null)
        }

        function sendPost (files, uploadedFiles) {
          if (files !== undefined) {
            var ext = files.name.substring(files.name.lastIndexOf('.') + 1).toLowerCase()
            var dataPost = {
              threadid: $scope.thread._id,
              body: post.body,
              date: '2016-01-02 19:33:00',
              title: post.title,
              userName: $scope.userName,
              file: filesToJSON(files, uploadedFiles)
            }
          } else {
            var dataPost = {
              threadid: $scope.thread._id,
              body: post.body,
              date: '2016-01-02 19:33:00',
              title: post.title,
              userName: $scope.userName
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
            toastr.success('Right in the Post', 'You\'ve just answered it')
          }, function myError (response) {
            toastr.error('OMG, its dead!', 'Error')
            console.log(response || 'Request failed')
          })
        }
      }
    }
  })
})()
