var io = require('socket.io')();

exports.initialIoFunction = function(server){
	io.listen(server);

	var list = [];

	io.on('connection', function (socket) {

		socket.on('client name', function (nickname) {
		    console.log(nickname);
		    socket.nickname = nickname; 
			socket.emit('name change result', 1);
			list.push({name: nickname, _id: socket.id});
		});

		socket.on('client message', function (data) {
			console.log(socket.nickname);
		    console.log(data); 
		    socket.emit('message sending result', {content: data.message,create_time: data.create_time});
		    socket.broadcast.emit('received message', {content: data.message,create_time: data.create_time});     
		});

		socket.on('special', function (data) { 
			console.log(list[0]._id);
			console.log(data.message);
		    socket.broadcast.to(list[0]._id).emit('special message', data.message);  
		});

	});

};