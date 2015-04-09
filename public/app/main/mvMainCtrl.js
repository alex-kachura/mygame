angular.module('app')
    .controller('mvMainCtrl', ['$injector', '$scope', function($injector, $scope) {
        //var mvUser = $injector.get('mvUser');

        $scope.myVar = "Main content";
    }]);