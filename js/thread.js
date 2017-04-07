(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar', 'vcRecaptcha'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.controller('threadController',function($scope, $http, $window, vcRecaptchaService){
      $scope.time_zone = new Date().getTimezoneOffset();
      $scope.response = null;
      $scope.widgetId = null;
      var url = $(location).attr('href');
      var searchId = url.substring(url.lastIndexOf('/') + 1);

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

      $scope.searchThread = function(threadID) {
          $http({
              method : "GET",
              url: "https://nyachan-server.herokuapp.com/app/thread/" + threadID
              // url: "http://localhost:3000/app/thread/" + threadID
          }).then(function mySucces(response) {
              $scope.thread = response.data[0];
          }, function myError(response) {
              $window.location.href="https://nyachan-server.herokuapp.com/404";
          });
      };

      $scope.thread = $scope.searchThread(searchId);


      $scope.addPost = function(post){
				var valid;

				$http({
          url: "https://nyachan-server.herokuapp.com/recaptcha",
          method: "POST",
          data: {'response' :  $scope.response},
          headers: {
                      'Content-Type': 'application/json; charset=utf-8'
                    }
        }).then(function successCallback(response) {
            console.log(response.data.body);
          	valid=response.data.body;
            validatedPost(valid);
        }, function errorCallback(response) {
            console.log(response);
          	console.log('erro verificação');
						return;
        });

				function validatedPost(valid)
        {
		        var files = $("#file")[0].files[0];

		        if(typeof post == "undefined"){
		          post = new Object();
		          post.body = " ";
		        }

		        if(!validarPost(post, files)){
		            return;
		        }
						if (valid) {
								console.log('Success');
						} else {
								console.log('Failed validation');
								// In case of a failed validation you need to reload the captcha
								// because each response can be checked just once
								vcRecaptchaService.reload($scope.widgetId);
								//  return
						}

						if(typeof files !== "undefined"){
							var formData = new FormData();
							formData.append("fileData",files);
							var xhr = new XMLHttpRequest();
							xhr.onreadystatechange = function() {
									if (xhr.readyState == XMLHttpRequest.DONE) {
										var uploadedFile = JSON.parse(xhr.response);
										sendPost(files, uploadedFile);
									}

							};
							xhr.open('post', '/dbxPost/0', true);
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
															source: uploadedFile.mainUrl,
															thumb: uploadedFile.thumbUrl
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
										// url: "http://localhost:3000/app/thread/newPost",
										data: dataPost,
										headers: {
													'Content-Type': 'application/json'
										}
								}).then(function mySucces(response) {
										$scope.thread = $scope.searchThread(searchId);
										console.log(response);

								}, function myError(response) {
										console.log(response || "Request failed");
								});

						}
				}

        function validFile(filename){
            var validFormats = ['jpg','jpeg','png', 'gif','bmp', 'webm', 'pdf' ];
            var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
            return validFormats.indexOf(ext) !== -1;
        }

      };
    });

})();
