<?php
// make cache free TODO

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

header('Content-type: text/html');

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

