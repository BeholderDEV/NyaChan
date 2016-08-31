(function(){
    var app = angular.module('nya-chan',[]);
    
    app.controller('threadController',function(){
        $scope.threads = [];  
        $scope.search = function() {        
            $http({method: 'JSONP', url: "https://raw.githubusercontent.com/BeholderDEV/NyaChan/master/js/app.js"}).
                success(function(data, status) {
                $scope.threads = data.entries;
            }).
            error(function(data, status) {
                console.log(data || "Request failed");
            });
        };
    });
    
})();