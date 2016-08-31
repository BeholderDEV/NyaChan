(function(){
    var app = angular.module('nya-chan',[]);
    
    app.controller('threadController',function($scope, $http){
        
        $scope.search = function() {
            console.log("entrou na função");
            $http({method: 'JSON', url: "https://raw.githubusercontent.com/BeholderDEV/NyaChan/master/tag_anime.json"}).
                success(function(data, status) {
                $scope.threads = data.entries;
            }).
            error(function(data, status) {
                console.log(data || "Request failed");
            });
        };
        $scope.threads = $scope.search();  
    });
    
})();