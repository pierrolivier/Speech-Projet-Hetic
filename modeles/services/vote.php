<?php
/*
* Permet de voter pour un Sound
*
*
*/
	if(isset($_GET['id_audio'])){
		require_once("./../bdd.php");
		require_once("./../classes/superclass.php");
		require_once("./../classes/sound.php");
		require_once("./../classes/video.php");
		
		$audio = new Sound($_GET['id_audio']);
		$ip = $_SERVER["REMOTE_ADDR"];
		if($audio->isVoted($ip) == false){
			$audio->vote($ip);
			$audio->refreshNbVote();
		}
		
		echo $audio->getNbVote();
	}	
?>