"use strict";

var model={

	token:'',
	
	joinRoom : function(token){
		// connection au socket
		this.socket = io.connect('http://37.187.5.222:3000');
		model.token = token;
		this.socket.emit('joinRoom',token);
	},
	
	connected : function(){
		console.log(model.token);
		this.socket.emit('remote_connected', model.token);
		
		this.socket.on('timeUpdate',function(pourcentage){
			document.querySelector('.progressBar').style.width = pourcentage + "%";
		});
        
        this.socket.on('name',function(name){
            UI.setName(name);
		});
        
        this.socket.on('playPause',function(playPause){
            UI.setPlayPause(playPause);
		});
        
        this.socket.on('muteOnOff',function(mute){
            UI.setMuteOnOff(mute);
		})
        
        this.socket.on('record',function(event){
            UI.setRecordOnOff(event);
		})
        
        this.socket.on('noRecord',function(event){
            UI.hideRecord();
		})
	},
	
	getToken : function(callback) {
        
		var val ="token";
	    var result = "Not found",
	        tmp = [];
	    location.search
	    .substr(1)
	        .split("&")
	        .forEach(function (item) {
	        tmp = item.split("=");
	        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
	    });
	    
	    callback.call(this, result);
	},
	
	sendEvent : function(event, callback){
		this.socket.emit(event,event,model.token);
		callback.call(this, event);
	},
	
    sendSoundEffect : function(event, callback){
		this.socket.emit('soundEffect',event,model.token);
		callback.call(this, event);
	}
	
	
	
}












