<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=projetpumir', 'projetpumir', 'hetic');
		$bdd->query('SET NAMES utf8');
	}
	
	catch( PDOException $Exception )
	{
		echo "Erreur lors de la connexion à la base de données";
	}
?>