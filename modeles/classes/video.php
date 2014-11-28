<?php
	class Video
	{
		private $_id;
		private $_link;
		private $_name;
		private $_cover;
		private $_description;
		private $_sounds = array();
		
		public function __construct($id_video){
			global $bdd;
			$reponseVideo = $bdd->query("
				SELECT *
				FROM video
				WHERE id_video='".$id_video."'
			");
			$audios = $bdd->query("
				SELECT *
				FROM sound, sound_video, video
				WHERE video.id_video='".$id_video."'
				AND video.id_video=sound_video.id_video
				AND sound_video.id_sound=sound.id_sound
			");
			
			$donneesVideos = $reponseVideo->fetch();
			$this->_id = $donneesVideos['id_video'];
			$this->_link = $donneesVideos['link'];
			$this->_description = $donneesVideos['description'];
			$this->_name = $donneesVideos['name'];
			$this->_cover = $donneesVideos['cover'];
			
			$i = 0;
			while($donneesAudios = $audios->fetch()){
				$this->_sounds[$i] = new Sound($donneesAudios['id_sound']);
				$i ++;
			}
		}
		
		public function getId(){
			return $this->_id;
		}
		
		public function getLink(){
			return $this->_link;
		}
		
		public function getDescription(){
			return $this->_description;
		}
		
		public function getSounds(){
			return $this->_sounds;
		}
		
		public function getCover(){
			return $this->_cover;
		}
		
		public function getName(){
			return $this->_name;
		}
	}
?>