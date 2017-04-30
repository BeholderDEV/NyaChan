function validarPost(post, files){
    var myEl;
    if((post.body == " " || typeof post.body == "undefined") && typeof files == "undefined"){
      if(post.body == " " || typeof post.body == "undefined"){
        myEl = angular.element( document.querySelector( '#comment-group' ) );
        myEl.addClass('has-error');
      }
      if(typeof files == "undefined"){
        myEl = angular.element( document.querySelector( '#file-group' ) );
        myEl.addClass('has-error');
      }
      return false;
    }
    else{
      myEl = angular.element( document.querySelector( '#comment-group' ) );
      myEl.removeClass('has-error');
      myEl = angular.element( document.querySelector( '#file-group' ) );
      myEl.removeClass('has-error');
      return true;
    }
}
function validFile(filename){
  console.log("validando");
    var validFormats = ['jpg','jpeg','png', 'gif','bmp', 'webm', 'pdf' ];
    var ext = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    return validFormats.indexOf(ext) !== -1;
}
function toggleThumb(post){
  console.log("aaa");
}
function testUserLogin(){
  $http({
      method : "GET",
      url: "https://nyachan-server.herokuapp.com/testLogin",
      // url: "http://localhost:3000/testLogin",
      headers: {
            'Content-Type': 'application/json'
      }
  }).then(function mySucces(response) {
    if(response.data.login != undefined){
      $scope.userName = response.data.login;
      $scope.userImage = response.data.avatar;
      $scope.isUserLogged = true;
    }
  }, function myError(response) {
      console.log(response || "Request failed");
  });
}
