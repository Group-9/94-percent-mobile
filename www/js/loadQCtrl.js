var globalAns;          //used for local storage id later
var params;             //used for local storage id later
angular.module('quizApp.controllers')
  .controller('loadQCtrl', function($scope, $http, $stateParams, $ionicPopup, config) {

    params = $stateParams.id;                                                                               
  	$http.get(config.BACKEND_URL + '/question/' + $stateParams.id).then(function(resp) {
    $scope.question = resp.data;
    var answers = $scope.question.answers;

    if(window.localStorage['question' + $stateParams.id] != 1){         //if first time visiting the question
      for (var key in answers) {
          console.log($scope.question.answers[key].completed);
          $scope.question.answers[key].completed = false;             //sets boolean for correct answer to false
          window.localStorage['answer' + $stateParams.id + '.' + answers[key].id] = answers[key].completed;       //stores to local storage to save progress
      }
    } else{
      for(var key in answers){
        answers[key].completed = window.localStorage['answer' + $stateParams.id + '.' + answers[key].id];       //if already visited question, loads up previous progress
      }
    }


      $scope.data = {}
      // Custom popup
      if(window.localStorage['question' + $stateParams.id] != 1){              //if question has not been visited before pop up appears, if it has popup doesn't appear
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'How would you answer this question?',
         subTitle: $scope.question.text,
         scope: $scope,
      
         buttons: [
         {  
          text: 'Submit',
               type: 'button-royal',
                  onTap: function(e) {
            
                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });
  
      myPopup.then(function(answer) {
      /*$http.post(config.BACKEND_URL + '/createEntry', {       //submits user answer to server with following params
      question_id: $stateParams.id,
      user_id: window.localStorage['userID'],
      text: answer
    }); */  
      window.localStorage['question' + $stateParams.id] = 1;        //sets it so popup can't appear again as question is visited
      });    
    }
        globalAns = answers;          //used for local storage id

	});
  //localStorage.clear();
});


  function runScript(e) {
    if (e.keyCode == 13 && document.getElementById('answer').value != '') {       //if enter is pressed and null is not entered
        var guess = document.getElementById('answer');
        var ans= guess.value;         //gets value of the guess
        for(var key in globalAns){
          if(ans == globalAns[key].text){         //if guess matches with one of the answers
            globalAns[key].completed = true;    
            window.localStorage['answer' + params + '.' + globalAns[key].id] = true;        //set value to true so that we know user got answer correct
            location.reload();        //reload page to update answers
          }
        }
        document.getElementById('answer').value = "";       //resets input field to null
        return false;
    }
    return true;
}
  
