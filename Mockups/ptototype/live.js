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

// Adding jplayer will cause an uknow error !!!
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
 * The CSS solector of the hi-fi button
 * @const
 * @type {string}
 */
 var CSS_CHANGE_AUDIO_URL_HIGH = "#footer-hifi";
 /**
 * The CSS solector of the lo-fi button
 * @const
 * @type {string}
 */
 var CSS_CHANGE_AUDIO_URL_LOW = "#footer-lofi";
  /**
 * The CSS solector of the external button
 * @const
 * @type {string}
 */
 var CSS_CHANGE_AUDIO_URL_EXT = "#footer-ext";
 
/**
 * The URL the high quaility audio stream
 * "http://live.freshair.org.uk:3066/;"
 * or
 * "http://radio.home.thebiggerguy.com:8080/freshair-high"
 * @const
 * @type {string}
 */
var AUDIO_URL_HIGH = "http://live.freshair.org.uk:3066/;";
/**
 * The URL the hight quaility audio stream
 * "http://live.freshair.org.uk:3088/;"
 * or
 * "http://radio.home.thebiggerguy.com:8080/freshair-high"
 * @const
 * @type {string}
 */
var AUDIO_URL_LOW  = "http://live.freshair.org.uk:3088/;";
/**
 * The URL the high quaility audio stream playlist
 * @const
 * @type {string}
 */
var AUDIO_URL_HIGH_EXT = "http://live.freshair.org.uk:3066/listen.pls";

/**
 * Max number of chars for now playing song
 * @const
 * @type {number}
 */
var MAX_NOW_PLAYING  = 30;

/**
 * Array of images to preload
 * @const
 */
var IMAGES = [
  "playbutton.png",
  "pausebutton.png",
  "throbber.gif"
];

/**
 * URL to Jplayer.swf. not including the filename
 * @const
 */
var JPLAYER_SWF_URL = "http://www.freshair.org.uk/dev/";

/** @const */ var DEBUG              = true;
/** @const */ var TIMEOUT_WEBCAM     = 7*1000
/** @const */ var TIMEOUT_INFO       = 17*1000 // stager the GETs
/** @const */ var TIMEOUT_INFO_INIT  = 100



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
  EMPTY:   0,
  STOPED:  1,
  PAUSED:  2,
  PLAYING: 4
};

var state = STATES.EMPTY;
var player = null;
var currentAudioURL = AUDIO_URL_HIGH;
var autoPlay = false;

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
  $(CSS_CHANGE_AUDIO_URL_HIGH).bind('click', function ()
  {
    if (currentAudioURL == AUDIO_URL_HIGH && state == STATES.PLAYING)
      return;
    
    destroyPlayer();
    currentAudioURL = AUDIO_URL_HIGH;
    autoPlay = true;
    makePlayer();
  });
  $(CSS_CHANGE_AUDIO_URL_LOW).bind('click', function ()
  {
    if (currentAudioURL == AUDIO_URL_LOW && state == STATES.PLAYING)
      return;
    
    destroyPlayer();
    currentAudioURL = AUDIO_URL_LOW;
    autoPlay = true;
    makePlayer();
  });
  $(CSS_CHANGE_AUDIO_URL_EXT).bind('click', function ()
  {
    destroyPlayer();
    window.location(AUDIO_URL_HIGH_EXT);
  });
  
  // preload images
  for(var i in IMAGES){
    (new Image).src = IMAGES[i];
  }
  
  // start audio
  makePlayer();
  
  // start webcam feed       
  setTimeout(updateWebCam1, TIMEOUT_WEBCAM);
  setTimeout(updateWebCam2, TIMEOUT_WEBCAM);
  setTimeout(updateInfo,    TIMEOUT_INFO_INIT);
  
});

