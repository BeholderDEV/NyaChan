(function(){
    var app = angular.module('nya-chan',['vcRecaptcha']);

    app.controller('threadController',function($scope, $http){

        $scope.search = function() {
            $http({
                method : "GET",
                url: "https://nyachan-server.herokuapp.com/a/threads"
            }).then(function mySucces(response) {
                $scope.threads = response.data;
            }, function myError(response) {
                  console.log(response || "Request failed");
            });
        };
        $scope.threads = $scope.search();

    });

    app.controller('animeThreadController',function($scope, $http, vcRecaptchaService){
      $scope.response = null;
      $scope.widgetId = null;

      $scope.setResponse = function (response) {
          console.info('Response available');

          $scope.response = response;
      };

      $scope.model = {
          key: '6LfogRgUAAAAACNUIiCwMJPsPJ0NxiS7tafx-B55'
      };

      $scope.setWidgetId = function (widgetId) {
          console.info('Created widget ID: %s', widgetId);

          $scope.widgetId = widgetId;
      };

      $scope.cbExpiration = function() {
          console.info('Captcha expired. Resetting response object');

          vcRecaptchaService.reload($scope.widgetId);

          $scope.response = null;
       };

      $scope.searchThread = function() {
          $http({
              method : "GET",
              url: "https://nyachan-server.herokuapp.com/a/thread/1"
          }).then(function mySucces(response) {
              $scope.thread = response.data[0];
          }, function myError(response) {
                console.log(response || "Request failed");
          });
      };
      $scope.thread = $scope.searchThread();

      $scope.addPost = function(post){
//        var valid;
        // if($scope.response === undefined || $scope.response === '' || $scope.response === null) {
        //   return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
        // }
        // Put your secret key here.
//        var secretKey = "6LfogRgUAAAAADhwW9O5J7ZeBLrDxoy7M9vxHdIX";
        // req.connection.remoteAddress will provide IP address of connected user.
//        console.log('sending the captcha response to the server', $scope.response);
//        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
//        var urldata = "?secret=" + secretKey + "&response=" + $scope.response;//
//
//        // $http({
//        //   method: 'POST',
//        //   url: verificationUrl+urldata
//        // }
//        $http({
//          url: "https://nyachan-server.herokuapp.com/recaptcha",
//          method: "POST",
//          data: {'response' :  $scope.response},
//          withCredentials: true,
//          headers: {
//                      'Content-Type': 'application/json; charset=utf-8'
//                    }
//        }).then(function successCallback(response) {
//            console.log(response.success);
//          valid=response.success;
//        }, function errorCallback(response) {
//            console.log(response);
//          console.log('erro verificação');;
//        });
//        if (valid) {
//            console.log('Success');
//        } else {
//            console.log('Failed validation');
//            // In case of a failed validation you need to reload the captcha
//            // because each response can be checked just once
//            vcRecaptchaService.reload($scope.widgetId);
//            // return
//        }
//
        if(typeof post == "undefined"){
          post = new Object();
          post.body = " ";
        }

        var files = $("#file")[0].files[0];
        if(typeof files !== "undefined"){
          var formData = new FormData();
          formData.append("fileData",files);
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                var uploadedFile = xhr.response;
                sendPost(files, uploadedFile);
              }

          }
          xhr.open('post', '/dbxPost', true);
          xhr.send(formData);
        }else{
          sendPost(null, null);
        }

        function sendPost(file, uploadedFile){
          if(typeof files !== "undefined"){
              var dataPost = {
                  id: "123123123",
                  threadid: $scope.thread._id,
                  body: post.body,
                  date: "2016-01-02 19:33:00",
                  tile: post.title,
                  userName: "Anon",
                  file: [
                    {
                        size: 250,
                        name: files.name,
                        extension: "jpg",
                        source: uploadedFile,
                    }
                  ]
              };
          }else{
              var dataPost = {
                  id: "123123123",
                  threadid: $scope.thread._id,
                  body: post.body,
                  date: "2016-01-02 19:33:00",
                  tile: post.title,
                  userName: "Anon",
              };
          }

          $http({
              method : "PUT",
              url: "https://nyachan-server.herokuapp.com/a/thread/newPost",
              data: dataPost,
              headers: {
                    'Content-Type': 'application/json'
              }
          }).then(function mySucces(response) {
                console.log(response.data);
          }, function myError(response) {
                console.log(response || "Request failed");
          });
          window.location.reload(true);
        }

      }
    });


})();
