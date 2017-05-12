(function () {
  var app = angular.module('nya-chan', ['angular-loading-bar', 'ngCookies', 'vcRecaptcha', 'toastr','ui.bootstrap'])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false
    }])

  app.controller('tagController', function ($scope, $http, $window, $cookies, $cookieStore, vcRecaptchaService, toastr) {

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

    $scope.reportPost = function(threadIdReport, postIdReport){
      // console.log("Thread Id " + threadId + " Post " + postId)
      var dataReport = {
        reason: null,
        threadId: threadIdReport,
        postId: postIdReport
      }
      $http({
        method: 'POST',
        // url: 'https://nyachan-server.herokuapp.com/api/reportPost',
        url: "http://localhost:3000/api/reportPost",
        data: dataReport,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function mySucces (response) {
        toastr.success('Report completed', 'Success')
      }, function myError (response) {
        console.log('Error ' + response.body)
      })
    }

    $scope.deleteThread = function(threadId){
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
        $scope.threads = $scope.search()
        toastr.success('Thread deleted', 'Success')
      }, function myError (response) {
        console.log('Error ' + response.body)
      })
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
        // url: 'https://nyachan-server.herokuapp.com/api/tag/' + searchTag + '?sortType=lastDate&archived=false'
                url: "http://localhost:3000/api/tag/" + searchTag + '?sortType=lastDate&archived=false'
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

        if (files !== undefined && files.length > 0) {
          if (!validFile(files[0].name)) {
            alert('Arquivo Invalido')
            return
          }
        }
        var uploadedFiles = []
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
                  $('#loader').width('90%')
                  sendThread(files, uploadedFiles)
                } else {
                  sendFilesToDropbox(i + 1, files, uploadedFiles)
                }
              }
            }
            xhr.upload.addEventListener('progress', function (evt) {
              if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total
                percentComplete = (percentComplete / files.length) * (i + 1)
                $('#loader').width(Math.round(percentComplete * 75) + '%')
              }
            }, false)
            xhr.open('post', '/dbxPost/1/0', true)
            xhr.send(formData)
            console.log('UPLOAD ' + i)
          }
          sendFilesToDropbox(0, files, uploadedFiles)
        } else {
          sendThread(undefined, undefined)
        }

        function sendThread (files, uploadedFiles) {
          if (files !== undefined && files.length > 0) {
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
            // url: "http://localhost:3000/api/thread/newThread",
            data: dataPost,
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function mySucces (response) {
            $('#loader').width('100%')
            setTimeout(function(){
              $scope.threads = $scope.search()
              vcRecaptchaService.reload($scope.widgetId)
              $('#newThreadModal').modal('hide')
              $('#loader').width('0%')
            }, 1500)
            toastr.success('Nice Thread created', 'Success')
          }, function myError (response) {
            console.log(response || 'Request failed')
            toastr.error('Oh no, I cant belive', 'Error')
          })
        }
      }
    }

    $scope.downloadFiles = function(imgFiles)
    {
      var getSingleBinCont = function (zip, value) {
          var deferred = $.Deferred()
          var trueLink = value.source.replace("www.dropbox.com", "dl.dropboxusercontent.com")
          JSZipUtils.getBinaryContent(trueLink, function (err, data){
              if(err){
                  deferred.reject(err)
              }
              else{
                  zip.file(value.name, data, {binary:true})
                  deferred.resolve(data)
              }
          });
          return deferred
      }
      var downloadZip = function (){
        var zip = new JSZip()
        var deferreds = []

        angular.forEach(imgFiles, function (value, key){
            deferreds.push(getSingleBinCont(zip, value))
        });
        $.when.apply($, deferreds).done(function () {
            var blob = zip.generateAsync({type:"blob"}).then(function(content) {
                saveAs(content, "images.zip");
            });
        });
      }
      downloadZip()
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
