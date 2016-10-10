(function(){
    var app = angular.module('nya-chan',[]);

    app.controller('threadController',function($scope, $http){

        $scope.search = function() {
            console.log("entrou na função");
            $http({
                method : "GET",
//                url : "http://127.0.0.1:3000/a/threads"
                url: "https://nyachan-server.herokuapp.com/a/threads"
            }).then(function mySucces(response) {
                $scope.threads = response.data;
                console.log($scope.threads);
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
//              url : "http://127.0.0.1:3000/a/thread/1"
              url: "https://nyachan-server.herokuapp.com/a/thread/1"
          }).then(function mySucces(response) {
              $scope.thread = response.data[0];
              console.log($scope.thread);
          }, function myError(response) {
                console.log(response || "Request failed");
          });
      };
      $scope.thread = $scope.searchThread();
        
      $scope.addPost = function(){
          var dataPost = {
                id: "123123123",
                threadid: $scope.thread._id,
                body: "Look at this shit",
                date: "2016-01-02 19:33:00",
                tile: "Help",
                userName: "Anon"
          };
          $http({
              method : "PUT",
//              url : "http://127.0.0.1:3000/a/thread/newPost",
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
      }
    
    });

    


})();
