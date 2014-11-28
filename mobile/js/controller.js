"use strict";

var remote={
	
	init : function(){
		model.getToken(function(token){
			model.joinRoom(token);
			model.connected();
		});
		
		var btn_play = document.querySelector('.play');
		var btn_stop = document.querySelector('.stop');
		var btn_rec = document.querySelector('.rec');
		var btn_mut  = document.querySelector('.mute');
		var btn_fullscren = document.querySelector('.fullscreen');
		var btns_bruitages = document.getElementsByClassName('bruitage');
		
		btn_play.addEventListener('click',remote.sendEvent,false);
		btn_stop.addEventListener('click',remote.sendEvent,false);
		btn_rec.addEventListener('click',remote.sendEvent,false);
		btn_mut.addEventListener('click',remote.sendEvent,false);
        
        for(var i=0; i < btns_bruitages.length ; i++){
            btns_bruitages[i].addEventListener('click', remote.sendSoundEffect, false);
        }
		
	},
	
	sendEvent : function(e){
		var event = this.getAttribute("data-event");
		model.sendEvent(event,function(event){
			console.log(event + " a été envoyé !");
		});
	},
    
    sendSoundEffect : function(e){
		var event = this.getAttribute("data-event");
		model.sendSoundEffect(event,function(event){
			console.log(event + " a été envoyé !");
		});
	}
    
    

}
remote.init();