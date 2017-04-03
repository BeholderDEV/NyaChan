(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);
    
    app.controller('tagController',function($scope, $http, $window){
        $scope.time_zone = new Date().getTimezoneOffset();
        var url = $(location).attr('href');
        var searchTag = url.substring(url.lastIndexOf('/') + 1);
        $scope.tag = searchTag;
        $scope.search = function() {
            $http({
                method : "GET",
                url: "https://nyachan-server.herokuapp.com/app/tag/" + searchTag
                // url: "http://localhost:3000/app/tag/" + searchTag
            }).then(function mySucces(response) {
                $scope.threads = response.data;
            }, function myError(response) {
                  $window.location.href="https://nyachan-server.herokuapp.com/404";
            });
        };
        $scope.threads = $scope.search();

        $scope.createThread = function(post) {
          var selectedOptions = $('#selectTags option:selected');
          // console.log(selectedOptions[0].value);
          if(selectedOptions.lenght === 0){
            alert("Selecione ao menos uma Tag");
            return; // Mensagem erro
          }
          var selectTags = [];
          for(i = 0; i < selectedOptions.length; i++){
            console.log(i);
            selectTags.push(selectedOptions[i].value);
          }

          var files = $("#file")[0].files[0];
          if(typeof post == "undefined"){
            post = new Object();
            post.body = " ";
          }

          if(!validarPost(post, files)){
            return;
          }

        if(typeof files !== "undefined"){
          var formData = new FormData();
          formData.append("fileData",files);
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
              if (xhr.readyState == XMLHttpRequest.DONE) {
                var uploadedFile = xhr.response;
                sendThread(files, uploadedFile);
              }

          };
          xhr.open('post', '/dbxPost', true);
          xhr.send(formData);
        }else{
          sendThread(null, null);
        }

        function sendThread(file, uploadedFile){
          if(typeof files !== "undefined"){
              var ext = files.name.substring(files.name.lastIndexOf('.') + 1).toLowerCase();
              var dataPost = {
                  body: post.body,
                  date: "2016-01-02 19:33:00",
                  subject: post.title,
                  userName: "Anon",
                  tags: selectTags,
                  file: [
                    {
                        size: 250,
                        name: files.name,
                        extension: ext,
                        source: uploadedFile,
                    }
                  ]

              };
          }else{
              var dataPost = {
                  body: post.body,
                  date: "2016-01-02 19:33:00",
                  subject: post.title,
                  userName: "Anon",
                  tags: selectTags
              };
          }

          $http({
              method : "POST",
              url: "https://nyachan-server.herokuapp.com/thread/newThread",
              // url: "http://localhost:3000/thread/newThread",
              data: dataPost,
              headers: {
                    'Content-Type': 'application/json'
              }
          }).then(function mySucces(response) {
                console.log(response.data);
                $scope.threads = $scope.search();
          }, function myError(response) {
                console.log(response || "Request failed");
          });

        }

        };
    });

})();