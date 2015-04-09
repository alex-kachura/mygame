angular.module('app')

    .controller('mvUserListCtrl', ['$injector', '$scope', function($injector, $scope) {
        var mvUser = $injector.get('mvUser');

        $scope.users = mvUser.query();
    }]);