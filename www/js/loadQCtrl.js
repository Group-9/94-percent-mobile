angular.module('quizApp.controllers', [])
.controller('loadQCtrl', function($scope, $http, config) {
  $http.get(config.BACKEND_URL + '/question/' +id).then(function(resp) {
    $scope.loadQs = resp.data.text;
  });
});