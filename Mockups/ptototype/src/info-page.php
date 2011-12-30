<?php
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

?>
