<?php
	class Superclass
	{
		private $_videos = array();
		
		public function __construct(){
			global $bdd;
			$reponseVideo = $bdd->query("
				SELECT *
				FROM video
			");
			
			$i = 0;
			while($donneesVideos = $reponseVideo->fetch()){
				$this->_videos[$i] = new Video($donneesVideos['id_video']);
				$i ++;
			}
		}	
		
		public function getVideos(){
			return $this->_videos;
		}
	}
?>