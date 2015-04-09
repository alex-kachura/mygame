window.app = angular.module('app', ['ngResource', 'ngRoute'])
    .config(['$injector', function($injector) {
        var $routeProvider = $injector.get('$routeProvider'),
            $locationProvider = $injector.get('$locationProvider'),
            routeRoleChecks = {
                admin: {auth: function (mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }},
                user: {auth: function (mvAuth) {
                    return mvAuth.authorizeAuthenticatedUserForRoute();
                }}
            };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/parts/main/main', controller: 'mvMainCtrl'})
            .when('/game', {templateUrl: '/parts/game/game', controller: 'mvGameCtrl'})
            .when('/signup', {templateUrl: '/parts/account/signup', controller: 'mvSignupCtrl'})
            .when('/profile', {templateUrl: '/parts/account/profile', controller: 'mvProfileCtrl', resolve: routeRoleChecks.user})
            .when('/admin/users', {templateUrl: '/parts/admin/users', controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
            .otherwise('/');
    }])
    .run(['$injector', function($injector) {
        var $rootScope = $injector.get('$rootScope'),
            $location = $injector.get('$location');

        $rootScope.identity = $injector.get('mvIdentity');

        $rootScope.$on('$routeChangeError', function(e, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });
    }]);