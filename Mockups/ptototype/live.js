TIMEOUT = 3*1000

// stop errors for browsers that have no debug console
if (!window.console) console = {};
console.log = console.log || function(){};
console.warn = console.warn || function(){};
console.error = console.error || function(){};
console.info = console.info || function(){};

$(function() { // executed when $(document).ready()
  
  // start webcam feed       
  setTimeout(updateWebCam1, TIMEOUT);
  setTimeout(updateWebCam2, TIMEOUT);
  
  // start loading ... dots
  
  // start audio
  $("#radio").jPlayer(
    {
      ready: function ()
      {
        console.info("jPlayer: Ready");
        $(this).jPlayer("setMedia",
          {
            mp3: "http://live.freshair.org.uk:3066/;"
          }
        ).jPlayer("play");
        
        stopa = $(this).append("<a href=\"#\" id=\"stop\">Stop</a>");
        stopa.click( function ()
        {
          $(this).jPlayer("stop");
        });
        
        
        console.info("jPlayer: Play()");
      },
      // swfPath: "http://www.freshair.org.uk/",
      supplied: "mp3"
    }
  );
  
});

function updateTrack() {
  console.info("updateTrack:");
  // view-source:http://live.freshair.org.uk:3066/7.html

}

function updateWebCam1() {
  updateWebCamx(1);
}

function updateWebCam2() {
  updateWebCamx(2);
}

function updateWebCamx(camNum) {
  console.info("updateWebCam: " + camNum);
  
  // <img id="throbber1" class="throbber" src="throbber.gif" alt="load icon" />
  $("#throbber" + camNum).css("display", "inline");
  console.info("throbber1: on");
  
  // <img id="webcam1" src="http://www.freshair.org.uk/webcam/Webcam01.jpg" alt="Webcam image" width="132" height="99" /\>
  var newImage = $("<img />");
  newImage.attr("id", "webcam" + camNum + "ToBe");
  newImage.attr("alt", "Webcam image");
  newImage.attr("width", 132);
  newImage.attr("height", 99);
  newImage.css("display", "none");
  
  newImage.load = function() {
    $("#throbber" + camNum).css("display", "none");
    console.info("throbber: " + camNum + "off");
    $("webcam" + camNum).remove()
    $("webcam" + camNum + "ToBe").css("display", "inline");
    //$("webcam1ToBe").attr('id', 'webcam1');
    setTimeout(updateWebCam1, TIMEOUT);
  };
  
  d = new Date();
  newImage.attr("src", "http://www.freshair.org.uk/webcam/Webcam0" + camNum + ".jpg?"+d.getTime());
  
  $("#webcam" + camNum).after(newImage);
}

