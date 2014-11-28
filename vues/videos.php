<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>SPEECH : Videos</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="stylesheet" href="./../css/videos.css">
  <link rel="stylesheet" href="./../css/icomoon/style.css">
</head>
<body>
<?php
	require_once("./../modeles/bdd.php");
	require_once("./../modeles/classes/sound.php");
	require_once("./../modeles/classes/video.php");
	require_once("./../modeles/classes/superclass.php");
	
	$superclass = new Superclass();
	$videos = $superclass->getVideos();
	$nbVideos = count($videos);
?>
	<div id="barreMenu">
	    <p>SPEECH</p>
	</div>
	<section>
<?php
	for($i = 0; $i < $nbVideos; $i ++){
		$audios = $videos[$i]->getSounds();
		$nbAudios = count($audios);
		echo "
        <div class='videoList'>
            <div class='description'>
                <div class='videos' style='background-image:url(".$videos[$i]->getCover().")' id='video".$i."' data-id='".$videos[$i]->getId()."'></div>
                <div class='infos'>
                    <p>".$videos[$i]->getName()."</p>
                    <p class='views'>(".$nbAudios." Song". ($nbAudios>1?"s":""). ")</p>
                </div>
            </div>
        </div>
		";
	} 
?>
	</section>
	<script type="text/javascript">
		var videos = document.getElementsByClassName("videos");
		for(var i = 0; i < videos.length; i++){
			videos[i].addEventListener("click", clic, false);
		}
		
		function clic(){
			var id = this.getAttribute("data-id");
			console.log(id);
			document.location.href = "http://projetpumir.cinemalebeaulieu.com/index.php?id_video=" + id;
		}
	</script>
</body>
</html>
