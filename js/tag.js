(function () {
  var app = angular.module('nya-chan', ['angular-loading-bar', 'ngCookies', 'vcRecaptcha', 'toastr'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false
    }])

  app.controller('tagController', function ($scope, $http, $window, $cookies, $cookieStore, vcRecaptchaService, toastr) {
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
    var searchTag = url.substring(url.lastIndexOf('/') + 1)
    var tagName = 'Anime'

    switch (searchTag) {
      case 'a':
        tagName = 'Anime & Manga'
        break
      case 'c':
        tagName = 'Cartoon & Comics'
        break
      case 'g':
        tagName = 'Gif & Webm'
        break
      case 'h':
        tagName = 'History & Humanities'
        break
      case 'm':
        tagName = 'Music'
        break
      case 't':
        tagName = 'Tecnology'
        break
      case 'tv':
        tagName = 'Movies & Television'
        break
      case 'v':
        tagName = 'Video Games'
        break
      case 'b':
        tagName = 'Random'
        break
      case 'p':
        tagName = 'Politically Incorrect'
        break
      default:
        tagName = 'Random'
    }
    $scope.tag = searchTag
    $scope.tagName = tagName

    $scope.response = null
    $scope.widgetId = null

    $scope.setResponse = function (response) {
      console.info('Response available')
      $scope.response = response
    }

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

    $scope.search = function () {
      $http({
        method: 'GET',
        url: 'https://nyachan-server.herokuapp.com/api/tag/' + searchTag + '?sortType=lastDate&archived=false'
                // url: "http://localhost:3000/app/tag/" + searchTag
      }).then(function mySucces (response) {
        $scope.threads = response.data
      }, function myError (response) {
        $window.location.href = 'https://nyachan-server.herokuapp.com/404'
      })
    }
    $scope.threads = $scope.search()

    $scope.createThread = function (post) {
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
        var selectedOptions = $('#selectTags option:selected')
        // console.log(selectedOptions[0].value);
        if (selectedOptions.lenght === 0) {
          alert('Selecione ao menos uma Tag')
          return // Mensagem erro
        }
        var selectTags = []
        for (var i = 0; i < selectedOptions.length; i++) {
          selectTags.push(selectedOptions[i].value)
        }

        var files = $('#file')[0].files
        if (post === undefined) {
          post = {}
          post.body = ' '
        }

        if (!validarPost(post, files)) {
          return
        }

        if (files !== undefined) {
          if (!validFile(files[0].name)) {
            alert('Arquivo Invalido')
            return
          }
        }
        var uploadedFiles = [];
        if (files !== undefined) {

          var sendFilesToDropbox = function(i, files, uploadedFiles)
          {
              var formData = new FormData()
              formData.append('fileData', files[i])
              var xhr = new XMLHttpRequest()
              xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  var uploadedFile = JSON.parse(xhr.response)
                  console.log(uploadedFiles)
                  uploadedFiles[i] = uploadedFile
                  if(i>=files.length-1)
                  {
                    sendThread(files, uploadedFiles);
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
              xhr.open('post', '/dbxPost/1/0', true)
              xhr.send(formData)
              console.log("UPLOAD "+ i)
          }
          sendFilesToDropbox(0, files, uploadedFiles)

        } else {
          sendThread(null, null)
        }

        function sendThread (files, uploadedFile) {
          if (files !== undefined) {
            var dataPost = {
              body: post.body,
              date: '2016-01-02 19:33:00',
              archived: false,
              subject: post.title,
              userName: $scope.userName,
              tags: selectTags,
              file: filesToJSON(files, uploadedFiles)
            }
          } else {
            var dataPost = {
              body: post.body,
              date: '2016-01-02 19:33:00',
              archived: false,
              subject: post.title,
              userName: $scope.userName,
              tags: selectTags
            }
          }

          $http({
            method: 'POST',
            url: 'https://nyachan-server.herokuapp.com/api/thread/newThread',
            // url: "http://localhost:3000/thread/newThread",
            data: dataPost,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function mySucces (response) {
            $scope.threads = $scope.search()
            vcRecaptchaService.reload($scope.widgetId)
            $('#newThreadModal').modal('hide')
            $('#loader').width('0%')
            toastr.success('Nice Thread created', 'Success')
          }, function myError (response) {
            console.log(response || 'Request failed')
            toastr.error('Oh no, I cant belive', 'Error')
          })
        }
      }
    }
  })
})()
