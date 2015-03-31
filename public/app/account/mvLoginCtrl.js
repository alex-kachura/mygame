angular.module('app').controller('mvLoginCtrl', ['$scope', function($scope) {
    $scope.signin = function(username, password) {
        console.log('sign in');
    }
}]);