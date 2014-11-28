<?php 
/*
* Récupère tous les sons enregistré sur une vidéo donnée
* @param : id de la video en question
* Retourne un tableau JSON des sons
*
*/

if(isset($_GET['id_video'])){
	require_once("./../bdd.php");
	require_once("./../classes/superclass.php");
	require_once("./../classes/sound.php");
	require_once("./../classes/video.php");
	
	$video = new Video($_GET['id_video']);
	$audios = $video->getSounds();
	
	$return = array();
	$audio = array();
	for($i = 0; $i < count($audios); $i++){
		$audio[$i] = array();
		array_push($audio[$i], $audios[$i]->getLink());
		array_push($audio[$i], $audios[$i]->getAuthor());
		array_push($audio[$i], $audios[$i]->getNbVote());
		array_push($audio[$i], $audios[$i]->getId());
		array_push($return, $audio[$i]);
	}
	
	echo json_encode($return);
}