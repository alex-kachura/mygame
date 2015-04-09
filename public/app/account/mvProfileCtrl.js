angular.module('app')
    .controller('mvProfileCtrl', ['$injector', '$scope', function($injector, $scope) {
        var $http = $injector.get('$http'),
            mvNotifier = $injector.get('mvNotifier'),
            mvIdentity = $injector.get('mvIdentity'),
            mvAuth = $injector.get('mvAuth');

        $scope.firstName = mvIdentity.currentUser.firstName;
        $scope.lastName = mvIdentity.currentUser.lastName;
        $scope.email = mvIdentity.currentUser.username;

        $scope.update = function() {
            var newUserData = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                username: $scope.email
            };

            if ($scope.password && $scope.password.length > 0) {
                newUserData.password = $scope.password;
            }

            mvAuth.updateCurrentUser(newUserData).then(function() {
                mvNotifier.notify('Account updated!');
            }, function(reason) {
                mvNotifier.error(reason);
            })
        };
    }]);