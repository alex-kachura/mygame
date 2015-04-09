angular.module('app')
    .factory('mvAuth', ['$injector', function($injector) {
        var $http = $injector.get('$http'),
            $q = $injector.get('$q'),
            mvUser = $injector.get('mvUser'),
            mvIdentity = $injector.get('mvIdentity');

        return {
            authenticateUser: function(username, password) {
                var dfd = $q.defer();

                $http.post('/login', {username: username, password: password}).then(function(response) {
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });

                return dfd.promise;
            },

            createUser: function(newUserData) {
                var dfd = $q.defer(),
                    newUser = new mvUser(newUserData);

                newUser.$save().then(function() {
                    mvIdentity.currentUser = newUser;
                    dfd.resolve();
                }, function(response) {
                    dfd.reject(response.data.reason);
                });

                return dfd.promise;
            },

            updateCurrentUser: function(newUserData) {
                var dfd = $q.defer(),
                    clone = angular.copy(mvIdentity.currentUser);

                angular.extend(clone, newUserData);

                clone.$update().then(function() {
                    mvIdentity.currentUser = clone;
                    dfd.resolve();
                }, function(response) {
                    dfd.reject(response.data.reason);
                });

                return dfd.promise;
            },

            logoutUser: function() {
                var dfd = $q.defer();

                $http.post('/logout', {logout: true}).then(function() {
                    mvIdentity.currentUser = undefined;
                    dfd.resolve();
                });

                return dfd.promise;
            },

            authorizeCurrentUserForRoute: function(role) {
                if (mvIdentity.isAuthorized(role)) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            },

            authorizeAuthenticatedUserForRoute: function() {
                if (mvIdentity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            }
        }
    }]);