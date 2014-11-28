<?php 
/*
* Récupère les informations d'une vidéo à partir de son id
* Retourne un tableau JSON
*
*/

if(isset($_GET['id_video'])){
	require_once("./../bdd.php");
	require_once("./../classes/superclass.php");
	require_once("./../classes/sound.php");
	require_once("./../classes/video.php");
	
	$maVideo = new Video($_GET['id_video']);
	
	$return = array();
	array_push($return, $maVideo->getId());
	array_push($return, $maVideo->getLink());
	array_push($return, $maVideo->getDescription());
	array_push($return, $maVideo->getName());
	
	echo json_encode($return);
}