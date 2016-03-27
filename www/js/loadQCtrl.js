angular.module('quizApp.controllers')
  .controller('loadQCtrl', function($scope, $http, $stateParams, $ionicPopup, config) {
  	$ionicPopup.prompt({
    title: 'How would you answer this question.',
     inputType: 'answer',
    /* buttons: [
      { text: 'Submit',
      type: 'button-royal' }
  ]*/
}).then(function(answer) {
	$http.post(config.BACKEND_URL + '/createEntry', {
			question_id: $stateParams.id,
			user_id: 2,
			text: answer
		});
	console.log(answer);
});
	
  $http.get(config.BACKEND_URL + '/question/' + $stateParams.id).then(function(resp) {
    $scope.question = resp.data; 
  });
});
  
