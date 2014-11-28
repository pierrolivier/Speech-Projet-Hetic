'use strict';

var video;
var idVideo;
var timer = 3;
var pseudo = null;

// Obtenir le browser client pour adapter nos actions
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !!window.chrome && !isOpera;
var isIE = false || !!document.documentMode;
		
// Nos elems
var btnPlayVideo = document.getElementById("btnPlayVideo");
var btnRecord = document.getElementById("record");
var menu = document.getElementsByClassName('icon-menu2')[0];
var btnVolume = document.getElementById("volume");
var progressBar = document.getElementById("progressBar");
var soundCursor = document.querySelector("input[type=range]");
var playerAudio = document.querySelector('#playerAudio');
var mobile = document.getElementsByClassName("icon-mobile")[0];
var closeTwitter = document.getElementsByClassName("close_partage")[0];
var home = document.getElementById("home"); 
var btnStart = document.getElementById("btnStart");

// Nos Event
window.addEventListener("load", init, false);
btnStart.addEventListener("click", function(){videoUI.replyHome();}, false);
document.addEventListener("keydown", playPauseVideo, false);
menu.addEventListener('click', closeAudioList,false);
btnPlayVideo.addEventListener("click", playPauseVideo, false);
btnRecord.addEventListener("click", recordStop, false);
btnVolume.addEventListener("click", soundMute, false);
progressBar.addEventListener("click", setVideoTime, false);
soundCursor.addEventListener("change", setSound, false);
mobile.addEventListener("click",showQRCode , false);
playerAudio.addEventListener('volumechange', volumeEvent, false);
closeTwitter.addEventListener("click", showHideTwitterBox, false);

function init(){

	// Si le client est sur IE ou Safari on ne peut pas record
    if(isIE || isSafari)
    	audioUI.hideRecordBtn();
    	
	videoModel.init();
	audioModel.init();
	audioUI.init();
	
	// On recupere le param de notre URL
	var param = extractUrlParams();
	
	videoModel.mute(function(){
		videoUI.mute();	
	});
	
	// Si on a pas de parametre, alors on va chercher une video au hasard dans la BDD
	if(param["id_video"] == undefined){
		videoModel.getRandom(function(dataVideo){
			
			// On affiche la video et on lui colle des Events
			videoUI.draw(dataVideo, function(){
				video = document.getElementById("myVideo");
				video.addEventListener("click", playPauseVideo, false);
				video.addEventListener("canplaythrough", playProgress, false);
				video.addEventListener("timeupdate", playProgress, false);
				video.addEventListener("progress", bufferProgress, false);
				video.addEventListener("pause", pauseEvent, false);
	            video.addEventListener("play", pauseEvent, false);
			});
			idVideo = dataVideo[0];
			
			// Obtenir tous les sounds de cette video
			audioModel.gets(idVideo, function(sounds){
				for(var i = 0; i < sounds.length; i++){
					audioUI.draws(sounds[i], function(btnPlay, heart){
						btnPlay.addEventListener("click", playPauseAudio, false);
						heart.addEventListener("click", vote, false);
					});
				}
			});
		});
	}
	
	// Sinon on prend la video qui possède comme ID notre paramètre
	else{
		videoModel.getVideo(param["id_video"], function(dataVideo){
			
			//On cache la home
			home.style.display = "none";
			
			// On affiche la video et on lui colle des Events
			videoUI.draw(dataVideo, function(){
				video = document.getElementById("myVideo");
				video.addEventListener("click", playPauseVideo, false);
				video.addEventListener("canplaythrough", playProgress, false);
				video.addEventListener("timeupdate", playProgress, false);
				video.addEventListener("progress", bufferProgress, false);
				video.addEventListener("pause", pauseEvent, false);
	            video.addEventListener("play", pauseEvent, false);
			});
			idVideo = dataVideo[0];
			
			// Obtenir tous les sounds de cette video
			audioModel.gets(idVideo, function(sounds){
				for(var i = 0; i < sounds.length; i++){
					audioUI.draws(sounds[i], function(btnPlay, heart){
						btnPlay.addEventListener("click", playPauseAudio, false);
						heart.addEventListener("click", vote, false);
					});
				}
			});
		});
	}
    
    // On initialise les bruitages
    bruitageModel.init();
    
    socketModel.getToken(function(token){
        socketModel.connect(function(token){
            socketVue.showQRCode(token);
            socketModel.isConnected(function(){
                socketVue.hideQRCode();
                socketModel.listen();
                noRecord();
            });
        })
    }); 
}

function noRecord(){
    if(isSafari || isIE){
        socketModel.sendNoRecord();
    }
}

// Permet d'ouvrir/fermé la liste des audio Tracks
function closeAudioList(){

	// Si l'anim de l'élément home n'a pas été joué alors on met un delay
	if(videoUI.homeIsReply() == false){
		videoUI.replyHome();
		setTimeout(function(){
			audioUI.closeOpenList();
		},600);
	}
	
	// Sinon on ferme simplement ou ouvre simplement
	else{
		audioUI.closeOpenList();
	}
}

function pauseEvent(){
	socketModel.sendPlayEvent();
}

function volumeEvent(){
	socketModel.sendVolumeEvent();
}

