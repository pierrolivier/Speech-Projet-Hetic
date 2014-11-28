'use strict';

var videoModel = {
	init : function(){
		this.video = document.getElementById("myVideo");
		this.name;
		this.pB = document.getElementById("progressBar");
	},
	
	// Obtenir une video de la BDD au hasard
	getRandom : function(callback){
		var dataVideo;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
					dataVideo = JSON.parse(xhr.responseText);
					videoModel.name = dataVideo[3];
				}
			}
		};
		
		xhr.open(
			'GET', 
			"http://projetpumir.cinemalebeaulieu.com/modeles/services/getVideoRandom.php",
			false
		);
		xhr.send(null);
		callback.call(this, dataVideo);
	},
	
	// Obtenir une video avec un id précis
	getVideo : function(param, callback){
		var dataVideo;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
					dataVideo = JSON.parse(xhr.responseText);
					videoModel.name = dataVideo[3];
				}
			}
		};
		
		xhr.open(
			'GET', 
			"http://projetpumir.cinemalebeaulieu.com/modeles/services/getVideo.php?id_video=" + param,
			false
		);
		xhr.send(null);
		callback.call(this, dataVideo);
	},
	
	getName : function(){
		return this.name;
	},
	
	playPause : function(currentTime, callback){
		if(this.video.paused){
			this.video.currentTime = currentTime;
			this.video.play();
		}else{
			this.video.pause();
		}
		callback.call(this);
	},
    
    playPausePlay : function(){
        if(this.video.paused){
			this.video.play();
		}else{
			this.video.pause();
		}
    },
	
	stopVideo : function(callback){
		this.video.pause();
		callback.call(this);	
	},
	
	mute : function(callback){
		this.video.muted = true;
		callback.call(this);
	},
    
    getPauseStatus : function(){
        return this.video.paused;
    },
    
    getMuteStatus : function(){
        return this.video.muted;
    },
	
	getCurrentTime : function(){
		return this.video.currentTime;	
	},
	
	getTimes : function(callback){
		var timeDefile = videoModel.convertTime(Math.round(this.video.currentTime));
		var timeEnd = videoModel.convertTime(Math.round(this.video.duration));
		callback.call(this, timeDefile, timeEnd);
	},
	
	getProgress : function(callback){
		var progress = this.video.currentTime * 100 / this.video.duration;
		callback.call(this, progress);
	},
    
    getProgressTime : function(){
		return this.video.currentTime * 100 / this.video.duration;
	},
	
	setTime : function(e){
		this.video.currentTime = (e.offsetX == undefined ? e.layerX : e.offsetX) * this.video.duration / this.pB.offsetWidth;
	},
    
    setVideoStop : function(){
		this.video.currentTime = 0;
        this.video.pause();
	},
	
	bufferProgress : function(callback){
		var buffer = this.video.buffered;
	    if(buffer.length > 0){
	        var bufferLength = buffer.length;
	        for(var i = 0; i < bufferLength; i++){
	            var maxBuffer = buffer.end(i);
	            var minBuffer = buffer.start(i);
	           
	            var bufferOffset = (minBuffer / this.video.duration) * 100;         
	            var bufferWidth = ((maxBuffer - minBuffer) / this.video.duration) * 100;
	            
	            callback.call(this, bufferOffset, bufferWidth);     
	        }
	    }
	},
	
	// Convertir la duration brute en 00:00
	convertTime : function(time){
		var minutes = 0;
		var resultat = "00:00";
	
		resultat = "00:" + (time <= 9?"0" + time:time);
	
		while(time > 60){
			minutes ++;
			time -= 60;		
		}
	
		resultat = (minutes <= 9?"0" + minutes:minutes) + ":" + (time <= 9?"0" + time:time);
	
		return resultat;
	}
}