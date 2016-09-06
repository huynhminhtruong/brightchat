var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serverChat = io.of('/chat');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var User = require('./user');

mongoose.connect('mongodb://localhost/brightchat');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.get('/', function(req,res){
	res.redirect('/new');
});

app.route('/new').get(function(req,res){
	res.render('./new', {
		title: 'Welcome new user'
	});
}).post(function(req,res){
	var email = req.body.email;
	var name = req.body.name;
	var password = req.body.password;
	var user = new User({email: email, name: name, password: password});

	user.save().then(function(data){
		res.redirect('/chat/' + data._id);
	}, function(error){
		res.end('Could not save this user: ' + error);
	});
});

app.route('login').get(function(req,res){

}).post(function(req,res){

});

app.get('/chat/:id', function(req,res){
	User.findById({_id:req.params.id}).exec(function(error,user){
		res.render('./index', {
			id: req.params.id,
			name: user.name
		});
	});
});

serverChat.on('connection', function(socket){
	socket.emit('start chatting', {message: 'Welcome to my world'});
	socket.on('chat messages', function(data){
		serverChat.emit('server messages', {message: data.message, user: data.user, id: socket.id});
	});
});

http.listen(8080, function(){
	console.log('Server is running on port ' + 8080);
});