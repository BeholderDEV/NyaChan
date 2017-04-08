(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar', 'vcRecaptcha'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.controller('tagController',function($scope, $http, $window, vcRecaptchaService){
        $scope.time_zone = new Date().getTimezoneOffset();
        var url = $(location).attr('href');
        var searchTag = url.substring(url.lastIndexOf('/') + 1);
        $scope.tag = searchTag;

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

	      $scope.setResponse = function (response) {
	          console.info('Response available');

	          $scope.response = response;
	      };

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

					$http({
	          url: "https://nyachan-server.herokuapp.com/recaptcha",
	          method: "POST",
	          data: {'response' :  $scope.response},
	          headers: {
	                      'Content-Type': 'application/json; charset=utf-8'
	                    }
	        }).then(function successCallback(response) {
	            validatedPost(JSON.parse(response.data.body).success);
	        }, function errorCallback(response) {
	            console.log(response);
	          	console.log('erro verificação');
							return;
	        });

					function validatedPost(valid)
	        {

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
		                var uploadedFile = JSON.parse(xhr.response);
		                sendThread(files, uploadedFile);
		              }

		          };
		          xhr.open('post', '/dbxPost/1', true);
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
		                        source: uploadedFile.mainUrl,
		                        thumb: uploadedFile.thumbUrl
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
					}
        };
    });

})();
