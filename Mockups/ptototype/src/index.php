<?php

/**
 * array of
 * URL => function
 *   or
 * URL =>
 *   DEVICE => function
 */
$pages = array(
  '/' => 
    array(
      'ios'           => function () { header('Location: http://radio.freshair.org.uk/ios',     true, '307'); },
      'android'       => function () { header('Location: http://radio.freshair.org.uk/android', true, '307'); },
      'pc'            => function () { header('Location: http://radio.freshair.org.uk/pc',      true, '307'); },
      'not-supported' => function () { header('Location: http://radio.freshair.org.uk/sorry',   true, '307'); },
    ),
  'info'    => function () { require(   'info-page.php'); },
  'ios'     => function () { require(    'ios-page.php'); },
  'android' => function () { require('android-page.php'); },
  'pc'      => function () { require(     'pc-page.php'); },
  'sorry'   => function () { require(  'sorry-page.php'); }
);

/* ################# DO NOT TOUCH BELLOW #################################### */

function getDeviceType() {
  
  $ua = $_SERVER['HTTP_USER_AGENT'];
  
  //Detect special conditions devices
  $Android  = stripos($ua, 'AppleWebKit') && stripos($ua, 'Mobile') && stripos($ua, 'Safari') && stripos($ua, 'Android');
  $ios      = stripos($ua, 'AppleWebKit') && stripos($ua, 'Mobile') && stripos($ua, 'Safari') && !$Android;
  
  $webOS        = stripos($ua, 'webOS');
  $BlackBerry   = stripos($ua, 'BlackBerry');
  $RimTablet    = stripos($ua, 'RIM Tablet');
  
  // TODO: fix opera
  $OperaMini    = stripos($ua, 'Opera') && stripos($ua, 'Mini');
  $OperaMobile  = stripos($ua, 'Opera') && stripos($ua, 'Mobi') && !$OperaMini;
  $OperaPc      = stripos($ua, 'Opera') && !$OperaMini && !$OperaMobile;
  
  //do something with this information
  if ( $ios ) {
    return 'ios';
  } else if( $Android ) {
    return 'android';
  } else if( $OperaMini || $OperaMobile || $webOS || $BlackBerry || $RimTablet ) {
    return 'not-supported';
  } else {
    return 'pc';
  }

}

function getURL() {
  // get what page is requested
  if (isset($_GET['q'])) {
    $url = $_GET['q'];
    if ($url == null || count($url) < 1) {
      $url = '/';
    }
  } else {
    $url = '/';
  }
  
  return $url;
}

/* main ########## */

$page = getURL();

if (!array_key_exists($page, $pages)) {
  // invalid URL
  header('HTTP/1.0 404 Not Found', true, '404');
  exit;
}

$to_show = $pages[$page];
  
if (is_callable($to_show)) {
  call_user_func($to_show);
  exit;
} else {
  $device = getDeviceType();
  if (!array_key_exists($device, $to_show)) {
    header('HTTP/1.0 500 Internal Server Error', true, '500');
    exit;
  }
  call_user_func($to_show[$device]);
  exit;
}

?>
