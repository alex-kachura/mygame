var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/mygame',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://heroku_app35411096:h4tohubtv7nq6f2nn61tuq3v8v@ds059471.mongolab.com:59471/heroku_app35411096',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};