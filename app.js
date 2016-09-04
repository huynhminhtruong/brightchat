var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var privateChat = io.of('/chat');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./user');

mongoose.connect('mongodb://localhost/brightchat');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/views/new.html');
});

app.route('/new').get(function(req,res){
	res.sendFile(__dirname + '/views/new.html');
}).post(function(req,res){
	var email = req.body.email;
	var name = req.body.name;
	var password = req.body.password;
	var user = new User({email: email, name: name, password: password});

	user.save().then(function(data){
		res.sendFile(__dirname + '/views/index.html');
	}, function(error){
		res.end('Could not save this user: ' + error);
	});
});

app.get('/chat', function(req,res){
	res.sendFile(__dirname + '/views/index.html');
});

privateChat.on('connection', function(socket){
	socket.on('chat messages', function(message){
		console.log('Socket ' + socket.id + ' message: ' + message);
		privateChat.emit('server messages', {message: message, user: socket.id});
	});
});

http.listen(8080, function(){
	console.log('Server is running on port ' + 8080);
});