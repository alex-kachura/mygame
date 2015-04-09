angular.module('app')

    .controller('mvGameCtrl', ['$injector', '$scope', function($injector, $scope) {
        //var mvUser = $injector.get('mvUser');

        $scope.myVar = "Game content";
    }]);