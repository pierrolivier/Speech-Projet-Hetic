var server={
    
    io : '',
	
	init : function(){
		// create socket
		io = require('socket.io').listen(3000);
				
		// écoute un event connection lorsqu'un script ouvre un socket
		io.on('connection',this.listen);
	},
	
	listen : function(socket){ 
		// écoute un event getCollection
		socket.on('joinRoom',function(token){
			socket.join(token);
		});
		
		socket.on('remote_connected',function(token){
			socket.to(token).emit('remote_connected');
		});
		
		socket.on('timeUpdate',function(token, pourcentage){
			socket.to(token).emit('timeUpdate', pourcentage);
		})
        
        socket.on('name',function(token, name){
			socket.to(token).emit('name', name);
		})
		
		socket.on('play',function(event,token){
			socket.to(token).emit('play', event);
		})
        
        socket.on('playPause',function(event,token){
            socket.to(token).emit('playPause', event);
		})
        
        socket.on('rec',function(event,token){
			socket.to(token).emit('rec', event);
		})
		
		socket.on('stop',function(event,token){
			socket.to(token).emit('stop', event);
		})
		
		socket.on('mute',function(event,token){
			socket.to(token).emit('mute', event);
		})
        
        socket.on('muteOnOff',function(event,token){
            socket.to(token).emit('muteOnOff', event);
		})
        
        socket.on('record',function(event,token){
            socket.to(token).emit('record', event);
		})
        
        socket.on('noRecord',function(event,token){
            console.log("norecord");
            socket.to(token).emit('noRecord', event);
		})
		
		socket.on('fullscreen',function(event,token){
			socket.to(token).emit('fullscreen', event);
		})
        
        socket.on('soundEffect',function(event,token){
			socket.to(token).emit('soundEffect', event);
		})

			
	}
	
};
server.init();












