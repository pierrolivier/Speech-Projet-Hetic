var socketModel = {
    
    token : '',
    
    videoName : '',
    
    init : function(){
           
    },
    
    //Get the from localStorage if present of make a new by hashing the date.
    getToken : function (callback){
        
        if(sessionStorage.getItem("token")){
            token = sessionStorage.getItem("token");
        }else{
            //Generate token with the date
            token = new Date().getTime();
            sessionStorage.setItem("token",token);
        }
        
        callback.call(this);
    },
 
    //Connect to the socket io server
    connect : function(callback){
    
        //Connect to the token room
		socket = io.connect('http://37.187.5.222:3000');
		socket.emit('joinRoom',token);
        videoName = videoModel.getName();
        callback.call(this, token);
	
    },
    
    //If remote is connect
    isConnected : function(callback){
        socket.on('remote_connected',function(event){
			console.log("Remote is connected");
            
            socketModel.sendName(videoName);
            
            videoModel.playPause(0,function(){
                callback.call(this);
            });
		})
    },
    
    //Wait for event from remote
    listen : function(callback){
        socket.on('play',function(event){
            videoModel.playPausePlay();
		})
        
        socket.on('rec',function(event){
            recordStop();
		})
        
        socket.on('stop',function(event){
            videoModel.setVideoStop();
		})
        
        socket.on('mute',function(event){
            audioModel.soundMute();
		})
        
        socket.on('soundEffect',function(event){
            bruitageModel.playSoundEffect(event);
		})
    },
    
    //Send to the remote the play/pause status
    sendPlayEvent : function(){
        socket.emit('playPause',(videoModel.getPauseStatus()==true?"pause":"play"),token);
    },
    
    //Send to the remote mute status
    sendVolumeEvent : function(){
        socket.emit('muteOnOff',(audioModel.getMuteStatus()==true?"muted":"sound"),token);
    },
    
    //Send to the remote the time status
    sendTimeUpdate : function(){
        socket.emit('timeUpdate', token, videoModel.getProgressTime());
    },
    
    
    //Send to the remote the video name
    sendName : function(name){
        socket.emit('name',token, name);
    },
    
    //Send to the remote the record status
    sendRecord : function(event){
        console.log("Record "+ event);
        socket.emit('record',event, token);
    },
    
    //Send event to the remote if cannot use record
    sendNoRecord : function(){
        console.log("No record ");
        socket.emit('noRecord', token);
    }
    
}