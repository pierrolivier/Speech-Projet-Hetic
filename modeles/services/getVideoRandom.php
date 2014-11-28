<?php

/*
* Récupère une vidéo parmi celle de la BDD
*
*/
	require_once("./../bdd.php");
	require_once("./../classes/superclass.php");
	require_once("./../classes/sound.php");
	require_once("./../classes/video.php");
	
	$super = new Superclass();
	$videos = $super->getVideos();
	$nbVideos = count($videos);
	$rand = rand(0, $nbVideos - 1);
	
	$maVideo = $videos[$rand];
	
	$return = array();
	array_push($return, $maVideo->getId());
	array_push($return, $maVideo->getLink());
	array_push($return, $maVideo->getDescription());
	array_push($return, $maVideo->getName());
	
	echo json_encode($return);
?>