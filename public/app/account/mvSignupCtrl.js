angular.module('app')
    .controller('mvSignupCtrl', ['$injector', '$scope', function($injector, $scope) {
        var $http = $injector.get('$http'),
            mvNotifier = $injector.get('mvNotifier'),
            mvAuth = $injector.get('mvAuth'),
            $location = $injector.get('$location');

        $scope.signup = function() {
            var newUserData = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                username: $scope.email,
                password: $scope.password
            };

            mvAuth.createUser(newUserData).then(function() {
                mvNotifier.notify('Account created!');
                $location.path('/');
            }, function(reason) {
                mvNotifier.error(reason);
            })
        };
    }]);