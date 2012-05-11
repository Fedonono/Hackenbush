<?php
	require_once '../modele/hackenbushGame.php';

	$gamesData = HackenBush::getInstance()->getGames();

	echo "<div class='load'><div class='game isRedBlueGraph' id='M.Soulignac_random_graph'>";
	echo "<div class='randomGraph'>?</div>";
	echo "M.Soulignac's graph</div>";
	if (isset($gamesData)) {
		$gamesNumber = count($gamesData);
		for ($i = 0; $i < $gamesNumber; $i++) {
			if (substr_compare($gamesData[$i]->name, "RB_", 0, 3) === 0)
				$graphClass = "isRedBlueGraph";
			else
				$graphClass = "notIAGraph";
			echo "<div class='game ".$graphClass."' id='".$gamesData[$i]->name."'>";
			echo '<img src="'.$gamesData[$i]->imageData.'" alt="'.$gamesData[$i]->name.'"/>'.$gamesData[$i]->name;
			echo "</div>";
		}
		echo "</div>";
		echo "<script type='text/javascript'>
				(function() {
					if (hackenbush.controller.isHumanParty()) {
						$('.load').delegate('div', 'click', function(ev) {
							hackenbush.controller.loadGame(ev.currentTarget.id);
						});
					} else {
						$('.isRedBlueGraph').click( function(ev) {
							hackenbush.controller.loadGame(ev.currentTarget.id);
						});
					}
				})();
			</script>";
	} else
		echo "There isn't game saved.";
?>
