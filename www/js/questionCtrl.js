angular.module('quizApp.controllers')
.controller('questionCtrl', function($scope, $stateParams) {
  $scope.questions = $stateParams.questions;
});
