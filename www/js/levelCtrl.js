angular.module('quizApp.controllers')
.controller('LevelCtrl', function($scope, $http, $ionicHistory, config) {
  $ionicHistory.clearHistory();
  $http.get(config.BACKEND_URL + '/level').then(function(resp) {
    $scope.levels = resp.data;
  });
});
