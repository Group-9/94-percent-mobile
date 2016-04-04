angular.module('quizApp.controllers')
.controller('infoCtrl', function($scope, $http, $location, config) {
  $scope.gender = "0";
  $scope.education = "0";
  $scope.employment_status = "0";

 	$scope.submit = function(age, gender, education, employment_status) {
		$http.post(config.BACKEND_URL + '/createUser', {
			age: age,
			gender: gender,
			education: education,
			employment_status: employment_status
    }).then(function(resp){				//receives user id from server
      $scope.userID = resp.data.id;
			window.localStorage['userID'] = resp.data.id;				//stores user id in local storage
		}, function(resp) {

    });
		$location.path('level');
  };
});
