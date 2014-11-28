"use strict";

var UI={
	
    setName : function(name){
        document.querySelector(".artis").innerHTML = name;
    },
    
    setPlayPause : function(playPause){
        if(playPause == "play"){
            document.getElementById("ico_lecture").className = "fa fa-fw fa-pause";
        }else{
            document.getElementById("ico_lecture").className = "fa fa-fw fa-play";
        }
    },
    
    setMuteOnOff : function(mute){
        if(mute == "muted"){
            document.getElementById("ico_mute").className = "fa fa-fw fa-volume-up";
        }else{
            document.getElementById("ico_mute").className = "fa fa-fw fa-volume-off";
        }
    },
    
    setRecordOnOff : function(record){
        if(record == true){
            document.querySelector('.sound').style.display = "block";
        }else{
            document.querySelector('.sound').style.display = "none";
        }
    },
    
    hideRecord : function(){
        document.querySelector('.rec').style.display = "none";
    }
    
    
    
}