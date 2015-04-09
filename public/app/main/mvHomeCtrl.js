angular.module('app')

    .controller('mvHomeCtrl', ['$injector', '$scope', function($injector, $scope) {
        //var mvUser = $injector.get('mvUser');

        $scope.myVar = "Main content";
    }]);