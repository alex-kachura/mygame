var express = require('express'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

if (env === 'development') {
    mongoose.connect('mongodb://localhost/mygame');
} else {
    mongoose.connect('mongodb://heroku_app35411096:h4tohubtv7nq6f2nn61tuq3v8v@ds059471.mongolab.com:59471/heroku_app35411096');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('mygame db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});

app.get('/*', function(req, res, next){
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.get('/parts/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});


var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening to port ' + port + '...');