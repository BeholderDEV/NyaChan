(function(){
    var app = angular.module('nya-chan', []);

    app.controller('threadController',function($scope, $http){

        $scope.search = function() {
            $http({
                method : "GET",
                url: "https://nyachan-server.herokuapp.com/app/threads"
            }).then(function mySucces(response) {
                $scope.threads = response.data;
            }, function myError(response) {
                  console.log(response || "Request failed");
            });
        };
        $scope.threads = $scope.search();

    });

    app.controller('animeThreadController',function($scope, $http){
      $scope.response = null;
      $scope.widgetId = null;
      var url=$(location).attr('href');
      var searchId = url.substring(url.lastIndexOf('/') + 1);

      $scope.setResponse = function (response) {
          console.info('Response available');

          $scope.response = response;
      };

      $scope.searchThread = function(threadID) {
        console.log("https://nyachan-server.herokuapp.com/app/thread/"+threadID);
          $http({
              method : "GET",
              url: "https://nyachan-server.herokuapp.com/app/thread/"+threadID
          }).then(function mySucces(response) {
              $scope.thread = response.data[0];
          }, function myError(response) {
                console.log(response || "Request failed");
          });
      };

      $scope.thread = $scope.searchThread(searchId);

      $scope.addPost = function(post){
        var files = $("#file")[0].files[0];

        if(typeof post == "undefined"){
          post = new Object();
          post.body = " ";
        }

        if((post.body == " " || typeof post.body == "undefined") && typeof files == "undefined"){
          if(post.body == " " || typeof post.body == "undefined"){
            var myEl = angular.element( document.querySelector( '#comment-group' ) );
            myEl.addClass('has-error');
          }
          if(typeof files == "undefined"){
            var myEl = angular.element( document.querySelector( '#file-group' ) );
            myEl.addClass('has-error');
          }
          return;
        }
        else{
          var myEl = angular.element( document.querySelector( '#comment-group' ) );
          myEl.removeClass('has-error');
          myEl = angular.element( document.querySelector( '#file-group' ) );
          myEl.removeClass('has-error');
        }



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
          //window.location.reload(true);
        }

      }
    });


})();
