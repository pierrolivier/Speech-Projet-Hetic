<?php
	class Sound
	{
		private $_id;
		private $_link;
		private $_author;
		private $_votes = array();
		private $_nb_vote = 0;
		
		public function __construct(){
			$num_param = func_num_args();
			global $bdd;
			
			switch ($num_param)
			{
				case 1:
					$id_son = func_get_arg(0);
					$reponseAudio = $bdd->query("
						SELECT *
						FROM sound
						WHERE id_sound='".$id_son."'
					");
					$donneesAudio = $reponseAudio->fetch();
					
					$votes = $bdd->query("SELECT COUNT(audio_vote.id_sound) AS nbVote
					FROM sound, audio_vote
					WHERE audio_vote.id_sound=sound.id_sound
					AND sound.id_sound='".$id_son."'");
					
					while($donneesVote = $votes->fetch()){
						$this->_nb_vote = $donneesVote['nbVote'];
					}
					
					$this->_id = $donneesAudio['id_sound'];
					$this->_link = $donneesAudio['link'];
					$this->_author = $donneesAudio['author'];
				break;
			}
		}
		
		public function getId(){
			return $this->_id;
		}
		
		public function getLink(){
			return $this->_link;
		}
		
		public function setLink($link){
			$this->_link = $link;
		}
		
		public function getAuthor(){
			return $this->_author;
		}
		
		public function setAuthor($author){
			$this->_author = $author;
		}
		
		public function getNbVote(){
			return $this->_nb_vote;
		}
		
		public function insert(){
			global $bdd;
			$bdd->query("INSERT INTO sound(link, author)
			VALUES('".$this->_link."', '".$this->_author."')");
		}
		
		public function getLastId(){
			global $bdd;
			$reponse = $bdd->query("SELECT *
			FROM sound
			ORDER BY id_sound
			DESC");
			$donnees = $reponse->fetch();
			$this->_id = $donnees['id_sound'];
		}
		
		public function linkToVideo($idvideo){
			global $bdd;
			$bdd->query("INSERT INTO sound_video(id_sound, id_video)
			VALUES('".$this->_id."', '".$idvideo."')");
		}
		
		public function isVoted($ip){
			global $bdd;
			$rep = $bdd->query("SELECT * 
			FROM audio_vote
			WHERE id_sound='".$this->_id."'
			AND ip_adress='".$ip."'");
			
			if($rep->rowCount() > 0)
				return true;
			else
				return false;
		}
		
		public function refreshNbVote(){
			$this->_nb_vote = 0;
			
			global $bdd;
			$votes = $bdd->query("SELECT COUNT(audio_vote.id_sound) AS nbVote
			FROM sound, audio_vote
			WHERE audio_vote.id_sound=sound.id_sound
			AND sound.id_sound='".$this->_id."'");
			
			while($donneesVote = $votes->fetch()){
				$this->_nb_vote = $donneesVote['nbVote'];
			}
		}
		
		public function vote($ip){
			global $bdd;
			$bdd->query("INSERT INTO audio_vote(id_sound, ip_adress)
			VALUES('".$this->_id."', '".$ip."')");
		}
	}
?>