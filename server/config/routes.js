var auth = require('./auth');

module.exports = function(app) {
    app.get('/*', function(req, res, next){
        res.setHeader('Last-Modified', (new Date()).toUTCString());
        next();
    });

    app.get('/parts/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};