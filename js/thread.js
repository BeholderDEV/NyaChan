(function () {
  var app = angular.module('nya-chan', ['angular-loading-bar', 'ngCookies', 'vcRecaptcha', 'toastr','ui.bootstrap'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false
    }])

  app.controller('threadController', function ($scope, $http, $window, $cookies, $cookieStore, vcRecaptchaService, toastr) {
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

    $scope.changeTags = function (selectedTags) {
      var dataTags = {
        user: JSON.parse($cookies.get('user')),
        thread: $scope.thread._id,
        tags: selectedTags
      }
      $http({
        method: 'POST',
        url: 'https://nyachan-server.herokuapp.com/api/changeTags',
        // url: "http://localhost:3000/changeTags",
        data: dataTags,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function mySucces (response) {
        $scope.thread = $scope.searchThread(searchId)
        toastr.success('Tags changed', 'Success')
      }, function myError (response) {
        console.log('Error ' + response.body)
      })
    }

    $scope.deleteThread = function (threadId) {
      var dataDelete = {
        user: JSON.parse($cookies.get('user')),
        thread: threadId
      }
      $http({
        method: 'DELETE',
        url: 'https://nyachan-server.herokuapp.com/api/delete/thread',
        // url: "http://localhost:3000/api/delete/thread",
        data: dataDelete,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function mySucces (response) {
        toastr.success('Thread deleted', 'Success')
        $window.location.href = 'https://nyachan-server.herokuapp.com/'
      }, function myError (response) {
        console.log('Error ' + response.body)
      })
    }

    $scope.deletePost = function (threadId, postId) {
      var dataDelete = {
        user: JSON.parse($cookies.get('user')),
        post: postId,
        thread: threadId
      }
      $http({
        method: 'DELETE',
        url: 'https://nyachan-server.herokuapp.com/api/delete/post',
        // url: "http://localhost:3000/api/delete/post",
        data: dataDelete,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function mySucces (response) {
        $scope.thread = $scope.searchThread(searchId)
        toastr.success('Post deleted', 'Success')
      }, function myError (response) {
        console.log('Error ' + response.body)
      })
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
              // url: "http://localhost:3000/api/thread/" + threadID
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
        var files = $('#file')[0].files

        if (post === undefined) {
          post = {}
          post.body = ' '
        }

        if (!validarPost(post, files)) {
          return
        }
        console.log(files)
        if (files !== undefined && files.length > 0) {
          if (!validFile(files[0].name)) {
            alert('Arquivo Invalido')
            return
          }
        }
        var uploadedFiles = [];
        if (files !== undefined && files.length > 0) {
          var sendFilesToDropbox = function (i, files, uploadedFiles) {
            var formData = new FormData()
            formData.append('fileData', files[i])
            var xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                var uploadedFile = JSON.parse(xhr.response)
                uploadedFiles[i] = uploadedFile
                if (i >= files.length - 1) {
                  sendPost(files, uploadedFiles)
                } else {
                  sendFilesToDropbox(i + 1, files, uploadedFiles)
                }
              }
            }
            xhr.upload.addEventListener('progress', function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total
                percentComplete = (percentComplete / files.length) * (i + 1)
                $('#loader').width(Math.round(percentComplete * 100) + '%')
              }
            }, false)
            xhr.open('post', '/dbxPost/0/' + $scope.thread._id, true)
            xhr.send(formData)
            console.log('UPLOAD ' + i)
          }
          sendFilesToDropbox(0, files, uploadedFiles)
        } else {
          sendPost(undefined, undefined)
        }

        function sendPost (files, uploadedFiles) {
          if (files !== undefined && files.length > 0) {
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
    $scope.logoutUser = function () {
      $http({
        method: 'GET',
        url: 'https://nyachan-server.herokuapp.com/logout',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function mySucces (response) {
        $scope.isUserLogged = false
        $cookies.remove('user', { path:'/' })
        toastr.success('Goodbye', 'See you soon')
      }, function myError (response) {
        console.log(response || 'Request failed')
      })
    }
  })
})()
