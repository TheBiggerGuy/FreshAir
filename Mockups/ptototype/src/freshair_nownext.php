<?php

date_default_timezone_set('Europe/London');

// Show all errors
error_reporting(E_ALL);

$url = substr($_SERVER['REQUEST_URI'], 1);

include('freshair_shows.php');  // array of all shows in "$shows"
include('freshair_events.php'); // array of all events in "$events"

/**
 * Class that finds the current show and returns nice data about it.
 *   Currently uses arrays of data, will be changed to SQL.
 */
class ShowFinder {
  
  private $day = null;
  private $time = null;
  
  function __construct() {
    $this->day = strtolower(date('l')); // monday, tuedsay ....
    
    $ltime = localtime();
    $this->time = ($ltime[2] * 60 * 60) + ($ltime[1] * 60) + $ltime[0]; // seconds past in day
  }
  
  private function weekloop($day) {
    if($day == 'monday') {
      return 'tuesday';
    } else if($day == 'tuesday') {
      return 'wednesday';
    } else if($day == 'wednesday') {
      return 'thursday';
    } else if($day == 'thursday') {
      return 'friday';
    } else if($day == 'friday') {
      return 'saturday';
    } else if($day == 'saturday') {
      return 'sunday';
    } else if($day == 'sunday') {
      return 'monday';
    } else {
      die('error'); // TODO
    }
  }
  
  public function find($events, $shows) {
    $event = array_filter($events[$this->day], array($this, 'finder'));
    if( count($event) != 1 ) {
      die("error"); // TODO
    }
    $eventkey = key($event); // not always index zero!
    
    $nowevent = $event[$eventkey];
    $nowday = $this->day;
    if( $nowevent['end'] == 86400) {
      $nextday = $this->weekloop($nowday);
      $nextevent = $events[$nextday][0];
    } else {
      $nextday = $nowday;
      $nextevent = $events[$nextday][$eventkey+1];
    }
    
    $nowshow  = $shows[$nowevent['show']];
    $nextshow = $shows[$nextevent['show']];
    
    return array(
	  // let the user know we didn't have any issues
	  'status' => 'ok',
      'now' => array(
        'start' => $nowevent['start'],
        'end'   => $nowevent['end'],
        'day'   => $nowday,
        'show'  => $nowshow['name'],
        'url'   => $nowshow['url'],
        'image' => 'http://static.freshair.org.uk/2011/fresher/player/shows/show_' . $nowevent['show'] . '.JPG'
      ),
      'next' => array(
        'start' => $nextevent['start'],
        'end'   => $nextevent['end'],
        'day'   => $nextday,
        'show'  => $nextshow['name'],
        'url'   => $nextshow['url'],
        'image' => 'http://static.freshair.org.uk/2011/fresher/player/shows/show_' . $nextevent['show'] . '.JPG'
      ),
    );
  }
  
  /**
   * Returns TRUE  if show is on now.
   *      or FALSE if it is not
   */
  private function finder($show) {
    return ( $show['start'] <= $this->time && $this->time < $show['end'] );
  }
}

$find = new ShowFinder();
$show = $find->find($events, $shows);
$find = null;

header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); 
header('Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . 'GMT'); 
header('Cache-Control: no-cache, must-revalidate'); 
header('Pragma: no-cache');
header('Content-type: application/json');

//var_dump($show);
// supporting standard jsonp if used.
if( isset($_GET['callback'])) {
	echo $_GET['callback'].'('.json_encode($show).');';
}
else {
	echo json_encode($show);
}

?>
