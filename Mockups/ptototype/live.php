<?php

  if( isset($_GET['action']) && $_GET['action'] == 'track' ) {
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Content-type: application/json');
    
    $arr = array(
      'status'  => 'ok',
      'uid'     => 1,
      'data'    => array(
        'track'   => 'RJD2-Crumbs off the Table',
        'now'     => array(
          'showName'  => 'show1',    
          'url'   => 'http://www.freshair.org.uk/shows/show1'
        ),
        'next'     => array(
          'showName'  => 'show2',    
          'url'   => 'http://www.freshair.org.uk/shows/show2'
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
  <script type="text/javascript" src="live.js"></script>
  
  <link href='http://fonts.googleapis.com/css?family=PT+Sans:bold&v1' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="live.css" />
  
</head>

<body>

  <div id="content">
    
    <div id="header">
      <div id="header-fresh">
        <h1>Fresh<br />Air</h1>
      </div>
      <div id="header-player">
        <h2>Player</h2>
      </div>
      <div id="header-control">
        <img src="throbber.gif" alt="Loading ..." />
      </div>
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="subheader">
      <h3>
        How - The Ted Mauley Show<br />
        Mondays 10-11am
      </h3>
    </div>
    
    <div id="showinfo">
      <img id="showinfo-img" src="" />
      <p>
        Show info Show info Show info Show info Show info Show info
      </p>
      <p>
        <a href="#">Show Link</a>
      </p>
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="nowplaying">
        Now Playing: Song Abc
    </div>
    
    <div id="webcams">
      <img id="webcam1" class="webcamimg" src="http://www.freshair.org.uk/webcam/Webcam01.jpg" alt="Webcam image" />      
      <img id="webcam2" class="webcamimg" src="http://www.freshair.org.uk/webcam/Webcam02.jpg" alt="Webcam image" />      
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="radio">
    </div>
    
    <div id="next">
      Next- Radioactive
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