function playProgress(e){
    
    socketModel.sendTimeUpdate();
		
	if(e.type == "timeupdate"){
		//Si on arrive à la fin de la video et que l'on est en record -> fin de l'enregistrement
		if(this.duration == this.currentTime && audioModel.isRecorded()){
            
            socketModel.sendRecord(false);
            
            // On stop le record
            audioModel.recordStop(btnRecord, function(){});
            
            // Si il n'a pas de pseudo on en lui demande un
            if(pseudo == null){
				var form = document.getElementById("addPseudo");
				form.style.display = "block";
				form.addEventListener("submit", function(e){
					form.style.display = "none";
					e.preventDefault();
					audioUI.showHideRecordBox();
					pseudo = document.querySelector("input[name=pseudo]").value;
					audioModel.saveRecord(pseudo, function(timestamp){
						var sound = new Array();
						sound.push("medias/audios/" + timestamp);
						sound.push(pseudo);
						sound.push(0);
						audioUI.draws(sound, function(btnPlay, heart){
							btnPlay.addEventListener("click", playPauseAudio, false);
							heart.addEventListener("click", vote, false);
						});
					});
				}, false);
			}
			
			// Sinon c'est qu'il a déjà fait un enregistrement et alors il conserve son pseudo
			else{
				audioUI.showHideRecordBox();
				audioModel.saveRecord(pseudo, function(timestamp){
					var sound = new Array();
					sound.push("medias/audios/" + timestamp);
					sound.push(pseudo);
					sound.push(0);
					audioUI.draws(sound, function(btnPlay, heart){
						btnPlay.addEventListener("click", playPauseAudio, false);
						heart.addEventListener("click", vote, false);
					});
				});
			}
		}
	}
	
	// Permet d'obtenir le currentTime et la duration de la video, et de pouvoir les ajouter dans le HTML	
	videoModel.getTimes(function(currentTime, duration){
		videoUI.drawTimes(currentTime, duration);
	});
	
	// Obtient et dessine la progression de la video
	videoModel.getProgress(function(progress){
		videoUI.drawProgress(progress);
	});
}

function bufferProgress(e){
	// On dessine le buffer en fonction de sa progression
	videoModel.bufferProgress(function(bufferOffset, bufferWidth){
		videoUI.drawBuffer(bufferOffset, bufferWidth);
	});
}

function setVideoTime(e){
	// Changer le currentTime de la video
	videoModel.setTime(e);
	audioModel.setTime(video.currentTime);
}

function playPauseAudio(e){	
	e.preventDefault();
	var self = this;
	var beginning = video.currentTime;

	if(audioModel.isChosen(self) === false){
		audioUI.drawLoader(self);
		audioUI.appendColor(self);
		
		audioModel.chooseSound(self, function(){
			audioUI.eraseLoader(self);
			videoModel.stopVideo(function(){
				videoUI.playPause();
			});
			
			audioUI.choose(self);
			
			beginning = 0;
			audioModel.playAudio(function(){
				audioUI.playPause(self);
				audioUI.soundMute();
				videoModel.playPause(beginning, function(){
					videoUI.playPause();
				});
			});
		});
	}else{
		audioModel.playPause(function(){
			audioUI.playPause(self);
			audioUI.soundMute();
			videoModel.playPause(beginning, function(){
				videoUI.playPause();
			});
		});
	}
}

// Permet de voter pour un son
function vote(){
	var self = this;
	var id_audio = this.parentNode.getAttribute("data-idAudio");
	audioModel.vote(id_audio, function(nbVotes){
		audioUI.vote(self, nbVotes);
	});
}

function recordStop(){
	var self = this;
    if(this){
        self = this;
    }else{
        self = document.getElementById('record');
    }
    
    if(videoUI.homeIsReply()){
		if(audioModel.isRecorded() == false){
			if(audioUI.isListOpen())
				audioUI.closeOpenList();
				
			audioUI.showHideRecordBox();
			videoUI.drawTimer(timer, function(){
				audioUI.showAnalyser();
				audioModel.recordStop(self, function(){
					videoModel.playPause(0, function(){
	                    socketModel.sendRecord(true);
					});
				});
			});
		}
	}
	
	// Au premier clic on repli notre home
	if(videoUI.homeIsReply() == false)
		videoUI.replyHome();
}

function playPauseVideo(e){
	if((e.type == "keydown" && e.keyCode == 32) || e.type == "click"){
		e.preventDefault();
		videoModel.playPause(video.currentTime, function(){
			videoUI.playPause();
		});
		
		audioModel.playPause(function(){
			audioUI.playPause(document.querySelector(".played .player"));
		});
	}
}

// Permet de mettre en mute ou pas
function soundMute(){
	audioModel.soundMute(function(){
		audioUI.soundMute();
	});
}

function setSound(){
	var self = this;
	audioModel.setVolume(self);
}

// Faire appraitre le QrCode
function showQRCode(){

	// Au premier clic on repli notre home
	if(videoUI.homeIsReply() == false)
		videoUI.replyHome();
	videoUI.showHideQrCode();
}

function showHideTwitterBox(){
	videoUI.showHideTwitterBox();
}

function extractUrlParams(){   
    var t = location.search.substring(1).split('&');
    var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=x[1];
    }
    return f;
}