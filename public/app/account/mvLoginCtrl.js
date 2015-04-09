angular.module('app')

    .controller('mvLoginCtrl', ['$injector', '$scope', function($injector, $scope) {
        var $http = $injector.get('$http'),
            mvNotifier = $injector.get('mvNotifier'),
            mvAuth = $injector.get('mvAuth'),
            $location = $injector.get('$location');

        $scope.signin = function(username, password) {
            mvAuth.authenticateUser(username, password).then(function(success) {
                if (success) {
                    mvNotifier.notify('You have successfully logged in');
                } else {
                    mvNotifier.notify('Incorrect username/password combination');
                }
            });
        };

        $scope.signout = function() {
            mvAuth.logoutUser().then(function() {
                $scope.username = "";
                $scope.password = "";
                mvNotifier.notify('You have successfully signed out');
                $location.path('/');
            })
        }
    }]);