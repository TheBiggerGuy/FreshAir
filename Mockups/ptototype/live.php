<?php
  
  // make cache free TODO
  
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  
  if( isset($_GET['action']) && $_GET['action'] == 'getinfo' ) {
    header('Content-type: application/json');
    
    $arr = array(
      'status'  => 'ok',
      'uid'     => 1,
      'data'    => array(
        'track'   => 'RJD2-Crumbs off the Table',
        'now'     => array(
          'title' => 'The Ted Mauley Show',
          'des'   => 'Show info Show info Show info Show info Show info Show info',
          'onat'  => 'Mondays 10-11am',
          'url'   => 'http://www.freshair.org.uk/shows/show1',
          'img'   => '#'
        ),
        'next'    => array(
          'title' => 'Radioactive',
          'des'   => 'Show info Show info Show info Show info Show info Show info',
          'onat'  => 'Mondays 11-12am',
          'url'   => 'http://www.freshair.org.uk/shows/show2',
          'img'   => '#'
        ),
        'station' => 'FreshAir'
      )
    );
    
    echo json_encode($arr);
    
    exit;
  }

?><!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Fresh Air - Listen Now</title>
  
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
  <script type="text/javascript" src="jquery.jplayer.min.js"></script>
  <!--
    <script type="text/javascript" src="jquery.pulse.js"></script>
    <script type="text/javascript" src="live.js"></script>
  -->
  <script type="text/javascript" src="live.min.js"></script>
  
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
          <span id="header-subheader-title">Loading ...</span><br />
          <span id="header-subheader-time">Loading ...</span>
        </h3>
        <div style="clear: both; padding: 0px;"></div>
      </div>
    </div>
    
    <div id="showinfo">
      <img id="showinfo-img" src="throbber.gif" />
      <p id="showinfo-des">
        Loading ...
      </p>
      <p>
        <a id="showinfo-link" href="#">Loading ...</a>
      </p>
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="nowplaying">
        Now Playing: <span id="nowplaying-title">Loading ...</span>
    </div>
    
    <div id="webcams">
      <img id="webcam1" class="webcamimg" src="http://www.freshair.org.uk/webcam/Webcam01.jpg" alt="Webcam image" />      
      <img id="webcam2" class="webcamimg" src="http://www.freshair.org.uk/webcam/Webcam02.jpg" alt="Webcam image" />      
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="next">
      Next- <span id="next-title">Loading ...</title> at <span id="next-time">Loading ...</span>
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
      <div id="footer-exit">
        <div class="footer-item">Exit</div>
      </div>
      <div style="clear: both; padding: 0px;"></div>
    </div>
  
  </div>

</body>

</html>
