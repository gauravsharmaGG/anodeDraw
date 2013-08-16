var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static');

var fileServer = new static.Server('./');

app.listen(8088);

function handler(request, response){
	request.addListener('end', function(){
		fileServer.serve(request, response);
		});
	}

	io.sockets.on('connection', function(socket){
		socket.on('mouseleave', function(data){
			socket.broadcast.emit('moving', data);
			});
		});
