/**
 * FreshAir.org.uk Radio Player 
 * ---
 * @preserve
 * @author Guy Taylor (http://www.thebiggerguy.com)
 * @version 0.5
 * @updated 11-JUL-2011
 * @created 08-JUL-2011
 * Images and Design Copyright 2011, Richard Hanrahan
 *
 * Copyright (c) 2011 Guy Taylor (http://www.thebiggerguy.com)
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 * ---
 * Includes jquery.pulse.js (version 0.1 16-DEC-09)
 * https://github.com/jamespadolsey/jQuery-Plugins/tree/master/pulse
 * Copyright (c) 210 James Padolsey (http://james.padolsey.com)
 * Dual licensed under the MIT and GPL licenses.
 *   - http://www.opensource.org/licenses/mit-license.php
 *   - http://www.gnu.org/copyleft/gpl.html
 * ---
 */

/*
 * Includes jquery.jplayer.js (version 2.0.0 20-DEC-10)
 * http://www.happyworm.com/jquery/jplayer
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 * ---
 */
 
/**
 * The CSS solector of the play/pasue image
 * @const
 * @type {string}
 */
 var CSS_PLAY_PAUSE_IMG = "#header-control img";
/**
 * The CSS solector of the play/pasue div
 * @const
 * @type {string}
 */
 var CSS_PLAY_PAUSE_DIV = "#header-control";

/**
 * The URL the hight quaility audio stream
 * @const
 * @type {string}
 */
var AUDIO_URL_HIGH = "http://live.freshair.org.uk:3066/;";
/**
 * The URL the hight quaility audio stream
 * @const
 * @type {string}
 */
var AUDIO_URL_LOW  = "http://live.freshair.org.uk:3088/;";

/**
 * @const
 */
var IMAGES = [
  "playbutton.png",
  "pausebutton.png",
  "throbber.gif"
];

/** @const */ var DEBUG   = true;
/** @const */ var TIMEOUT_WEBCAM = 10*1000
/** @const */ var TIMEOUT_TRACK  =  5*1000



// stop errors for browsers that have no debug console
if (DEBUG){
  if (!window.console)
      console = {};
  console.log   = console.log   || function(){};
  console.warn  = console.warn  || function(){};
  console.error = console.error || function(){};
  console.info  = console.info  || function(){};
}

/**
 * @const
 * @enum {number}
 */
var STATES = {
  STATE_EMPTY:   0,
  STATE_STOPED:  1,
  STATE_PAUSED:  2,
  STATE_PLAYING: 4
};

var state = STATES.STATE_EMPTY;
var player = null;

var trackCount = 0;

$(function() { // executed when $(document).ready()
  
  if (DEBUG)
    console.info("$(document).ready()");
  
  $(CSS_PLAY_PAUSE_IMG).hover(
    function ()
    {
      $(this).stop();
      $(this).pulse(
      {
        opacity: [0.5, 1]
      },
      {
        duration: 500,
        times: 999999,
        easing: "swing"
      });
    },
    function ()
    {
      $(this).stop();
      $(this).pulse(
      {
        opacity: [1, 0.5]
      },
      {
        duration: 2000,
        times: 999999,
        easing: "swing"
      });
    }
  ).trigger('mouseleave');
  
  $(".footer-item").hover(
    function ()
    {
      $(this).parent().animate(
      {
        height: 25,
        easing: "swing"
      });
    },
    function ()
    {
      $(this).parent().animate(
      {
        height: 20,
        easing: "swing"
      });
    }
  );
  
  $(CSS_PLAY_PAUSE_IMG).bind('click', playPause);
  
  // preload images
  for(var i in IMAGES){
    (new Image).src = IMAGES[i];
  }
  
  // start audio
  $("#radio").jPlayer(
    {
      ready: function ()
      {
        if (DEBUG)
          console.info("jPlayer: Ready");
        player = $(this).jPlayer("setMedia",
          {
            mp3: AUDIO_URL_HIGH
          }
        );
        state = STATES.STATE_STOPED;
        $(CSS_PLAY_PAUSE_IMG).attr("src", "playbutton.png").attr("alt", "play");
        $(CSS_PLAY_PAUSE_DIV).attr("title", "play");
      },
      swfPath: "http://www.freshair.org.uk/dev/",
      supplied: "mp3",
      error: function (error)
      {
        if (DEBUG)
          console.info("jPlayer: error");
        $(CSS_PLAY_PAUSE_DIV).html("Error !");
      },
      play: function ()
      {
        if (DEBUG)
          console.info("jPlayer: play");
        state = STATES.STATE_PLAYING;
        $(CSS_PLAY_PAUSE_IMG).attr("src", "pausebutton.png").attr("alt", "pause");
        $(CSS_PLAY_PAUSE_DIV).attr("title", "pause");
      },
      pause: function ()
      {
        if (DEBUG)
          console.info("jPlayer: pause");
        state = STATES.STATE_STOPED;
        $(CSS_PLAY_PAUSE_IMG).attr("src", "playbutton.png").attr("alt", "play");
        $(CSS_PLAY_PAUSE_DIV).attr("title", "play");
      },
      playing: function ()
      {
        if (DEBUG)
          console.info("jPlayer: pauseplaying");
        state = STATES.STATE_PLAYING;
        $(CSS_PLAY_PAUSE_IMG).attr("src", "pausebutton.png").attr("alt", "pause");
        $(CSS_PLAY_PAUSE_DIV).attr("title", "pause");
      },
      backgroundColor: "#EA6A11",
      errorAlerts: false,
      warningAlerts: false,
      solution: "html, flash",
      preload: "none",
      cssSelector: {
        videoPlay: "",
        play: "",
        pause: "",
        stop: "",
        seekBar: "",
        playBar: "",
        mute: "",
        unmute: "",
        volumeBar: "",
        volumeBarValue: "",
        currentTime: "",
        duration: ""
      }
    }
  );
  
  // start webcam feed       
  setTimeout(updateWebCam1, TIMEOUT_WEBCAM);
  setTimeout(updateWebCam2, TIMEOUT_WEBCAM);
  //setTimeout(updateTrack, TIMEOUT_TRACK); // TODO
  
});

