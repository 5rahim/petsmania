<?php

/************************************

 /$$$$$$$$ /$$                     /$$                                                                      
| $$_____/|__/                    | $$                                                                      
| $$       /$$  /$$$$$$   /$$$$$$ | $$$$$$$   /$$$$$$   /$$$$$$  /$$  /$$  /$$  /$$$$$$$  /$$$$$$   /$$$$$$ 
| $$$$$   | $$ /$$__  $$ /$$__  $$| $$__  $$ /$$__  $$ /$$__  $$| $$ | $$ | $$ /$$_____/ /$$__  $$ /$$__  $$
| $$__/   | $$| $$  \__/| $$$$$$$$| $$  \ $$| $$  \__/| $$  \ $$| $$ | $$ | $$|  $$$$$$ | $$$$$$$$| $$  \__/
| $$      | $$| $$      | $$_____/| $$  | $$| $$      | $$  | $$| $$ | $$ | $$ \____  $$| $$_____/| $$      
| $$      | $$| $$      |  $$$$$$$| $$$$$$$/| $$      |  $$$$$$/|  $$$$$/$$$$/ /$$$$$$$/|  $$$$$$$| $$      
|__/      |__/|__/       \_______/|_______/ |__/       \______/  \_____/\___/ |_______/  \_______/|__/      
                                                                                                            
*************************************
*************************************

            _                             _       
           | |                           (_)      
 _ __   ___| |_ ___ _ __ ___   __ _ _ __  _  __ _ 
| '_ \ / _ \ __/ __| '_ ` _ \ / _` | '_ \| |/ _` |
| |_) |  __/ |_\__ \ | | | | | (_| | | | | | (_| |
| .__/ \___|\__|___/_| |_| |_|\__,_|_| |_|_|\__,_|
| |                                               
|_|                                               


/************************************
/***********************************/

session_start();
// date_default_timezone_set('UTC');

$siteName = "PetsMania";
$siteVersion = "1.0.0";
$siteState = "BETA";
$siteCopyright = "Copyright &copy 2016. Tous droits réservés. Bundle Games";

