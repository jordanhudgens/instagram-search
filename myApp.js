var app = angular.module("InstaSearch", []);

app.factory('instagram', ['$http', function($http){

	return {
		fetchPopular: function(callback, myQuery){
            
      var endPoint = "https://api.instagram.com/v1/tags/" + myQuery + "/media/recent?client_id=4efb143562a54f5f947ec21329a0890f&callback=JSON_CALLBACK";
      
      $http.jsonp(endPoint).success(function(response){
          callback(response.data);
      });
		}
	}

}]);

app.controller('InstaSearchController', ['$scope', 'instagram' ,
function ($scope, instagram){

	$scope.layout = 'grid';
    
    $scope.setLayout = function(layout){
       $scope.layout = layout;
    };
    
    $scope.isLayout = function(layout){
      return $scope.layout == layout;
    };

	$scope.pics = [];
  var isTextOpen = false;
  $scope.resultValue = "";

  $scope.fetchPics = function (tag) {

    $scope.isTextOpen = true;  
    
    instagram.fetchPopular(function(data){
      $scope.pics = data;
      $scope.resultValue = tag;
      $scope.searchQuery = "";
    }, tag);
  }

}]);