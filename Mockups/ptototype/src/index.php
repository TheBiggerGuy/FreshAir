<?php
  
  // get what page is requested
  if (isset($_GET['q'])) {
    $page = $_GET['q'];
    if ($page == null || count($page) < 1) {
      $page = '/';
    }
  } else {
    $page = '/';
  }
  
  // do the page functions
  if ($page == '/') {

?><!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Fresh Air</title>
  
  <!-- <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script> -->
  <script type="text/javascript" src="http://radio.freshair.org.uk/jquery-1.7.1.min.js"></script>
  
  <script type="text/javascript">
  
  $(function() { // executed when $(document).ready()
  
    $("#liveLink").click( function(e) {
    
      win = window.open("/live", "FreshAir - Live", "height=440,width=280,location=false,menubar=false,status=false,titlebar=false,toolbar=false");
      if (win){
        // we got a pop-up so
        //make focuse
        win.focus();
        // tell the browser not to open normally
        e.preventDefault()
      }
    
    });
  
  });
  
  </script>
  
</head>

<body>
  <a id="liveLink" href="live.php">Live radio pop-out</a>
</body>

</html>
<?php
    exit;
  
  } else if ($page == 'info') {

    // make cache free TODO

    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

    header('Content-type: application/json');
      
    $arr = array(
      'status'  => 'ok',
      'uid'     => 1,
      'data'    => array(
        'track'   => 'RJD2-Crumbs off the Table',
        'now'     => array(
          'title' => 'The Ted Mauley Show',
          'des'   => 'Show info Show info Show info Show info Show info Show info',
          'onat'  => array(
            'long_' => 'Mondays 10-11am',
            'short_'  => '10am',
            'unix'  => '1234567890'
          ),
          'url'   => 'http://www.freshair.org.uk/shows/show1',
          'img'   => 'http://d7.freshair.org.uk/sites/default/files/styles/square_thumbnail/public/Picture0001.jpg'
        ),
        'next'    => array(
          'title' => 'Radioactive',
          'des'   => 'Show info Show info Show info Show info Show info Show info',
          'onat'  => array(
            'long_' => 'Mondays 11-12am',
            'short_'  => '11am',
            'unix'  => '1234567890'
          ),
          'url'   => 'http://www.freshair.org.uk/shows/show2',
          'img'   => 'http://d7.freshair.org.uk/sites/default/files/styles/square_thumbnail/public/Picture0001.jpg'
        ),
        'station' => 'FreshAir'
      )
    );

    echo json_encode($arr);

    exit;
  
  } else if ($page == 'live') {

?><!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Fresh Air - Listen Now</title>
  
  <!-- <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script> -->
  <script type="text/javascript" src="http://radio.freshair.org.uk/jquery-1.7.1.min.js"></script>
  
  <script type="text/javascript" src="http://radio.freshair.org.uk/live.min.js"></script>
  
  <link href='http://fonts.googleapis.com/css?family=PT+Sans:regular,bold&v1' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="http://radio.freshair.org.uk/live.min.css" />
  
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
        <img src="http://radio.freshair.org.uk/throbber.gif" alt="Loading ..." />
      </div>
      <div style="clear: left; padding: 0px;"></div>
      <div id="header-subheader">
        <h3>
          <span id="header-subheader-title">Loading ...</span><br />
          <span id="header-subheader-time">Loading ...</span>
        </h3>
        <div style="clear: both; padding: 0px;"></div>
      </div>
    </div>
    
    <div id="showinfo">
      <img id="showinfo-img" src="http://radio.freshair.org.uk/throbber.gif" />
      <p id="showinfo-des">
        Loading ...
      </p>
      <p>
        <a id="showinfo-link" href="#">Show page</a>
      </p>
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="nowplaying">
        Now Playing: <span id="nowplaying-title">Loading ...</span>
    </div>
    
    <div id="webcams">
      <img id="webcam1" class="webcamimg" src="http://webcam.freshair.org.uk/1" alt="Webcam image - 1" />
      <img id="webcam2" class="webcamimg" src="http://webcam.freshair.org.uk/2" alt="Webcam image - 2" />      
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
<?php
  exit;
  
  } else {
    // invalid URL
    header('HTTP/1.0 404 Not Found', true, '404');
    //var_dump($page);
    phpinfo();
    exit;
  }

?>