try{
	$param = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
	$bdd = new PDO("mysql:host=127.0.0.1;dbname=petsmania", "root", "", $param);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(Exception $e){
	echo $e->getMessage();
	die();
}



/************************************
/************************************
/* Firebrowser core functions
/************************************
/***********************************/


function secu($var){
	$var = htmlspecialchars(htmlentities(trim($var), ENT_NOQUOTES, "UTF-8"));
	return $var;
}

function hash5($var) {
	$var = md5($var);
	return $var;
}

function decode($var) {
	$var = html_entity_decode($var);
	return $var;
}

function getField($what) {
	if (!empty($_POST[$what])) {
		return true;
	} else {
		return false;
	}
}

function field($what) {
	$field = secu($_POST[$what]);
	return $field;
}

function trigger($what) {
	if (isset($_POST[$what])) {
		return true;
	} else {
		return false;
	}
}

function url($url) {
	if (isset($_GET[$url])) {
		return true;
	} else {
		return false;
	}
}

function urlVal($url) {
	return $_GET[$url];
}


function redirect($where) {
	header('Location: '.$where);
}


/************************************
/************************************
/* Firebrowser Date
/************************************
/***********************************/

class Date {
	function transform($datetime) {
	    $now = time();
	    $created = strtotime($datetime);
	    // La différence est en seconde
	    $diff = $now-$created;
	    $m = ($diff)/(60); // on obtient des minutes
	    $h = ($diff)/(60*60); // ici des heures
	    $j = ($diff)/(60*60*24); // jours
	    $s = ($diff)/(60*60*24*7); // et semaines
	    if ($diff < 60) { // "il y a x secondes"
	        return $diff.' secondes';
	    }
	    elseif ($m < 60) { // "il y a x minutes"
	        $minute = (floor($m) == 1) ? 'minute' : 'minutes';
	        return floor($m).' '.$minute;
	    }
	    elseif ($h < 24) { // " il y a x heures, x minutes"
	        $heure = (floor($h) <= 1) ? 'heure' : 'heures';
	        $dateFormated = floor($h).' '.$heure;
	        /*if (floor($m-(floor($h))*60) != 0) {
	            $minute = (floor($m) == 1) ? 'minute' : 'minutes';
	            $dateFormated .= ', '.floor($m-(floor($h))*60).' '.$minute;
	        }*/
	        return $dateFormated;
	    }
	    elseif ($j < 7) { // " il y a x jours, x heures"
	        $jour = (floor($j) <= 1) ? 'jour' : 'jours';
	        $dateFormated = floor($j).' '.$jour;
	        /*if (floor($h-(floor($j))*24) != 0) {
	            $heure = (floor($h) <= 1) ? 'heure' : 'heures';
	            $dateFormated .= ', '.floor($h-(floor($j))*24).' '.$heure;
	        }*/
	        return $dateFormated;
	    }
	    elseif ($s < 5) { // " il y a x semaines, x jours"
	        $semaine = (floor($s) <= 1) ? 'semaine' : 'semaines';
	        $dateFormated = floor($s).' '.$semaine;
	        /*if (floor($j-(floor($s))*7) != 0) {
	            $jour = (floor($j) <= 1) ? 'jour' : 'jours';
	            $dateFormated .= ', '.floor($j-(floor($s))*7).' '.$jour;
	        }*/
	        return $dateFormated;
	    }
	    else { // on affiche la date normalement
	        return strftime("%d %B %Y à %H:%M", $created);
	    }
	}
}

$date = new Date();


/************************************
/************************************
/* Firebrowser Users
/************************************
/***********************************/

class User {

	public function info($what) {
		global $bdd;
		$get_user_info_query = $bdd->prepare('SELECT * FROM users WHERE token = ?');
		$get_user_info_query->execute(array($_SESSION['auth']['token']));
		$get_user_info = $get_user_info_query->fetch(PDO::FETCH_OBJ);
		return $get_user_info->$what;
	}

  public function restrict() {
    if (!isset($_SESSION['auth']['token']) && empty($_SESSION['auth']['token'])) {
      redirect('auth.php');
    }
  }

  public function inverseRestrict() {
    if (isset($_SESSION['auth']['token'])) {
      redirect('index.php');
    }
  }

	public function existUser($with,$what) {
		global $bdd;
		$check = $bdd->prepare('SELECT * FROM users WHERE '.$with.' = ?');
		$check->execute(array($what));
		if ($check->rowCount() > 0) {
			return true;
		} else {
			return false;
		}
	}

	public function existUserWith($email,$password) {
		global $bdd;
		$check = $bdd->prepare('SELECT * FROM users WHERE email = ? and password = ?');
		$check->execute(array($email,$password));
		if ($check->rowCount() > 0) {
			return true;
		} else {
			return false;
		}
	}

	public function loginToken($email) {
		global $bdd;
		$login_query = $bdd->prepare('SELECT * FROM users WHERE email = ?');
		$login_query->execute(array($email));
		$login_user = $login_query->fetch(PDO::FETCH_OBJ);
		return $login_user->token;
	}

	public function gender($code) {
		if ($code == 'M') {
			return 'Garçon';
		} elseif ($code == 'F') {
			return 'Fille';
		} else {
			return 'N/A';
		}
	}

	public function age($year) {
		return (date('Y') - $year);
	}

	public function get($what,$by,$thing) {
		global $bdd;
		$get_user_information = $bdd->prepare('SELECT * FROM users WHERE '.$by.' = ?');
		$get_user_information->execute(array($thing));
		$get_information = $get_user_information->fetch(PDO::FETCH_OBJ);
		return $get_information->$what;
	}
  
  public function isConnected() {
    if(isset($_SESSION['auth']['token']) && !empty($_SESSION['auth']['token'])) {
      return true;
    }
  }
  
}

$user = new User();


/************************************
/************************************
/* Firebrowser Core
/************************************
/***********************************/

class Core {

}

$core = new Core();




/************************************
/************************************
/* PetsMania Animal
/************************************
/***********************************/


class Animal {
  
  public function getImage($code, $token) {
    
    global $bdd;
    
    $thisAnimal = $bdd->prepare('SELECT * FROM animals_membership WHERE token = ?');
    $thisAnimal->execute(array($token));
    $animal = $thisAnimal->fetch(PDO::FETCH_OBJ);
    
    if($animal->health <= 50) {
      return '<img src="core/style/images/animals/'. $animal->code .'_sick.png?">';
    } else {
      if($animal->hygiene <= 50) {
        return '<img src="core/style/images/animals/'. $animal->code .'_dirty.png?">';
      } else {
        return '<img src="core/style/images/animals/'. $animal->code .'.png?">';
      }
    }
    
  }
  
}

$animal = new Animal();

class Food {
  
  public function getImage($token, $code, $percent) {
    
    global $bdd;
    
    $thisFood = $bdd->prepare('SELECT * FROM food_membership WHERE token = ?');
    $thisFood->execute(array($token));
    $food = $thisFood->fetch(PDO::FETCH_OBJ);
    
    if($food->percent == 100) {
      return '<img src="core/style/images/food/'. $food->code .'.png?">';
    } elseif($food->percent <= 99 && $food->percent >= 50) {
      return '<img src="core/style/images/food/'. $food->code .'_2.png?">';
    } elseif($food->percent <= 49 && $food->percent >= 0) {
      return '<img src="core/style/images/food/'. $food->code .'_3.png?">';
    } else {
      return '???';
    }
    
  }
  
}

$food = new Food();