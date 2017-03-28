(function(){
    var app = angular.module('nya-chan', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }])
    function validarPost(post, files){
        if((post.body == " " || typeof post.body == "undefined") && typeof files == "undefined"){
          if(post.body == " " || typeof post.body == "undefined"){
            var myEl = angular.element( document.querySelector( '#comment-group' ) );
            myEl.addClass('has-error');
          }
          if(typeof files == "undefined"){
            var myEl = angular.element( document.querySelector( '#file-group' ) );
            myEl.addClass('has-error');
          }
          return false;
        }
        else{
          var myEl = angular.element( document.querySelector( '#comment-group' ) );
          myEl.removeClass('has-error');
          myEl = angular.element( document.querySelector( '#file-group' ) );
          myEl.removeClass('has-error');
          return true;
        }
    }


//INDEX

    app.controller('indexController',function($scope, $http){
        $scope.time_zone = new Date().getTimezoneOffset();
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

//TAG

    app.controller('tagController',function($scope, $http){
        $scope.time_zone = new Date().getTimezoneOffset();
        var url = $(location).attr('href');
        var searchTag = url.substring(url.lastIndexOf('/') + 1);
        $scope.search = function() {
            $http({
                method : "GET",
                url: "https://nyachan-server.herokuapp.com/app/tag/" + searchTag
                // url: "http://localhost:3000/app/tag/" + searchTag
            }).then(function mySucces(response) {
                $scope.threads = response.data;
            }, function myError(response) {
                  console.log(response || "Request failed");
            });
        };
        $scope.threads = $scope.search();

        $scope.createThread = function(post) {
          var selectedOptions = $('#selectTags option:selected');
          // console.log(selectedOptions[0].value);
          if(selectedOptions == 0){
            return; // Mensagem erro
          }
          var selectTags = [];
          for(i = 0; i < selectedOptions.length; i++){
            console.log(i);
            selectTags.push(selectedOptions[i].value);
          }

//TODO: Reaproveitar o código do addPost de maneira melhor

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

          }
          xhr.open('post', '/dbxPost', true);
          xhr.send(formData);
        }else{
          sendThread(null, null);
        }

        function sendThread(file, uploadedFile){
          if(typeof files !== "undefined"){
              var ext = files.name.substring(files.name.lastIndexOf('.') + 1).toLowerCase();
              var dataPost = {
                  id: "123123123",
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
                  id: "123123123",
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


// THREAD

    app.controller('threadController',function($scope, $http){
      $scope.time_zone = new Date().getTimezoneOffset();
      $scope.response = null;
      $scope.widgetId = null;
      var url = $(location).attr('href');
      var searchId = url.substring(url.lastIndexOf('/') + 1);

      $scope.setResponse = function (response) {
          console.info('Response available');

          $scope.response = response;
      };

      $scope.searchThread = function(threadID) {
          $http({
              method : "GET",
              url: "https://nyachan-server.herokuapp.com/app/thread/" + threadID
              // url: "http://localhost:3000/app/thread/" + threadID
          }).then(function mySucces(response) {
              $scope.thread = response.data[0];
          }, function myError(response) {
              console.log("aqui")
              $location.path('/newValue')
          });
      };

      $scope.thread = $scope.searchThread(searchId);

      $scope.addPost = function(post){
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
                sendPost(files, uploadedFile);
              }

          }
          xhr.open('post', '/dbxPost', true);
          xhr.send(formData);
        }else{
            sendPost(null, null);
        }



          function sendPost(file, uploadedFile){
              if(file!=null)
              {
                if(!validFile(files.name))
                {
                  alert("Arquivo Invalido");
                  return;
                }
              }
          if(typeof files !== "undefined"){
              var ext = files.name.substring(files.name.lastIndexOf('.') + 1).toLowerCase();
              var dataPost = {
                  id: "123123123",
                  threadid: $scope.thread._id,
                  body: post.body,
                  date: "2016-01-02 19:33:00",
                  title: post.title,
                  userName: "Anon",
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
                  id: "123123123",
                  threadid: $scope.thread._id,
                  body: post.body,
                  date: "2016-01-02 19:33:00",
                  title: post.title,
                  userName: "Anon",
              };
          }


          $http({
              method : "POST",
              url: "https://nyachan-server.herokuapp.com/app/thread/newPost",
              data: dataPost,
              headers: {
                    'Content-Type': 'application/json'
              }
          }).then(function mySucces(response) {
              $scope.thread = $scope.searchThread(searchId);

          }, function myError(response) {
              console.log(response || "Request failed");
          });

        }

        function validFile(filename){
            var validFormats = ['jpg','jpeg','png', 'gif','bmp', 'webm', 'pdf' ];
            var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
            return validFormats.indexOf(ext) !== -1;
        }

      }
    });


})();
