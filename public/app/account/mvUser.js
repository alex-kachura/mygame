angular.module('app')

    .factory('mvUser', ['$injector', function($injector) {
        var $resource = $injector.get('$resource'),
            UserResource = $resource('/api/users/:id', {_id: '@id'});

        UserResource.prototype.isAdmin = function() {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return UserResource;
    }]);