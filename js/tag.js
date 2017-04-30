(function(){

	var app = angular.module('nya-chan', ['angular-loading-bar', 'vcRecaptcha'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
    }]);

    app.controller('tagController',function($scope, $http, $window, vcRecaptchaService){
        
        $scope.init = function(){
          var user = JSON.stringify($cookies.get('user'));
          $scope.isUserLogged = false;
          console.log("AA");
          if(user != undefined){
            $scope.userName = user.login;
            $scope.userImage = user.avatar;
            $scope.isUserLogged = true;
          }
        };

        $scope.time_zone = new Date().getTimezoneOffset();
        var url = $(location).attr('href');
        var searchTag = url.substring(url.lastIndexOf('/') + 1);
				var tagName = 'Anime';

				switch(searchTag) {
			    case 'a':
		        tagName = 'Anime & Mangá';
		        break;
					case 'c':
		        tagName = 'Quadrinhos & Desenhos Animados';
		        break;
					case 'g':
		        tagName = 'Gif & Webm';
		        break;
					case 'h':
		        tagName = 'História e Ciências Humanas';
		        break;
					case 'm':
						tagName = 'História e Ciências Humanas';
						break;
					case 't':
		        tagName = 'Tecnologia';
		        break;
					case 'tv':
		        tagName = 'Televisão & Filmes';
		        break;
					case 'v':
		        tagName = 'Vídeo Games';
		        break;
					case 'b':
		        tagName = 'Aleatório';
		        break;
					case 'p':
		        tagName = 'Politicamente Incorreto';
		        break;
			    default:
		        tagName = 'Aleatório';
				}
        $scope.tag = searchTag;
				$scope.tagName = tagName;

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
                url: "https://nyachan-server.herokuapp.com/api/tag/" + searchTag+"?sortType=lastDate&archived=false"
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
							return;
	        });

					function validatedPost(valid)
	        {
						if (valid) {

						} else {

								// In case of a failed validation you need to reload the captcha
								// because each response can be checked just once
								vcRecaptchaService.reload($scope.widgetId);
								return;
						}
	          var selectedOptions = $('#selectTags option:selected');
	          // console.log(selectedOptions[0].value);
	          if(selectedOptions.lenght === 0){
	            alert("Selecione ao menos uma Tag");
	            return; // Mensagem erro
	          }
	          var selectTags = [];
	          for(i = 0; i < selectedOptions.length; i++){
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

						if(files!=null)
						{
							if(!validFile(files.name))
							{
								alert("Arquivo Invalido");
								return;
							}
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
							xhr.upload.addEventListener("progress", function (evt)
              {
                if (evt.lengthComputable)
                {
                    var percentComplete = evt.loaded / evt.total;
                    $('#loader').width(Math.round(percentComplete * 100)+'%');
                }
              }, false);
		          xhr.open('post', '/dbxPost/1/0', true);
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
											archived: false,
		                  subject: post.title,
		                  userName: "Anon",
		                  tags: selectTags,
		                  file: [
		                    {
		                        size: uploadedFile.size,
		                        name: files.name,
		                        extension: ext,
														height: uploadedFile.height,
														width: uploadedFile.width,
		                        source: uploadedFile.mainUrl,
		                        thumb: uploadedFile.thumbUrl
		                    }
		                  ]

		              };
		          }else{
		              var dataPost = {
		                  body: post.body,
		                  date: "2016-01-02 19:33:00",
											archived: false,
		                  subject: post.title,
		                  userName: "Anon",
		                  tags: selectTags
		              };
		          }

		          $http({
		              method : "POST",
		              url: "https://nyachan-server.herokuapp.com/api/thread/newThread",
		              // url: "http://localhost:3000/thread/newThread",
		              data: dataPost,
		              headers: {
		                    'Content-Type': 'application/json'
		              }
		          }).then(function mySucces(response) {
		                $scope.threads = $scope.search();
										vcRecaptchaService.reload($scope.widgetId);
										$('#newThreadModal').modal('hide');
										$('#loader').width('0%');
		          }, function myError(response) {
		                console.log(response || "Request failed");
		          });

		        }
					}
        };
    });

})();
