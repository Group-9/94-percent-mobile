// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quizApp', ['ionic', 'quizApp.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.constant('config', {
  BACKEND_URL: 'https://sheltered-everglades-86330.herokuapp.com'
})
.config(function($stateProvider, $urlRouterProvider) {
  var initState;
  if (window.localStorage.userID) {
    initState = 'level';
  } else {
    initState = '/';
  }
  $urlRouterProvider.otherwise(initState);

  $stateProvider.state('start', {
    url: '/',
    templateUrl: 'templates/start.html'
  })
  .state('info', {
    url: '/info',
    controller: 'infoCtrl',
    templateUrl: 'templates/info.html'
  })
  .state('level', {
    url: '/level',
    controller: 'LevelCtrl',
    templateUrl: 'templates/level.html'
  })
  .state('question', {
    url: '/question/',
    controller: 'questionCtrl',
    params: {questions: []},
    templateUrl: 'templates/question.html'
  })
  .state('loadQ', {
    url: '/loadQ/:id',
    controller: 'loadQCtrl',
    templateUrl: 'templates/loadQ.html'
  });
});

angular.module('quizApp.controllers', []);
