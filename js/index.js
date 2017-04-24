(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

	app.controller('indexController',function($scope, $http){
	    $scope.time_zone = new Date().getTimezoneOffset();
	    $scope.search = function() {
	        $http({
	            method : "GET",
	            url: "https://nyachan-server.herokuapp.com/app/threads/numberOfPosts"
	        }).then(function mySucces(response) {
	            $scope.threads = response.data;
	        }, function myError(response) {
	              console.log(response || "Request failed");
	        });
	    };
	    $scope.threads = $scope.search();


	    $scope.registerUser = function(post){
				var dataUser = {
							login: post.login,
							password: post.password,
							email: post.email
				};
				var avatar = post.file;
				if(typeof avatar !== "undefined"){
					var formData = new FormData();
					formData.append("fileData", avatar);
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
							if (xhr.readyState == XMLHttpRequest.DONE) {
								var uploadedFile = JSON.parse(xhr.response);
								dataUser.avatar = uploadedFile;
								sendUser(dataUser);
							}
					};
					xhr.upload.addEventListener("progress", function (evt)
					{
						if (evt.lengthComputable)
						{
								var percentComplete = evt.loaded / evt.total;
								$('#loader').width(Math.round(percentComplete * 100)+'%');
						}
					}, false);
						xhr.open('post', '/dbxPost/0', true);
						xhr.send(formData);
				}else{
						sendUser(dataUser);
				}

				function sendUser(dataUser){
					$http({
							method : "POST",
							url: "https://nyachan-server.herokuapp.com/registerUser",
							// url: "http://localhost:3000/registerUser",
							data: dataUser,
							headers: {
										'Content-Type': 'application/json'
							}
					}).then(function mySucces(response) {
							console.log("Success");
							console.log(response);
					}, function myError(response) {
							console.log(response || "Request failed");
					});
				}

	    	};

    	$scope.loginUser = function(post){
	    	var dataUser = {
							login: post.login,
							password: post.password
				};
				$http({
						method : "POST",
						url: "https://nyachan-server.herokuapp.com/loginUser",
						// url: "http://localhost:3000/loginUser",
						data: dataUser,
						headers: {
									'Content-Type': 'application/json'
						}
				}).then(function mySucces(response) {
						console.log("Login successful");
						console.log(response);
				}, function myError(response) {
						console.log(response || "Request failed");
				});
    	};

    	$scope.logoutUser = function(){
				$http({
						method : "GET",
						url: "https://nyachan-server.herokuapp.com/logout",
						// url: "http://localhost:3000/logout",
						headers: {
									'Content-Type': 'application/json'
						}
				}).then(function mySucces(response) {
						console.log("Logout successful");
						console.log(response);
				}, function myError(response) {
						console.log(response || "Request failed");
				});
    	};

    	$scope.testUser = function(){
				$http({
						method : "GET",
						url: "https://nyachan-server.herokuapp.com/testLogin",
						// url: "http://localhost:3000/testLogin",
						headers: {
									'Content-Type': 'application/json'
						}
				}).then(function mySucces(response) {
						console.log("Testing User");
						console.log(response);
				}, function myError(response) {
						console.log(response || "Request failed");
				});
    	};

		});

})();
