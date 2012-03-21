<?php

class GameData {
	function GameData($name, $imageData) {
		$this->name = $name;
		$this->imageData = $imageData;
	}
}

class HackenBush {

  /**
   * @var HackenBush
   * @access private
   * @static
   */
  private static $_instance = null;
  private static function ext($filename) {
	return pathinfo($filename, PATHINFO_EXTENSION);
  }

  private static function getInfo($filename) {
	$file = fopen("../../../ressources/savedGames/".$filename, "rb");
	$contents = stream_get_contents($file);
	fclose($file);
	$gameData = new GameData(basename($filename, ".txt"), $contents);
	return $gameData;
  }
  /**
   * Create the instance if it doesn't exist yet and return it
   *
   * @param void
   * @return HackenBush
   */
  public static function getInstance() {

    if (is_null(self::$_instance)) {
      self::$_instance = new HackenBush();
    }

    return self::$_instance;
  }

  /**
   * Save a new game
   *
   * @param void
   * @return void
   */
  //public function saveGame($name, $data) {
  public function saveGame($name, $data, $imageData) {
    $savedGames = fopen("../../../ressources/savedGames/".$name.".json", "w+");
    $savedGamesImg = fopen("../../../ressources/savedGames/".$name.".txt", "w+");
	fwrite($savedGames, $data);
	fwrite($savedGamesImg, $imageData);
	fclose($savedGames);
	fclose($savedGamesImg);
  }

  /**
   * getGames
   *
   * @param void
   * @return void
   */
  //public function getGames() {
  public function getGames() {
    $dirGames = "../../../ressources/savedGames/";
	$gamesData = array();
	$index = 0;
	if (is_dir($dirGames)) {
		if ($dh = opendir($dirGames)) {
			while (($file = readdir($dh)) !== false) {
				if (HackenBush::getInstance()->ext($file) == 'txt') {
					$gamesData[$index] = HackenBush::getInstance()->getInfo($file);
					$index++;
				}
			}
			closedir($dh);
		}
	}
	return $gamesData;
  }
}

?>