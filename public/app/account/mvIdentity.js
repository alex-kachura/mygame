angular.module('app')
    .factory('mvIdentity', ['$injector', function($injector) {
        var $window = $injector.get('$window'),
            mvUser = $injector.get('mvUser'),
            currentUser;

        if (!!$window.bootstrappedUserObject) {
            currentUser = new mvUser();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }

        return {
            currentUser: currentUser,
            isAuthenticated: function() {
                return !!this.currentUser;
            },
            isAuthorized: function(role) {
                return !!this.currentUser && (this.currentUser.roles.indexOf(role) + 1);
            }
        }
    }]);