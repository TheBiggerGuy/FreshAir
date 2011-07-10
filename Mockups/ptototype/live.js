TIMEOUT = 10*1000

// stop errors for browsers that have no debug console
if (!window.console) console = {};
console.log = console.log || function(){};
console.warn = console.warn || function(){};
console.error = console.error || function(){};
console.info = console.info || function(){};

STATE_EMPTY   = 0;
STATE_STOPED  = 1;
STATE_PAUSED  = 2;
STATE_PLAYING = 3;

var state = STATE_EMPTY;
var player = null;

var trackCount = 0;

$(function() { // executed when $(document).ready()
  
  console.info("$(document).ready()");
  
  // start audio
  $("#radio").jPlayer(
    {
      ready: function ()
      {
        console.info("jPlayer: Ready");
        player = $(this).jPlayer("setMedia",
          {
            mp3: "http://live.freshair.org.uk:3066/;"
          }
        );
        state = STATE_STOPED;
        playPause();
      },
      swfPath: "http://www.freshair.org.uk/dev/",
      supplied: "mp3",
      error: function (error)
      {
        console.info("jPlayer: error");
        console.info("jPlayer: " + error);
        $("#control").html("Error !");
      },
      play: function ()
      {
        console.info("jPlayer: play");
        state = STATE_PLAYING;
        $("#control img").attr("src", "pause.svg").attr("alt", "pause");
      },
      pause: function ()
      {
        console.info("jPlayer: pause");
        state = STATE_STOPED;
        $("#control img").attr("src", "play.svg").attr("alt", "play");
      },
      playing: function ()
      {
        console.info("jPlayer: pauseplaying");
        state = STATE_PLAYING;
        $("#control img").attr("src", "pause.svg").attr("alt", "pause");
      },
      backgroundColor: "#782E00",
      errorAlerts: false,
      warningAlerts: false,
      solution: "html, flash"
    }
  );
  
  // start webcam feed       
  setTimeout(updateWebCam1, TIMEOUT);
  setTimeout(updateWebCam2, TIMEOUT);
  setTimeout(updateTrack, 100);
  
  $("#control").bind('click', playPause);
  
  var imgLoad1 = new Image();
  imgLoad1.src = "play.svg";
  var imgLoad2 = new Image();
  imgLoad2.src = "pause.svg";
  
});

function playPause(eventObject) {
  
  switch (state)
  {
    case STATE_STOPED:
      console.info("playPau: play");
      if(player != null)
        player.jPlayer("play");
      break;
    
    case STATE_PAUSED:
      console.info("playPau: play");
      if(player != null)
        player.jPlayer("play");
      break;
    
    case STATE_PLAYING:
      console.info("playPau: pause");
      if(player != null)
        player.jPlayer("stop");
      break;
    
    default:
      console.info("playPause: Unknown !");
      break;
  }
}

var lastUid = 1;

function updateTrack() {
  console.info("updateTrack:");
  // view-source:http://live.freshair.org.uk:3066/7.html
  jQuery.ajax(
    {
      url: "http://freshair.org.uk/dev/live.php?action=track",
      dataType: "json",
      success: function (data)
      {
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
          $("#now a").html(data.data.now.showName);
          $("#next a").html(data.data.next.showName);
          $("#now a").attr("href", data.data.now.url);
          $("#next a").attr("href", data.data.next.url);
        }
      },
      complete: function ()
      {
        setTimeout(updateTrack, TIMEOUT/2);
      }
    }
  );
}

function updateWebCam1() {
  updateWebCamx(1);
  setTimeout(updateWebCam1, TIMEOUT);
}

function updateWebCam2() {
  updateWebCamx(2);
  setTimeout(updateWebCam2, TIMEOUT);
}

function updateWebCamx(camNum) {
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

