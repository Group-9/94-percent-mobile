angular.module('quizApp.controllers', [])
.controller('questionCtrl', function($scope, $http, config) {
	for(var id = 0; id < 20; id++){
  $http.get(config.BACKEND_URL + '/question/' + id).then(function(resp) {
    $scope.questions = resp.data;
	}
  });
});
