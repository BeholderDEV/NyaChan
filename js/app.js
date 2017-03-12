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

    app.controller('animeThreadController',function($scope, $http){
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
        var files = $("#file")[0].files[0];
        var formData = new FormData();
        formData.append("fileData",files);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
              var uploadedFile = xhr.response;
              console.log(uploadedFile);
              var dataPost = {
                  id: "123123123",
                  threadid: $scope.thread._id,
                  body: post.body, // Dando erros se for undefined
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
        xhr.open('post', '/dbxPost', true);
        xhr.send(formData);
      }

    });




})();
