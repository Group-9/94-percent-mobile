angular.module('quizApp.controllers')
.controller('loadQCtrl', function($scope, $http, $stateParams, $ionicPopup, config) {
  var answers;

  $http.get(config.BACKEND_URL + '/question/' + $stateParams.id).then(function(resp) {
    $scope.question = resp.data;
    answers = $scope.question.answers;

    // if first time visiting the question
    if (window.localStorage['question' + $stateParams.id] != 1){
      for (var i = 0; i < answers.length; i++) {
        // sets boolean for correct answer to false
        answers[i].completed = false;
        // stores to local storage to save progress
        window.localStorage['answer' + $stateParams.id + '.' + answers[i].id] = answers[i].completed;
      }
    } else {
      for (var i = 0; i < answers.length; i++) {
        // if already visited question, loads up previous progress
        answers[i].completed = JSON.parse(window.localStorage['answer' + $stateParams.id + '.' + answers[i].id]);
      }
    }

    $scope.data = {};
    // Custom popup
    // if question has not been visited before pop up appears, if it has popup doesn't appear
    if (window.localStorage['question' + $stateParams.id] != 1) {
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.surveyAnswer">',
        title: 'How would you answer this question?',
        subTitle: $scope.question.text,
        scope: $scope,

        buttons: [
          {
            text: 'Submit',
            type: 'button-royal',
            onTap: function(e) {
              if (!$scope.data.surveyAnswer) {
                // don't allow the user to close unless he enters answer...
                e.preventDefault();
              } else {
                return $scope.data.surveyAnswer;
              }
            }
          }
        ]
      });

      myPopup.then(function(answer) {
        // submits user answer to server with following params
        $http.post(config.BACKEND_URL + '/createEntry', {
         question_id: $stateParams.id,
         user_id: window.localStorage.userID,
         text: answer
        });
        window.localStorage['question' + $stateParams.id] = 1;
        // sets it so popup can't appear again as question is visited
      });
    }
  });

  $scope.checkAnswer = function(event) {
    if (event.keyCode === 13 && $scope.data.guess) {

      for (var i = 0; i < answers.length; i++) {
        if ($scope.data.guess.toLowerCase() === answers[i].text.toLowerCase()) {
          answers[i].completed = true;
          window.localStorage['answer' + $stateParams.id + '.' + answers[i].id] = true;
        }
      }
      $scope.data.guess = '';
    }
  };
});
