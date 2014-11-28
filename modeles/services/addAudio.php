<?php
/*
*
* Ajoute une vidéo dans la base de données
*
*/
	if(isset($_GET['timestamp']) && isset($_GET['pseudo']) && isset($_GET['id_video'])){
		require_once("./../bdd.php");
		require_once("./../classes/superclass.php");
		require_once("./../classes/sound.php");
		require_once("./../classes/video.php");
		
		$link = "medias/audios/".$_GET['timestamp'];
		$audio = new Sound();
		$audio->setAuthor($_GET['pseudo']);
		$audio->setLink($link);
		$audio->insert();
		$audio->getLastId();
		$audio->linkToVideo($_GET['id_video']);
		
		echo "added";
	}
?>