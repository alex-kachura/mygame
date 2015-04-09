angular.module('app')
    .value('mvToastr', toastr)
    .factory('mvNotifier', ['$injector', function($injector) {
        var mvToastr = $injector.get('mvToastr');

        return {
            notify: function(msg) {
                mvToastr.success(msg);
                console.log('%c' + msg, 'color:#05695e');
            },
            error: function(msg) {
                mvToastr.error(msg);
                console.log('%c' + msg, 'color:#710c25');
            }
        }
    }]);