var app = angular.module("InstaSearch", []);

// Creamos y registramos el nuevo servicio de instagram
app.factory('instagram', ['$http', function($http){

	return {
		fetchPopular: function(callback, myQuery){
            
      var endPoint = "https://api.instagram.com/v1/tags/" + myQuery + "/media/recent?client_id=4efb143562a54f5f947ec21329a0890f&callback=JSON_CALLBACK";

      // Try using this:
      // http://angular-ui.github.io/bootstrap/#/typeahead
      
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

  $scope.fetchPics = function (tag) {
        instagram.fetchPopular(function(data){
      $scope.pics = data;
      $scope.fetchPics(newValue);
    }, tag);
  }

  // $scope.$watch('searchQuery', function(newValue, oldValue) {
  //   $scope.fetchPics(newValue);
  // });


}]);