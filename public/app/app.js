angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')
    .config(function($injector) {
        var $routeProvider = $injector.get('$routeProvider'),
            $locationProvider = $injector.get('$locationProvider'),
            mvIdentity = $injector.get('mvIdentity'),
            mvAuth = $injector.get('mvAuth'),
            $q = $injector.get('$q'),
            routeRoleChecks = {
                admin: {auth: function (mvIdentity, $q) {
                    return mvAuth.authorizeCurrentUserForRoute('admin');
                }}
            };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/parts/main/home', controller: 'mvHomeCtrl'})
            .when('/game', {templateUrl: '/parts/main/game', controller: 'mvGameCtrl'})
            .when('/about', {templateUrl: '/parts/main/about'})
            .when('/admin/users', {templateUrl: '/parts/admin/users', controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
            .otherwise('/')
    });

angular.module('app')
    .run(function($injector) {
        var $rootScope = $injector.get('$rootScope'),
            $location = $injector.get('$location');

        $rootScope.identity = $injector.get('mvIdentity');

        $rootScope.$on('$routeChangeError', function(e, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });