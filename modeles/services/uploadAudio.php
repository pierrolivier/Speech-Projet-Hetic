<?php
/*
* Upload l'audio enregistr� par l'utilisateur
*
*
*/
	if(isset($_FILES['file']) and !$_FILES['file']['error']){
    	$fname = $_POST['timestamp'];
    	move_uploaded_file($_FILES['file']['tmp_name'], "./../../medias/audios/". $fname);
    }
?>
