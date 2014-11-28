<!doctype html>
<html>
<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>SPEECH</title>
	<meta name="description" content="">

	<meta name="viewport" content="width=device-width,initial-scale=1">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,300' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/icomoon/style.css">

</head>
<body>

  <div id="home">
    <p>Select a famous video in our list, and record your own audio track !* </p>
    <p>You create the dialog !</p>
    <p id="btnStart">START</p>
    <p>*For a bigger experience, use your smartphone as a remote and to add noise effects !</p>
  </div>

  <div id="listAudioTracks" class="list_audio_close">
    <div id="audioTracks">
      <p>AUDIO TRACKS</p>
    </div>
    <div id="listeAudio"></div>
  </div>

  <div id="video">
  	<video id="myVideo"></video>
  </div>

   <div id="entete" class="backgroundBlack">
    <span class="icon-menu2"></span>
    <p>SPEECH</p>
    <span class="icon-mic" id="record"><p>RECORD</p></span>
    <span class="icon-mobile"></span>
    <a href="./vues/videos.php">More videos</a>
  </div>

  <div id="recordBox" class="hide">
    <div id="timer">
      <span class="time">ENREGISTREMENT DANS 4S ...</span>
      <span class="notice">(ACTIVEZ VOS HAUT-PARLEURS)</span>
    </div>
    <canvas id="analyser"></canvas>
  </div>

  <div class="hide" id="remote">
    <p>UTILISER VOTRE MOBILE COMME TÉLÉCOMMANDE</p>
    <canvas id="qr-code"></canvas>
  </div>

  <div id="uploadProgress">
    <p>Enregistrement de votre vidéo</p>
    <div id="progressDownload">
      <span id="download"></span>
      <span id="bufferDownload"></span>
    </div>
    <p id="percent"></p>
  </div>
  
  <div id="partage" class="hide">
      <span class="close_partage">x</span>
      <p>Votre speech' est prêt, partagez-le !</p>
      <a target="_blank" href="https://twitter.com/share?url=http%3A%2F%2Fwww.speech.fr/XERTYD&text=Je%20viens%20d%27enregistrer%20un%20Speech%27%20!">Cliquez moi pour partager sous Twitter</a>
  </div>

  <div id="progressEtDuration">
    <span class="icon-play2" id="btnPlayVideo"></span>
    <div id="progressBar">
        <span id="progress"></span>
        <span id="buffer"></span>
    </div>

     <div id="control">
      <p id="duration">00:00 / 00:00</p>      
      <div class="volume">
        <input type="range" min="0" max="1" step="0.1" />
        <span id="volume" class="icon-volume-medium"></span>
      </div>
    </div>
  </div>

  <form method="post" id="addPseudo">
  	<fieldset>
  		<label> TAPER VOTRE PSEUDO</label>
  		<input type="text" name="pseudo" />
  		<input type="submit" value="Valider" />
  	</fieldset>
  </form>
  <audio id="playerAudio"></audio>
  
  <div id="ifMobile">
      <h2>Speech</h2>
      <p>Please use your desktop to use Speech</p>
  </div>

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="http://connect.soundcloud.com/sdk.js"></script>
  <script src="js/qr.min.js"></script>
  <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
  <script type="text/javascript" src="js/lib/recorder.js"></script>
  <script type="text/javascript" src="js/vues/video.js"></script>
  <script type="text/javascript" src="js/modeles/video.js"></script>
  <script type="text/javascript" src="js/modeles/audio.js"></script>
  <script type="text/javascript" src="js/modeles/bruitage.js"></script>
  <script type="text/javascript" src="js/vues/audio.js"></script>
  <script type="text/javascript" src="js/modeles/socket.js"></script>
  <script type="text/javascript" src="js/vues/socket.js"></script>
  <script type="text/javascript" src="js/controllers/controller.js"></script>
</body>
</html>
