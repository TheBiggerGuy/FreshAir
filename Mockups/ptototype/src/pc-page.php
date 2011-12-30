<?php
// make cache free TODO

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

header('Content-type: text/html');

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

<pre>
<?php
  var_dump($_SERVER['HTTP_USER_AGENT']);
?>
</pre>

</body>

</html>
