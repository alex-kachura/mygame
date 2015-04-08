angular.module('app')
    .controller('mvLoginCtrl', ['$scope', '$http', 'mvIdentity', 'mvNotifier', 'mvAuth',
        function($scope, $http, mvIdentity, mvNotifier, mvAuth) {
            $scope.identity = mvIdentity;
            $scope.signin = function(username, password) {
                console.log(username, password);
                mvAuth.authenticateUser(username, password).then(function(success) {
                    console.log(success);
                    if (success) {
                        mvNotifier.notify('You have successfully logged in');
                    } else {
                        mvNotifier.notify('Perhaps there is some mistake in your username/password combination');
                    }
                });
            }
        }]);