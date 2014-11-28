'use strict';

var videoUI = {
	playPause : function(){
		this.btnPlayVideo = document.getElementById("btnPlayVideo");
		if(this.video.paused){
			this.btnPlayVideo.classList.add("icon-play");
			this.btnPlayVideo.classList.remove("icon-pause");
		}
		else{
			this.btnPlayVideo.classList.add("icon-pause");
			this.btnPlayVideo.classList.remove("icon-play");
		}
	},
	
	replyHome : function(){
		document.getElementById("home").style.top = "-100%";
	},
	
	homeIsReply : function(){
		if(home.style.top == 0)
			return false;
		else
			return true;
	},
	
	// Dessine la video
	draw : function(dataVideo, callback){
		var container = document.getElementById("video");
		var description = document.getElementById("description");
		var p = document.createElement("p");
		this.video = document.getElementById("myVideo");
		
		var pos = dataVideo[1].lastIndexOf('.');
		var titre = dataVideo[1].substr(0, pos);
		
		var source1 = dataVideo[1];
		var source2 = titre + ".webm";
		
		//Source Video/MP4 -> Google Chrome, Safari, IE
		var src = document.createElement("source");
		src.setAttribute("type", "video/mp4");
		src.setAttribute("src", source1);
		this.video.appendChild(src);
		
		// Source Video/webm -> Firefox et Opera
		var src = document.createElement("source");
		src.setAttribute("type", "video/webm");
		src.setAttribute("src", source2);
		this.video.appendChild(src);
		
		container.appendChild(this.video);
		callback.call(this);
	},
	
	drawTimes : function(currentTime, duration){
		document.getElementById("duration").innerHTML = currentTime + " / " + duration;
	},
	
	showHideQrCode : function(){
		var qr = document.getElementById("remote");
		if(qr.classList.contains("hide")){
			qr.classList.add("visible");
			qr.classList.remove("hide");
		}else{
			qr.classList.remove("visible");
			qr.classList.add("hide");
		}
	},
	
	showHideTwitterBox : function(){
		var box = document.getElementById("partage");
		if(box.classList.contains("hide")){
			box.classList.add("visible");
			box.classList.remove("hide");
		}else{
			box.classList.remove("visible");
			box.classList.add("hide");
		}
	},
	
	drawProgress : function(progress){
		document.getElementById('progress').style.width = progress + '%';
	},
	
	// Mise en place d'un timer pour l'attente entre le clic sur Record et le vrai record
	drawTimer : function(time, callback){
		var timer = document.getElementById("timer");
		timer.style.display = "block";
		
		var span = timer.getElementsByClassName("time")[0];
		var interval = setInterval(function(){
			span.innerHTML = "Enregistrement dans "+ time + "s ...";
			time --;
			if(time < 0){
				clearInterval(interval);
				span.innerHTML = "";
				timer.style.display = "none";
				callback.call(this);
			}
		}, 1000);
	},
	
	drawBuffer : function(bufferOffset, bufferWidth){
		document.getElementById('buffer').style.width = bufferWidth + '%';
	    document.getElementById('buffer').style.left = bufferOffset + '%';	
	},
	
	mute : function(){
		var vol = document.getElementById("volume");
		vol.classList.remove("icon-volume-medium");
		vol.classList.add("icon-volume-mute");
	}
}