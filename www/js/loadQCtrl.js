angular.module('quizApp.controllers')
  .controller('loadQCtrl', function($scope, $http, $stateParams, config) {
  $http.get(config.BACKEND_URL + '/question/' + $stateParams.id).then(function(resp) {
    $scope.question = resp.data;
  });
});
