angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')
    .config(function($injector) {
        var $routeProvider = $injector.get('$routeProvider'),
            $locationProvider = $injector.get('$locationProvider');

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/parts/main/home', controller: 'mvHomeCtrl'})
            .when('/game', {templateUrl: '/parts/main/game', controller: 'mvGameCtrl'})
            .when('/admin/users', {templateUrl: '/parts/admin/users', controller: 'mvUserListCtrl',
                resolve: {
                    auth: function(mvIdentity, $q) {
                        if (mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('admin') + 1) {
                            return true;
                        } else {
                            return $q.reject('not authorized');
                        }
                    }
                }})
            .when('/about', {templateUrl: '/parts/main/about'})
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