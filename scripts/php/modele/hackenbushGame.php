<?php

class GameData {
	//function GameData($name, $
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
	//$gameData = new GameData(...);
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
	$gamesData;
	$index = 0;
	if (is_dir($dirGames)) {
		if ($dh = opendir($dirGames)) {
			while (($file = readdir($dh)) !== false) {
				if (HackenBush::getInstance()->ext($file) == 'json') {
					$gameData[$index] = HackenBush::getInstance()->getInfo($file);
					$index++;
				}
			}
			closedir($dh);
		}
	}
	return gamesData;
  }
}

?>