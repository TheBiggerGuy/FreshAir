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
  
  <link rel="stylesheet" type="text/css" href="live.css" />
  
</head>

<body>

  <div id="content">
    
    <div id="header">
      <img src="freshair_title.png" />
    </div>
    
    <div id="webcams">
      <img id="webcam1" class="webcamimg" src="http://www.freshair.org.uk/webcam/Webcam01.jpg" alt="Webcam image" />      
      <img id="webcam2" class="webcamimg" src="http://www.freshair.org.uk/webcam/Webcam02.jpg" alt="Webcam image" />      
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="radio">
    </div>
    
    <div id="info">
      <div id="now">
        <h2>Now</h2>
        <a href="#" target="_blank">Loading ...</a>
      </div>
      
      <div id="next">
        <h2>Next</h2>
        <a href="#" target="_blank">Loading ...</a>
      </div>
      
      <div id="control">
        <img src="throbber.gif" alt="Loading ..." />
      </div>
      
      <div style="clear: both; padding: 0px;"></div>
    </div>
    
    <div id="track">
      <div class="trackInfo" style="visibility: hidden;">Loading ...</div>
      <div class="trackInfo" style="visibility: hidden;">Loading ...</div>
      <div class="trackInfo" style="visibility: hidden;">Loading ...</div>
      <div class="trackInfo" style="visibility: hidden;">Loading ...</div>
    </div>
    
    <div id="comment">
      <p>
        <a href="http://live.freshair.org.uk:3066/listen.pls">Play in external player</a>
      </p>
    </div>
  
  </div>

</body>

</html>
