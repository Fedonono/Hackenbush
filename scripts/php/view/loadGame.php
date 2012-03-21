<?php
	require_once '../modele/hackenbushGame.php';

	$gamesData = HackenBush::getInstance()->getGames();

	if (isset($gamesData)) {
		echo "<div class='load'>";
		$gamesNumber = count($gamesData);
		for ($i = 0; $i < $gamesNumber; $i++) {
			echo "<div class='game'>";
			echo '<img src="'.$gamesData[$i]->imageData.'" alt="'.$gamesData[$i]->name.'"/>'.$gamesData[$i]->name;
			echo "</div>";
		}
		echo "</div>";
	} else
		echo "There isn't game saved.";
/*
	$( ".game" ) 
		.click(function() {
			// load le graph si oui
		});
	*/
?>