function makePlayer() {
  player = $("#radio").jPlayer(
  {
    ready: function ()
    {
      if (DEBUG)
        console.info("jPlayer: Ready");
      $(this).jPlayer(
      "setMedia",
      {
        mp3: currentAudioURL
      });
      state = STATES.STOPED;
      $(CSS_PLAY_PAUSE_IMG).attr("src", "playbutton.png").attr("alt", "play");
      $(CSS_PLAY_PAUSE_DIV).attr("title", "play");
      if(autoPlay) {
        playPause();
        autoPlay = false;
      }
    },
    swfPath: JPLAYER_SWF_URL,
    supplied: "mp3",
    error: function (error)
    {
      if (DEBUG)
        console.info("jPlayer: error");
      //$(CSS_PLAY_PAUSE_DIV).html("Error !"); // TODO
      $(CSS_PLAY_PAUSE_IMG).attr("src", "throbber.gif").attr("alt", "error");
      $(CSS_PLAY_PAUSE_DIV).attr("title", "error");
      //destroyPlayer();
    },
    play: function ()
    {
      if (DEBUG)
        console.info("jPlayer: play");
      state = STATES.PLAYING;
      $(CSS_PLAY_PAUSE_IMG).attr("src", "pausebutton.png").attr("alt", "pause");
      $(CSS_PLAY_PAUSE_DIV).attr("title", "pause");
    },
    pause: function ()
    {
      if (DEBUG)
        console.info("jPlayer: pause");
      state = STATES.STOPED;
      $(CSS_PLAY_PAUSE_IMG).attr("src", "playbutton.png").attr("alt", "play");
      $(CSS_PLAY_PAUSE_DIV).attr("title", "play");
    },
    playing: function ()
    {
      if (DEBUG)
        console.info("jPlayer: pauseplaying");
      state = STATES.PLAYING;
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
  });
  if (DEBUG)
    console.info("makePlayer: made player");
}

function destroyPlayer() {
  if(player != null) {
    try {
      player.jPlayer("pause");
    } catch (e) {
    }
    try {
      player.jPlayer("setMedia", {mp3: ""}); // try to stop the stream
    } catch (e) {
    }
    try {
      player.jPlayer("destroy");
    } catch (e) {
      if (DEBUG)
        console.info("destroyPlayer: Unable to destroy player !");
    }
  }
  $("#radio").html("");
  player = null;
  state = STATES.EMPTY;
}

function playPause(eventObject) {
  
  if (player == null) {
    makePlayer();
    return;
  }
  
  switch (state)
  {
    case STATES.STOPED:
      if (DEBUG)
        console.info("playPau: play");
      player.jPlayer("play");
      break;
    
    case STATES.PAUSED:
      if (DEBUG)
        console.info("playPau: play");
      player.jPlayer("play");
      break;
    
    case STATES.PLAYING:
      if (DEBUG)
        console.info("playPau: pause");
      player.jPlayer("stop");
      destroyPlayer();
      break;
    
    default:
      if (DEBUG)
        console.info("playPause: Unknown !");
      destroyPlayer()
      makePlayer()
      break;
  }
}

var lastUid = 1;

function updateInfo() {
  if (DEBUG)
    console.info("updateInfo:");
  // view-source:http://live.freshair.org.uk:3066/7.html
  jQuery.ajax(
    {
      url: "http://freshair.org.uk/dev/live.php?action=getinfo",
      dataType: "json",
      success: function (data)
      {
        if (DEBUG)
          console.info("updateInfo: " + data.status);
        
        if(data.status != "ok")
          return;
        
        var json = data.data;
        var now  = json.now;
        var next = json.next;
        
        // preload images as fast as possible
        (new Image).src = now.img;
        (new Image).src = next.img;
        
        if(json.track.length > MAX_NOW_PLAYING)
          json.track = json.track.substring(0, 11) + "...";
        
        $("#nowplaying-title").html(json.track);
        
        $("#header-subheader-title").html(now.title);
        $("#header-subheader-time" ).html(now.onat.long_);
        $("#header-subheader").css("visibility", "visible");
        
        $("#showinfo-des").html(now.des);
        $("#showinfo-img").attr("src", now.img);
        $("#showinfo").css("visibility", "visible");
        
        $("#next-title").html(next.title);
        $("#next-time").html(next.onat.short_);
        $("#next").css("visibility", "visible");
      },
      complete: function ()
      {
        setTimeout(updateInfo, TIMEOUT_INFO);
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

