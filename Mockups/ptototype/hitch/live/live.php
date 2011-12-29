<?php
  date_default_timezone_set('Europe/London');

$url = substr($_SERVER['REQUEST_URI'], 1);

include('freshair_shows.php');
include('freshair_events.php');


  // make cache free TODO
  
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  
  if( isset($_GET['action']) && $_GET['action'] == 'getinfo' ) {
    header('Content-type: application/json');

/**
 * Class that finds the current show and returns nice data about it.
 * Currently uses arrays of data, will be changed to SQL.
 */
class ShowFinder {
  
  private $day = null;
  private $time = null;
  //private $UTCday = null;
  
  function __construct() {
    $this->day = strtolower(date('l')); // monday, tuesday ....
    //$this->day = 'monday';
    //$this->day = $url;
    
    $ltime = localtime();
    $this->time = ($ltime[2] * 60 * 60) + ($ltime[1] * 60) + $ltime[0]; // seconds past in day
    $ltime = null;
    
    //$utc = new DateTime(NULL, new DateTimeZone('UTC'));
    //$utc->setDate(1985, 1, 22);
    //$this->UTCday = $utc->getTimestamp();
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
      $nextday = $this->weekloop($this->day);
      $nextevent = $events[$nextday][0];
    } else {
      $nextevent = $events[$nextday][$eventkey+1];
      $nextday = $this->day;
    }
    
    $nowshow  = $shows[$nowevent['show']];
    $nextshow = $shows[$nextevent['show']];
    
    return array(
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

header('Content-type: application/json');
echo json_encode($show);


    exit;
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Fresh Air - Listen Now</title>
  
  <meta name="viewport" content="width=270, height=420, initial-scale=1" />
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="FreshAir Radio Player"/>
  <meta http-equiv="X-UA-Compatible" content="IE=8"/>
  
  <!-- TODO
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"/>
  -->
  
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
  <script type="text/javascript" src="jquery.jplayer.js"></script>
  <script type="text/javascript" src="jquery.pulse.js"></script>
  <script type="text/javascript" src="live.js"></script>
  
  <link href='http://fonts.googleapis.com/css?family=PT+Sans:regular,bold&v1' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="live.css" />
  
</head>

<body>
  
  <!--[if lt IE 7]>
  <div id="warning">
    Warning: FreshAir does not support you browser.
      <a href="http://windows.microsoft.com/en-US/internet-explorer/products/ie/home?ocid=ie6_countdown_bannercode">Please Upgrade IE6</a>
  </div>
  <div style="clear: left; padding: 0px;"></div>
  <![endif]-->
  
  <div id="content">
    
    <div id="header">
      <div id="header-fresh">
        <h1>Fresh<br />Air</h1>
      </div>
      <div id="header-player">
        <h2>Player</h2>
      </div>
      <div id="header-control" class="tooltip" title="Pause" >
        <img src="throbber.gif" alt="Loading ..." />
      </div>
      <div style="clear: left; padding: 0px;"></div>
      <div id="header-subheader">
        <h3>
          <a id="showinfo-link" href="#"><span id="header-subheader-title">Loading ...</span></a><br />
          <span id="header-subheader-time">Loading ...</span>
        </h3>
        <div style="clear: both; padding: 0px;"></div>
      </div>
    </div>
    <div id="showinfo-img-id">
	<img id="showinfo-img" src="throbber.gif" />
    </div>
<!-- Remove Show Description
    <div id="showinfo">
      <p id="showinfo-des">
        Loading ...
      </p>
      <p>
        <a id="showinfo-link" href="#">Show page</a>
      </p>
      <div style="clear: both; padding: 0px;"></div>
    </div> -->
    
    <div id="nowplaying">
        <marquee behavior="scroll" direction="left" scrolldelay="130">Now Playing: <span id="nowplaying-title">Loading ...</span></marquee>
    </div>
    
    <div id="webcams">
      <a href="http://webcam.freshair.org.uk/1" target="_blank"><img id="webcam1" class="webcamimg" src="http://webcam.freshair.org.uk/1" alt="Webcam image" /></a>
      <a href="http://webcam.freshair.org.uk/2" target="_blank"><img id="webcam2" class="webcamimg" src="http://webcam.freshair.org.uk/2" alt="Webcam image" /></a>      
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="next">
      Next- <span id="next-title">Loading ...</span> at <span id="next-time">Loading ...</span>
    </div>
    
    <div id="radio">
    </div>
    
    <div id="footer">
      <div id="footer-hifi">
        <div class="footer-item">Hi-Fi</div>
      </div>
      <div id="footer-lofi">
        <div class="footer-item">Lo-Fi</div>
      </div>
      <div id="footer-ext">
        <div class="footer-item">External</div>
      </div>
      <div style="clear: both; padding: 0px;"></div>
    </div>
  
  </div>

</body>

</html>
