'use strict';

var audioUI = {
	init : function(){
		this.nbTrack = 1;
		this.container = document.getElementById('listAudioTracks');
		//document.getElementById('entete').style.width = window.innerWidth - this.container.offsetWidth + "px";
		
		this.listAudio = document.getElementById("listeAudio");
		this.listAudio.style.height = window.innerHeight - 40 + "px";
		
		this.btn = document.querySelector("#entete>span:first-child");
		
		this.audio = document.getElementById("playerAudio");
		this.audio.volume = 0.5;
		
		document.getElementById("progressEtDuration").style.width = (window.innerWidth - 300) + "px";
		document.getElementById("progressEtDuration").style.marginLeft = "300px";
	},
	
	playPause : function(btnAudio){
		if(btnAudio.classList.contains("icon-pause")){
			btnAudio.classList.add("icon-play2");
			btnAudio.classList.remove("icon-pause");
		}else{
			btnAudio.classList.add("icon-pause");
			btnAudio.classList.remove("icon-play2");
		}
		
		var sounds = document.getElementsByClassName("sound");
		for(var i = 0; i < sounds.length; i ++){
			sounds[i].classList.remove("played");
		}
		btnAudio.parentNode.parentNode.classList.add("played");
		this.closeOpenList();
	},
	
	// Cacher ou montrer la recordBox
	showHideRecordBox : function(){
		var box = document.getElementById("recordBox");
		if(box.classList.contains("hide")){
			box.classList.add("visible");
			box.classList.remove("hide");
		}
		else{
			box.classList.remove("visible");
			box.classList.add("hide");
		}
	},
	
	// Cacher le canvas Analyser
	hideAnalyser : function(){
		document.getElementById("analyser").style.display = "none";
	},
	
	// Montrer le canvas Analyser
	showAnalyser : function(){
		document.getElementById("analyser").style.display = "block";
	},
	
	// Permet d'ouvrir ou de fermer la liste des soundtracks
	closeOpenList : function(){
		document.getElementById("progressEtDuration").setAttribute("class", "progressAnim");
		if(this.container.classList.contains("list_audio_close")){
			document.getElementById("progressEtDuration").style.width = (window.innerWidth - 300) + "px";
			document.getElementById("progressEtDuration").style.marginLeft = "300px";
			this.container.classList.remove("list_audio_close");
			this.btn.classList.add("icon-close");
			this.btn.classList.remove("icon-menu2");
			document.getElementById('entete').style.left = "300px";
			document.getElementById('entete').style.width = window.innerWidth - this.container.offsetWidth + "px";
		}else{
			document.getElementById("progressEtDuration").style.width = "100%";
			document.getElementById("progressEtDuration").style.marginLeft = "0";
			this.container.classList.add("list_audio_close");
			document.getElementById('entete').style.left = "0";
			document.getElementById('entete').style.width = "100%";
			this.btn.classList.remove("icon-close");
			this.btn.classList.add("icon-menu2");
		}
	},
	
	// Permet de cacher le bouton record
	// Utilisé lorsque le client est sur Safari ou IE
	hideRecordBtn : function(){
		document.getElementById("record").display = "none";	
	},
	
	// Savoir si notre soundtracks est open ou close
	isListOpen : function(){
		if(this.container.classList.contains("list_audio_close"))
			return false;
		else 
			return true;	
	},
	
	// Choisir un son -> Le mettre en forme
	choose : function(elem){
		var iconPause = document.getElementsByClassName("icon-pause");
	
		for(var i = 0; i < iconPause.length; i++){
			iconPause[i].classList.add("icon-play2");
			iconPause[i].classList.remove("icon-pause");
		}
	},
	
	// Voter pour un son -> Incrémenter le nombre de likes de 1
	vote : function(elem, nbVotes){
		elem.innerHTML = "";
		if(nbVotes > 1)
			var s = "s";
		else
			var s = "";
		elem.innerHTML = nbVotes + " Like" + s;
	},
	
	// Dessine un loader si le son met du temps à charger
	drawLoader : function(elem){
		elem.parentNode.getElementsByClassName("loader")[0].style.display = "inline-block";
	},
	
	// Efface le loader lorsque le son est chargé
	eraseLoader : function(elem){
		elem.parentNode.getElementsByClassName("loader")[0].style.display = "none";
	},
	
	appendColor : function(elem){
		var sounds = document.getElementsByClassName("sound");
		for(var i = 0; i < sounds.length; i++){
			sounds[i].style.background = "none";
			sounds[i].style.color = "white";	
		}
		
		var parent = elem.parentNode.parentNode;
		parent.style.backgroundColor = "white";
		parent.style.color = "black";	
	},
	
	soundMute : function(){
		var vol = document.getElementById("volume");
		if(this.audio.muted == false){
			vol.classList.remove("icon-volume-mute");
			vol.classList.add("icon-volume-medium");		
		}else{
			vol.classList.remove("icon-volume-medium");
			vol.classList.add("icon-volume-mute");		
		}	
	},
	
	// Permet de dessiner un son
	draws : function(sounds, callback){
		var div = document.createElement("div");
		div.classList.add("sound");
		
		var div1 = document.createElement("div");
		var div2 = document.createElement("div");
		div2.setAttribute("data-url", sounds[0]);
		div2.setAttribute("data-idAudio", sounds[3]);
		
		var loader = document.createElement("img");
		loader.setAttribute("class", "loader");
		loader.src = "medias/pictures/loader.GIF";
		
		var track = document.createElement("span");
		track.setAttribute("class", "track");
		track.innerHTML = "TRACK " + this.nbTrack;
		
		var by = document.createElement("span");
		by.setAttribute("class", "by");
		by.innerHTML ="by " + sounds[1];
		
		var heart = document.createElement("span");
		if(sounds[2] > 1)
			var s = "s";
		else
			var s = "";
			
		heart.innerHTML = sounds[2] + " Like" + s;
		heart.classList.add("like");
		
		var btnPlayPause = document.createElement("span");
		btnPlayPause.classList.add("icon-play2");
		btnPlayPause.classList.add("player");
		
		div1.appendChild(track);
		div1.appendChild(by);
		div2.appendChild(loader);
		div2.appendChild(heart);
		div2.appendChild(btnPlayPause);
		div.appendChild(div1);
		div.appendChild(div2);
		
		this.listAudio.appendChild(div);
		this.nbTrack ++;
		callback.call(this, btnPlayPause, heart);
	}
}