angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/parts/main/home', controller: 'mvHomeCtrl'})
        .when('/game', {templateUrl: '/parts/main/game', controller: 'mvGameCtrl'})
        .when('/about', {templateUrl: '/parts/main/about'})
        .otherwise('/')
});