function playPause(eventObject) {
  
  switch (state)
  {
    case STATES.STATE_STOPED:
      if (DEBUG)
        console.info("playPau: play");
      if(player != null)
        player.jPlayer("play");
      break;
    
    case STATES.STATE_PAUSED:
      if (DEBUG)
        console.info("playPau: play");
      if(player != null)
        player.jPlayer("play");
      break;
    
    case STATES.STATE_PLAYING:
      if (DEBUG)
        console.info("playPau: pause");
      if(player != null)
        player.jPlayer("stop");
      break;
    
    default:
      if (DEBUG)
        console.info("playPause: Unknown !");
      break;
  }
}

var lastUid = 1;

function updateTrack() {
  if (DEBUG)
    console.info("updateTrack:");
  // view-source:http://live.freshair.org.uk:3066/7.html
  jQuery.ajax(
    {
      url: "http://freshair.org.uk/dev/live.php?action=track",
      dataType: "json",
      success: function (data)
      {
        if (DEBUG)
          console.info("updateTrack: " + data.status);
        
        if(data.status != "ok")
            return;
        
        if(data.uid == lastUid) {
          
          trackCount++;
          
          if( trackCount % 2 == 0){
            classN = "even";
          } else {
            classN = "odd";
          }
          
          dom = $("<div class=\"trackInfo "+classN+"\">" + data.data.track + "</div>").hide();
          $("#track").prepend(dom)
          dom.slideDown("slow");
          lastUid = data.uid;
          $("#track div:last").slideUp("slow", function () { $(this).remove() } );
          
          $("#now").css("visibility", "visible");
          $("#next").css("visibility", "visible");
          $("#now a").html(data.data.now.showName).attr("href", data.data.now.url);
          $("#next a").html(data.data.next.showName).attr("href", data.data.next.url);
        }
      },
      complete: function ()
      {
        setTimeout(updateTrack, TIMEOUT_TRACK);
      }
    }
  );
}

function updateWebCam1() {
  updateWebCamx(1);
  setTimeout(updateWebCam1, TIMEOUT_WEBCAM);
}

function updateWebCam2() {
  updateWebCamx(2);
  setTimeout(updateWebCam2, TIMEOUT_WEBCAM);
}

function updateWebCamx(camNum) {
  if (DEBUG)
    console.info("updateWebCam: " + camNum);
  
  // <img id="throbber1" class="throbber" src="throbber.gif" alt="load icon" />
  //$("#throbber" + camNum).css("display", "inline");
  //console.info("throbber1: on");
  
  // <img id="webcam1" src="http://www.freshair.org.uk/webcam/Webcam01.jpg" alt="Webcam image" width="132" height="99" /\>
  //var newImage = $("<img />");
  //newImage.attr("id", "webcam" + camNum + "ToBe");
  //newImage.attr("alt", "Webcam image");
  //newImage.attr("width", 132);
  //newImage.attr("height", 99);
  //newImage.css("display", "none");
  
  //newImage.load = function() {
  //  $("#throbber" + camNum).css("display", "none");
  //  console.info("throbber: " + camNum + "off");
  //  $("webcam" + camNum).remove()
  //  $("webcam" + camNum + "ToBe").css("display", "inline");
  //  //$("webcam1ToBe").attr('id', 'webcam1');
  //  setTimeout(updateWebCam1, TIMEOUT);
  //};
  
  d = new Date();
  //newImage.attr("src", "http://www.freshair.org.uk/webcam/Webcam0" + camNum + ".jpg?"+d.getTime());
  $("#webcam" + camNum).attr("src", "http://www.freshair.org.uk/webcam/Webcam0" + camNum + ".jpg?"+d.getTime());
  
  //$("#webcam" + camNum).after(newImage);
}

