'use strict';

var audioModel = {
	init : function(){
		var self = this;
		this.timer = 3000;
		
		// Verification de l'identité du browser client
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		var isFirefox = typeof InstallTrigger !== 'undefined';
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		var isChrome = !!window.chrome && !isOpera;
		var isIE = false || !!document.documentMode;
		
		// Si on est sur Chrome ou Firefox, alors on peut faire du record, sur les autres -> erreur
		if(isChrome || isFirefox)
			this.audioContext = new AudioContext();
			
        this.audioInput = null,
		    this.realAudioInput = null,
		    this.inputPoint = null,
		    this.audioRecorder = null;
		    
		this.rafID = null;
		this.analyserContext = null;
		this.canvasWidth, this.canvasHeight;
		var recIndex = 0;
		this.audio = document.getElementById("playerAudio");
		
		
		// Vérification de compatibilité du navigateur et demande d'utilisation
		if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
           
        if(navigator.getUserMedia){
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            }
        }, this.gotStream.bind(self), function(e){
            console.log('Error getting audio');
            console.log(e);
        });}
	},
	
	// Savoir si l'audio est en train de se jouer
	isPlayed : function(){
		if(this.audio.paused)
			return false;
		else
			return true;
	},
	
	setTime : function(time){
		this.audio.currentTime = time;
	},
	
	// Obtention des flux
	gotStream : function(stream) {
	    this.inputPoint = this.audioContext.createGain();
	
	    this.realAudioInput = this.audioContext.createMediaStreamSource(stream);
	    this.audioInput = this.realAudioInput;
	    this.audioInput.connect(this.inputPoint);
	
	    this.analyserNode = this.audioContext.createAnalyser();
	    this.analyserNode.fftSize = 2048;
	    this.inputPoint.connect( this.analyserNode );
	
	    this.audioRecorder = new Recorder( this.inputPoint );
	
	    var zeroGain = this.audioContext.createGain();
	    zeroGain.gain.value = 0.0;
	    this.inputPoint.connect( zeroGain );
	    zeroGain.connect( this.audioContext.destination );
	    this.updateAnalysers();
	},
    
    getMuteStatus : function(){
        return this.audio.muted;
    },
	
	// Permet de refresh le canvas analyser
	updateAnalysers : function(){
		
		if (!this.analyserContext) {
	        var canvas = document.getElementById("analyser");
	        this.canvasWidth = canvas.width;
	        this.canvasHeight = canvas.height;
	        this.analyserContext = canvas.getContext('2d');
	    }
	
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(this.canvasWidth / SPACING);
        var freqByteData = new Uint8Array(this.analyserNode.frequencyBinCount);
        this.analyserNode.getByteFrequencyData(freqByteData); 

        this.analyserContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.analyserContext.fillStyle = '#F6D565';
        this.analyserContext.lineCap = 'round';
        var multiplier = this.analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            
            for (var j = 0; j < multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            this.analyserContext.fillStyle = "white";
            this.analyserContext.fillRect(i * SPACING, this.canvasHeight, BAR_WIDTH, -magnitude);
        }
	   
	    this.rafID = window.requestAnimationFrame( this.updateAnalysers.bind(this) );
	},
	
	playPause : function(callback){
		if(this.audio.paused)
			this.audio.play();
		else
			this.audio.pause();
		callback.call(this);
	},
	
	playAudio : function(callback){
		this.audio.play();
		callback.call(this);	
	},
	
	stopAudio : function(callback){
		this.audio.pause()
		callback.call(this);	
	},
	
	// Savoir si un audio est choisi
	isChosen : function(elem){
		var src = elem.parentNode.getAttribute("data-url");
		src = src;
		var srcAudio = this.audio.getAttribute("src");
		if(src === srcAudio)
			return true;
		else
			return false;	
	},
	
	// Choisir un audio
	chooseSound : function(elem, callback){
		var src = elem.parentNode.getAttribute("data-url");
		if(this.audio.paused == false)
			this.audio.pause();
		this.audio.setAttribute("src", src);
		callback.call(this);
	},
	
	recordStopMobile : function(){
		this.timestamp = Math.round(new Date().getTime() / 1000) + ".wav";     
        if (!this.audioRecorder)
            return;
        this.audioRecorder.clear();
        this.audioRecorder.record();
	},
	
    // Record ou stop record
    recordStop : function(elem, callback){
		this.timestamp = Math.round(new Date().getTime() / 1000) + ".wav";
		if (elem.classList.contains("recording")) {
	        this.audioRecorder.stop();
	        elem.classList.remove("recording");
	    }
	    else{      
	    	if (!this.audioRecorder)
	            return;
	        elem.classList.add("recording");
	        this.audioRecorder.clear();
	        this.audioRecorder.record();
	    }
	    
	    callback.call(this);
	},
	
	// Savoir si on est en record
	isRecorded : function(){
		var elem = document.getElementById("record");
		if(elem.classList.contains("recording"))
			return true;
		else 
			return false;
	},
	
	// Sauvegarder son enregistrement
	saveRecord : function(pseudo, callback){
		this.pseudo = pseudo;
		var self = this;
		this.audioRecorder.exportWAV(this.uploading.bind(this));
		callback.call(this, this.timestamp);
	},
	
	// Mettre ou pas en muet
	soundMute : function(callback){
		if(this.audio.muted == false)
			this.audio.muted = true;
		else
			this.audio.muted = false;
			
		callback.call(this);
	},
	
	// Uploader son record sr le serveur
	uploading : function(blob){
		var self = this;
		var display = false;
		var progress = document.getElementById("uploadProgress");
		var download = document.getElementById("download");
		var percent = document.getElementById("percent");
		
		var form = new FormData();
		form.append("file", blob);
		form.append("timestamp", self.timestamp);
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
					progress.style.display = "none";
					document.getElementById("partage").classList.remove("hide");
					document.getElementById("partage").classList.add("visible");
					self.addToBDD();
				}
			}
		};
		
		// Progression de l'upload
		xhr.upload.addEventListener("progress", function(e){
			if(display == false)
				progress.style.display = "block";
			
			var percentComplete = (e.loaded / e.total) * 100;
			download.style.width = percentComplete + "%";
			
			
			percent.innerHTML = Math.round(percentComplete) + "%";
			display = true;
		}, false);
		
		xhr.open(
			'POST', 
			"http://projetpumir.cinemalebeaulieu.com/modeles/services/uploadAudio.php",
			true
		);
		xhr.send(form);
	},
	
	// Changer le volume de l'audio
	setVolume : function(input){
		this.audio.volume = input.value;
	},
	
	// Insérer le record dans la Base de données
	addToBDD : function(){
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
				}
			}
		};
		
		xhr.open(
			'GET', 
			"http://projetpumir.cinemalebeaulieu.com/modeles/services/addAudio.php?timestamp=" + this.timestamp + "&pseudo=" + this.pseudo + "&id_video=" + this.idVideo,
			false
		);
		xhr.send(null);
	},
	
	// Voter pour un son -> requete Insert into dans la BDD
	vote : function(id_audio, callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
					var nbVotes = xhr.responseText;
					callback.call(this, nbVotes);
				}
			}
		};
		
		xhr.open(
			'GET', 
			"http://projetpumir.cinemalebeaulieu.com/modeles/services/vote.php?id_audio=" + id_audio,
			false
		);
		xhr.send(null);
	},
	
	// Obtenir tous les sons pour une video d'id idVideo
	gets : function(idVideo, callback){
		this.idVideo = idVideo;
		var dataAudios;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status == 200){
					dataAudios = JSON.parse(xhr.responseText);
					callback.call(this, dataAudios);
				}
			}
		};
		
		xhr.open(
			'GET', 
			"http://projetpumir.cinemalebeaulieu.com/modeles/services/getAudios.php?id_video=" + this.idVideo,
			false
		);
		xhr.send(null);
	},
}