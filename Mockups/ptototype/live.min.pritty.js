/*

 @author Guy Taylor (http://www.thebiggerguy.com)
 @version 0.5
 @updated 11-JUL-2011
 @created 08-JUL-2011
 Images and Design Copyright Richard Hanrahan 2011

 Copyright (c) 2011 Guy Taylor (http://www.thebiggerguy.com)
 Dual licensed under the MIT and GPL licenses.
 - http://www.opensource.org/licenses/mit-license.php
 - http://www.gnu.org/copyleft/gpl.html
 ---
 Includes jquery.pulse.js (version 0.1 16-DEC-09)
 https://github.com/jamespadolsey/jQuery-Plugins/tree/master/pulse
 Copyright (c) 210 James Padolsey (http://james.padolsey.com)
 Dual licensed under the MIT and GPL licenses.
 - http://www.opensource.org/licenses/mit-license.php
 - http://www.gnu.org/copyleft/gpl.html
 ---
 Includes jquery.jplayer.js (version 2.0.0 20-DEC-10)
 http://www.happyworm.com/jquery/jplayer
 Copyright (c) 2009 - 2010 Happyworm Ltd
 Dual licensed under the MIT and GPL licenses.
 - http://www.opensource.org/licenses/mit-license.php
 - http://www.gnu.org/copyleft/gpl.html
 ---
*/
function l() {
  return function() {
  }
}
var m = ["playbutton.png", "pausebutton.png", "throbber.gif"];
window.console || (console = {});
console.log = console.log || l();
console.warn = console.warn || l();
console.error = console.error || l();
console.info = console.info || l();
var n = 1, o = 2, p = 4, q = 0, r = null;
$(function() {
  console.info("$(document).ready()");
  $("#header-control img").hover(function() {
    $(this).stop();
    $(this).Ka({opacity:[0.5, 1]}, {duration:500, ea:999999, easing:"swing"})
  }, function() {
    $(this).stop();
    $(this).Ka({opacity:[1, 0.5]}, {duration:2E3, ea:999999, easing:"swing"})
  }).trigger("mouseleave");
  $(".footer-item").hover(function() {
    $(this).parent().animate({height:25, easing:"swing"})
  }, function() {
    $(this).parent().animate({height:20, easing:"swing"})
  });
  $("#header-control img").bind("click", s);
  for(var b in m) {
    (new Image).src = m[b]
  }
  $("#radio").a({ready:function() {
    console.info("jPlayer: Ready");
    r = $(this).a("setMedia", {jb:"http://live.freshair.org.uk:3066/;"});
    q = n;
    s()
  }, da:"http://www.freshair.org.uk/dev/", sa:"mp3", error:function() {
    console.info("jPlayer: error");
    $("#control").html("Error !")
  }, play:function() {
    console.info("jPlayer: play");
    q = STATE_PLAYING;
    $("#header-control img").attr("src", "pausebutton.png").attr("alt", "pause");
    $("#header-control").attr("title", "pause")
  }, pause:function() {
    console.info("jPlayer: pause");
    q = STATE_STOPED;
    $("#header-control img").attr("src", "playbutton.png").attr("alt", "play");
    $("#header-control").attr("title", "play")
  }, Ia:function() {
    console.info("jPlayer: pauseplaying");
    q = STATE_PLAYING;
    $("#header-control img").attr("src", "pausebutton.png").attr("alt", "pause");
    $("#header-control").attr("title", "pause")
  }, backgroundColor:"#EA6A11", oa:!1, Ab:!1, R:"html, flash"});
  setTimeout(t, 1E4);
  setTimeout(v, 1E4)
});
function s() {
  switch(q) {
    case n:
      console.info("playPau: play");
      r != null && r.a("play");
      break;
    case o:
      console.info("playPau: play");
      r != null && r.a("play");
      break;
    case p:
      console.info("playPau: pause");
      r != null && r.a("stop");
      break;
    default:
      console.info("playPause: Unknown !")
  }
}
function t() {
  w(1);
  setTimeout(t, 1E4)
}
function v() {
  w(2);
  setTimeout(v, 1E4)
}
function w(b) {
  console.info("updateWebCam: " + b);
  d = new Date;
  $("#webcam" + b).attr("src", "http://www.freshair.org.uk/webcam/Webcam0" + b + ".jpg?" + d.getTime())
}
;jQuery.fn.Ka = function(b, g) {
  var k, a, e;
  isNaN(k) && (e = a, a = k, k = 1);
  var c = jQuery.speed(g, a, e);
  a = c.queue !== !1;
  var f = 0, i;
  for(i in b) {
    f = Math.max(b[i].length, f)
  }
  c.ea = c.ea || k;
  this[a ? "queue" : "each"](function() {
    function a() {
      var u = {}, k = !1, j;
      for(j in b) {
        e[j] = e[j] || {Ma:0, cur:-1}, e[j].cur < b[j].length - 1 ? ++e[j].cur : (e[j].cur = 0, ++e[j].Ma), b[j].length === f && (k = i.ea > e[j].Ma), u[j] = b[j][e[j].cur]
      }
      i.complete = a;
      i.queue = !1;
      k ? g.animate(u, i) : c.complete.call(g[0])
    }
    var e = {}, i = jQuery.extend({}, c), g = jQuery(this);
    a()
  })
};
(function(b, g) {
  b.fn.a = function(a) {
    var e = typeof a === "string", c = Array.prototype.slice.call(arguments, 1), f = this, a = !e && c.length ? b.extend.apply(null, [!0, a].concat(c)) : a;
    if(e && a.charAt(0) === "_") {
      return f
    }
    e ? this.each(function() {
      var e = b.data(this, "jPlayer"), h = e && b.isFunction(e[a]) ? e[a].apply(e, c) : e;
      if(h !== e && h !== g) {
        return f = h, !1
      }
    }) : this.each(function() {
      var c = b.data(this, "jPlayer");
      c ? (c.option(a || {}).Da(), c.option(a || {})) : b.data(this, "jPlayer", new b.a(a, this))
    });
    return f
  };
  b.a = function(a, e) {
    if(arguments.length) {
      this.element = b(e);
      this.options = b.extend(!0, {}, this.options, a);
      var c = this;
      this.element.bind("remove.jPlayer", function() {
        c.gb()
      });
      this.Da()
    }
  };
  b.a.event = {ready:"jPlayer_ready", La:"jPlayer_resize", error:"jPlayer_error", v:"jPlayer_warning", Mb:"jPlayer_loadstart", pb:"jPlayer_progress", xb:"jPlayer_suspend", abort:"jPlayer_abort", Cb:"jPlayer_emptied", Sb:"jPlayer_stalled", play:"jPlayer_play", pause:"jPlayer_pause", Lb:"jPlayer_loadedmetadata", Kb:"jPlayer_loadeddata", zb:"jPlayer_waiting", Ia:"jPlayer_playing", cb:"jPlayer_canplay", Bb:"jPlayer_canplaythrough", seeking:"jPlayer_seeking", qb:"jPlayer_seeked", yb:"jPlayer_timeupdate", 
  ended:"jPlayer_ended", Rb:"jPlayer_ratechange", hb:"jPlayer_durationchange", va:"jPlayer_volumechange"};
  b.a.ib = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplaythrough", "ratechange"];
  b.a.pause = function() {
    b.each(b.a.prototype.qa, function(a, b) {
      b.data("jPlayer").status.s && b.a("pause")
    })
  };
  b.a.n = {ub:!1, vb:!0, wb:!0, mb:!1, nb:!0, ob:!0, rb:":", sb:":", tb:""};
  b.a.Fa = function(a) {
    var a = new Date(a * 1E3), e = a.getUTCHours(), c = a.getUTCMinutes(), a = a.getUTCSeconds(), e = b.a.n.mb && e < 10 ? "0" + e : e, c = b.a.n.nb && c < 10 ? "0" + c : c, a = b.a.n.ob && a < 10 ? "0" + a : a;
    return(b.a.n.ub ? e + b.a.n.rb : "") + (b.a.n.vb ? c + b.a.n.sb : "") + (b.a.n.wb ? a + b.a.n.tb : "")
  };
  b.a.uaMatch = function(a) {
    var a = a.toLowerCase(), b = /(opera)(?:.*version)?[ \/]([\w.]+)/, c = /(msie) ([\w.]+)/, f = /(mozilla)(?:.*? rv:([\w.]+))?/, a = /(webkit)[ \/]([\w.]+)/.exec(a) || b.exec(a) || c.exec(a) || a.indexOf("compatible") < 0 && f.exec(a) || [];
    return{browser:a[1] || "", version:a[2] || "0"}
  };
  b.a.browser = {};
  var k = b.a.uaMatch(navigator.userAgent);
  if(k.browser) {
    b.a.browser[k.browser] = !0, b.a.browser.version = k.version
  }
  b.a.prototype = {count:0, version:{script:"2.0.0", lb:"2.0.0", d:"unknown"}, options:{da:"js", R:"html, flash", sa:"mp3", Ja:"metadata", volume:0.8, muted:!1, backgroundColor:"#000000", eb:"#jp_interface_1", Z:{o:".jp-video-play", play:".jp-play", pause:".jp-pause", stop:".jp-stop", m:".jp-seek-bar", ra:".jp-play-bar", ca:".jp-mute", fa:".jp-unmute", T:".jp-volume-bar", ua:".jp-volume-bar-value", currentTime:".jp-current-time", duration:".jp-duration"}, Q:"jp", oa:!1, Ab:!1}, qa:{}, status:{src:"", 
  media:{}, paused:!0, r:{}, Jb:"", D:!0, g:!0, s:!1, f:!1, Na:0, Ga:0, fb:0, currentTime:0, duration:0}, $a:{volume:g, muted:!1, width:0, height:0}, c:{ready:!1, pa:g, P:g}, R:{html:!0, d:!0}, r:{jb:{p:'audio/mpeg; codecs="mp3"', q:!0, media:"audio"}, Nb:{p:'audio/mp4; codecs="mp4a.40.2"', q:!0, media:"audio"}, Pb:{p:'audio/ogg; codecs="vorbis"', q:!1, media:"audio"}, Tb:{p:'audio/wav; codecs="1"', q:!1, media:"audio"}, Ub:{p:'audio/webm; codecs="vorbis"', q:!1, media:"audio"}, Ob:{p:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', 
  q:!0, media:"video"}, Qb:{p:'video/ogg; codecs="theora, vorbis"', q:!1, media:"video"}, Vb:{p:'video/webm; codecs="vorbis, vp8"', q:!1, media:"video"}}, Da:function() {
    var a = this;
    this.element.empty();
    this.status = b.extend({}, this.status, this.$a);
    this.c = b.extend({}, this.c);
    this.t = [];
    this.S = [];
    this.u = {};
    this.e = {};
    this.html = {};
    this.html.h = {};
    this.html.f = {};
    this.d = {};
    this.css = {};
    this.css.na = {};
    this.css.b = {};
    this.status.volume = this.la(this.options.volume, 0, 1);
    this.status.muted = this.options.muted;
    this.status.width = this.element.css("width");
    this.status.height = this.element.css("height");
    this.element.css({"background-color":this.options.backgroundColor});
    b.each(this.options.sa.toLowerCase().split(","), function(c, e) {
      var f = e.replace(/^\s+|\s+$/g, "");
      if(a.r[f]) {
        var g = !1;
        b.each(a.t, function(a, b) {
          if(f === b) {
            return g = !0, !1
          }
        });
        g || a.t.push(f)
      }
    });
    b.each(this.options.R.toLowerCase().split(","), function(c, e) {
      var f = e.replace(/^\s+|\s+$/g, "");
      if(a.R[f]) {
        var g = !1;
        b.each(a.S, function(a, b) {
          if(f === b) {
            return g = !0, !1
          }
        });
        g || a.S.push(f)
      }
    });
    this.c.pa = "jp_" + this.count;
    this.qa[this.c.pa] = this.element;
    this.element.attr("id") === "" && this.element.attr("id", this.options.Q + "_jplayer_" + this.count);
    this.c.self = b.extend({}, {id:this.element.attr("id"), b:this.element});
    this.c.h = b.extend({}, {id:this.options.Q + "_audio_" + this.count, b:g});
    this.c.f = b.extend({}, {id:this.options.Q + "_video_" + this.count, b:g});
    this.c.d = b.extend({}, {id:this.options.Q + "_flash_" + this.count, b:g, ta:this.options.da + (this.options.da !== "" && this.options.da.slice(-1) !== "/" ? "/" : "") + "Jplayer.swf"});
    this.c.poster = b.extend({}, {id:this.options.Q + "_poster_" + this.count, b:g});
    b.each(b.a.event, function(b, c) {
      a.options[b] !== g && (a.element.bind(c + ".jPlayer", a.options[b]), a.options[b] = g)
    });
    this.e.poster = document.createElement("img");
    this.e.poster.id = this.c.poster.id;
    this.e.poster.onload = function() {
      (!a.status.f || a.status.D) && a.c.poster.b.show()
    };
    this.element.append(this.e.poster);
    this.c.poster.b = b("#" + this.c.poster.id);
    this.c.poster.b.css({width:this.status.width, height:this.status.height});
    this.c.poster.b.hide();
    this.u.h = !1;
    this.u.f = !1;
    b.each(this.t, function(b, c) {
      a.u[a.r[c].media] = !0
    });
    this.html.h.l = !1;
    if(this.u.h) {
      this.e.h = document.createElement("audio"), this.e.h.id = this.c.h.id, this.html.h.l = !!this.e.h.canPlayType
    }
    this.html.f.l = !1;
    if(this.u.f) {
      this.e.f = document.createElement("video"), this.e.f.id = this.c.f.id, this.html.f.l = !!this.e.f.canPlayType
    }
    this.d.l = this.Oa(10);
    this.html.C = {};
    this.d.C = {};
    b.each(this.t, function(b, c) {
      a.html.C[c] = a.html[a.r[c].media].l && "" !== a.e[a.r[c].media].canPlayType(a.r[c].p);
      a.d.C[c] = a.r[c].q && a.d.l
    });
    this.html.O = !1;
    this.d.O = !1;
    b.each(this.S, function(c, e) {
      if(c === 0) {
        a[e].O = !0
      }else {
        var f = !1, g = !1;
        b.each(a.t, function(b, c) {
          a[a.S[0]].C[c] && (a.r[c].media === "video" ? g = !0 : f = !0)
        });
        a[e].O = a.u.h && !f || a.u.f && !g
      }
    });
    this.html.support = {};
    this.d.support = {};
    b.each(this.t, function(b, c) {
      a.html.support[c] = a.html.C[c] && a.html.O;
      a.d.support[c] = a.d.C[c] && a.d.O
    });
    this.html.k = !1;
    this.d.k = !1;
    b.each(this.S, function(c, e) {
      b.each(a.t, function(b, c) {
        if(a[e].support[c]) {
          return a[e].k = !0, !1
        }
      })
    });
    !this.html.k && !this.d.k && this.U({type:b.a.error.J, context:"{solution:'" + this.options.R + "', supplied:'" + this.options.sa + "'}", message:b.a.ba.J, hint:b.a.aa.J});
    this.html.active = !1;
    this.html.h.j = !1;
    this.html.f.j = !1;
    this.d.active = !1;
    this.d.j = !1;
    if(this.d.k) {
      var e = "id=" + escape(this.c.self.id) + "&vol=" + this.status.volume + "&muted=" + this.status.muted;
      if(b.browser.kb && Number(b.browser.version) <= 8) {
        var c = '<object id="' + this.c.d.id + '"';
        c += ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"';
        c += ' codebase="' + document.URL.substring(0, document.URL.indexOf(":")) + '://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"';
        c += ' type="application/x-shockwave-flash"';
        c += ' width="0" height="0">';
        c += "</object>";
        var f = [];
        f[0] = '<param name="movie" value="' + this.c.d.ta + '" />';
        f[1] = '<param name="quality" value="high" />';
        f[2] = '<param name="FlashVars" value="' + e + '" />';
        f[3] = '<param name="allowScriptAccess" value="always" />';
        f[4] = '<param name="bgcolor" value="' + this.options.backgroundColor + '" />';
        e = document.createElement(c);
        for(c = 0;c < f.length;c++) {
          e.appendChild(document.createElement(f[c]))
        }
        this.element.append(e)
      }else {
        f = '<embed name="' + this.c.d.id + '" id="' + this.c.d.id + '" src="' + this.c.d.ta + '"', f += ' width="0" height="0" bgcolor="' + this.options.backgroundColor + '"', f += ' quality="high" FlashVars="' + e + '"', f += ' allowScriptAccess="always"', f += ' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />', this.element.append(f)
      }
      this.c.d.b = b("#" + this.c.d.id);
      this.c.d.b.css({width:"0px", height:"0px"})
    }
    if(this.html.k) {
      if(this.html.h.l) {
        this.xa(this.e.h, this.html.h), this.element.append(this.e.h), this.c.h.b = b("#" + this.c.h.id)
      }
      if(this.html.f.l) {
        this.xa(this.e.f, this.html.f), this.element.append(this.e.f), this.c.f.b = b("#" + this.c.f.id), this.c.f.b.css({width:"0px", height:"0px"})
      }
    }
    this.html.k && !this.d.k && window.setTimeout(function() {
      a.c.ready = !0;
      a.version.d = "n/a";
      a.i(b.a.event.ready)
    }, 100);
    b.each(this.options.Z, function(b, c) {
      a.ia(b, c)
    });
    this.B();
    this.A(!1);
    this.X(this.status.volume);
    this.ma(this.status.muted);
    this.css.b.o.length && this.css.b.o.hide();
    b.a.prototype.count++
  }, gb:function() {
    this.Wa();
    this.B();
    this.M();
    this.css.b.currentTime.length && this.css.b.currentTime.text("");
    this.css.b.duration.length && this.css.b.duration.text("");
    this.status.s && this.pause();
    b.each(this.css.b, function(a, b) {
      b.unbind(".jPlayer")
    });
    this.element.removeData("jPlayer");
    this.element.unbind(".jPlayer");
    this.element.empty();
    this.qa[this.c.pa] = g
  }, xa:function(a, e) {
    var c = this;
    a.Ja = this.options.Ja;
    a.muted = this.options.muted;
    a.addEventListener("progress", function() {
      e.j && !c.status.g && (c.V(a), c.B(), c.i(b.a.event.pb))
    }, !1);
    a.addEventListener("timeupdate", function() {
      e.j && !c.status.g && (c.V(a), c.B(), c.i(b.a.event.yb))
    }, !1);
    a.addEventListener("durationchange", function() {
      if(e.j && !c.status.g) {
        c.status.duration = this.duration, c.V(a), c.B(), c.i(b.a.event.hb)
      }
    }, !1);
    a.addEventListener("play", function() {
      e.j && !c.status.g && (c.A(!0), c.i(b.a.event.play))
    }, !1);
    a.addEventListener("playing", function() {
      e.j && !c.status.g && (c.A(!0), c.M(), c.i(b.a.event.Ia))
    }, !1);
    a.addEventListener("pause", function() {
      e.j && !c.status.g && (c.A(!1), c.i(b.a.event.pause))
    }, !1);
    a.addEventListener("waiting", function() {
      e.j && !c.status.g && (c.Ea(), c.i(b.a.event.zb))
    }, !1);
    a.addEventListener("canplay", function() {
      if(e.j && !c.status.g) {
        a.volume = c.bb(c.status.volume), c.i(b.a.event.cb)
      }
    }, !1);
    a.addEventListener("seeking", function() {
      e.j && !c.status.g && (c.Ea(), c.i(b.a.event.seeking))
    }, !1);
    a.addEventListener("seeked", function() {
      e.j && !c.status.g && (c.M(), c.i(b.a.event.qb))
    }, !1);
    a.addEventListener("suspend", function() {
      e.j && !c.status.g && (c.M(), c.i(b.a.event.xb))
    }, !1);
    a.addEventListener("ended", function() {
      if(e.j && !c.status.g) {
        if(!b.a.browser.webkit) {
          c.e.media.currentTime = 0
        }
        c.e.media.pause();
        c.A(!1);
        c.V(a, !0);
        c.B();
        c.i(b.a.event.ended)
      }
    }, !1);
    a.addEventListener("error", function() {
      if(e.j && !c.status.g && (c.A(!1), c.M(), c.status.s)) {
        c.status.g = !0, c.status.D = !0, c.status.f && c.c.f.b.css({width:"0px", height:"0px"}), c.ab(c.status.media.poster) && c.c.poster.b.show(), c.css.b.o.length && c.css.b.o.show(), c.U({type:b.a.error.URL, context:c.status.src, message:b.a.ba.URL, hint:b.a.aa.URL})
      }
    }, !1);
    b.each(b.a.ib, function(f, g) {
      a.addEventListener(this, function() {
        e.j && !c.status.g && c.i(b.a.event[g])
      }, !1)
    })
  }, V:function(a, b) {
    var c = 0, f = 0, g = 0, h = 0, c = a.currentTime, f = this.status.duration > 0 ? 100 * c / this.status.duration : 0;
    typeof a.seekable === "object" && a.seekable.length > 0 ? (g = this.status.duration > 0 ? 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : 100, h = 100 * a.currentTime / a.seekable.end(a.seekable.length - 1)) : (g = 100, h = f);
    b && (f = h = c = 0);
    this.status.Na = g;
    this.status.Ga = h;
    this.status.fb = f;
    this.status.currentTime = c
  }, Wa:function() {
    this.status = b.extend({}, this.status, b.a.prototype.status)
  }, i:function(a, e, c) {
    a = b.Event(a);
    a.a = {};
    a.a.version = b.extend({}, this.version);
    a.a.status = b.extend(!0, {}, this.status);
    a.a.html = b.extend(!0, {}, this.html);
    a.a.d = b.extend(!0, {}, this.d);
    if(e) {
      a.a.error = b.extend({}, e)
    }
    if(c) {
      a.a.v = b.extend({}, c)
    }
    this.element.trigger(a)
  }, A:function(a) {
    this.status.paused = !a;
    this.css.b.play.length && this.css.b.pause.length && (a ? (this.css.b.play.hide(), this.css.b.pause.show()) : (this.css.b.play.show(), this.css.b.pause.hide()))
  }, B:function() {
    this.css.b.m.length && this.css.b.m.width(this.status.Na + "%");
    this.css.b.ra.length && this.css.b.ra.width(this.status.Ga + "%");
    this.css.b.currentTime.length && this.css.b.currentTime.text(b.a.Fa(this.status.currentTime));
    this.css.b.duration.length && this.css.b.duration.text(b.a.Fa(this.status.duration))
  }, Ea:function() {
    this.css.b.m.length && this.css.b.m.addClass("jp-seeking-bg")
  }, M:function() {
    this.css.b.m.length && this.css.b.m.removeClass("jp-seeking-bg")
  }, load:function() {
    this.status.s ? this.html.active ? this.W() : this.d.active && this.Pa() : this.N("load")
  }, play:function(a) {
    a = typeof a === "number" ? a : NaN;
    this.status.s ? this.html.active ? this.Ta(a) : this.d.active && this.Qa(a) : this.N("play")
  }, o:function() {
    this.play()
  }, pause:function(a) {
    a = typeof a === "number" ? a : NaN;
    this.status.s ? this.html.active ? this.Ca(a) : this.d.active && this.Aa(a) : this.N("pause")
  }, stop:function() {
    this.status.s ? this.html.active ? this.Ca(0) : this.d.active && this.Aa(0) : this.N("stop")
  }, Ha:function(a) {
    a = this.la(a, 0, 100);
    this.status.s ? this.html.active ? this.Ua(a) : this.d.active && this.Ra(a) : this.N("playHead")
  }, ca:function() {
    this.status.muted = !0;
    this.html.k && this.Ba(!0);
    this.d.k && this.za(!0);
    this.ma(!0);
    this.X(0);
    this.i(b.a.event.va)
  }, fa:function() {
    this.status.muted = !1;
    this.html.k && this.Ba(!1);
    this.d.k && this.za(!1);
    this.ma(!1);
    this.X(this.status.volume);
    this.i(b.a.event.va)
  }, ma:function(a) {
    this.css.b.ca.length && this.css.b.fa.length && (a ? (this.css.b.ca.hide(), this.css.b.fa.show()) : (this.css.b.ca.show(), this.css.b.fa.hide()))
  }, volume:function(a) {
    a = this.la(a, 0, 1);
    this.status.volume = a;
    this.html.k && this.Va(a);
    this.d.k && this.Sa(a);
    this.status.muted || this.X(a);
    this.i(b.a.event.va)
  }, T:function(a) {
    if(!this.status.muted && this.css.b.T) {
      var b = this.css.b.T.offset(), a = a.pageX - b.left, b = this.css.b.T.width();
      this.volume(a / b)
    }
  }, ua:function(a) {
    this.T(a)
  }, X:function(a) {
    this.css.b.ua.length && this.css.b.ua.width(a * 100 + "%")
  }, bb:function(a) {
    var b = 0.001 * Math.random();
    return a + (a < 0.5 ? b : -b)
  }, ia:function(a, e) {
    var c = this;
    typeof e === "string" ? b.a.prototype.options.Z[a] ? (this.css.b[a] && this.css.b[a].length && this.css.b[a].unbind(".jPlayer"), this.options.Z[a] = e, this.css.na[a] = this.options.eb + " " + e, this.css.b[a] = e ? b(this.css.na[a]) : [], this.css.b[a].length && this.css.b[a].bind("click.jPlayer", function(e) {
      c[a](e);
      b(this).blur();
      return!1
    }), e && this.css.b[a].length !== 1 && this.Y({type:b.a.v.F, context:this.css.na[a], message:b.a.ha.F + this.css.b[a].length + " found for " + a + " method.", hint:b.a.ga.F})) : this.Y({type:b.a.v.G, context:a, message:b.a.ha.G, hint:b.a.ga.G}) : this.Y({type:b.a.v.H, context:e, message:b.a.ha.H, hint:b.a.ga.H})
  }, m:function(a) {
    if(this.css.b.m) {
      var b = this.css.b.m.offset(), a = a.pageX - b.left, b = this.css.b.m.width();
      this.Ha(100 * a / b)
    }
  }, ra:function(a) {
    this.m(a)
  }, currentTime:l(), duration:l(), option:function(a, e) {
    var c = a;
    if(arguments.length === 0) {
      return b.extend(!0, {}, this.options)
    }
    if(typeof a === "string") {
      var f = a.split(".");
      if(e === g) {
        for(var i = b.extend(!0, {}, this.options), h = 0;h < f.length;h++) {
          if(i[f[h]] !== g) {
            i = i[f[h]]
          }else {
            return this.Y({type:b.a.v.K, context:a, message:b.a.ha.K, hint:b.a.ga.K}), g
          }
        }
        return i
      }
      i = c = {};
      for(h = 0;h < f.length;h++) {
        h < f.length - 1 ? (i[f[h]] = {}, i = i[f[h]]) : i[f[h]] = e
      }
    }
    this.Za(c);
    return this
  }, Za:function(a) {
    var e = this;
    b.each(a, function(a, b) {
      e.Ya(a, b)
    });
    return this
  }, Ya:function(a, e) {
    var c = this;
    switch(a) {
      case "cssSelectorAncestor":
        this.options[a] = e;
        b.each(c.options.Z, function(a, b) {
          c.ia(a, b)
        });
        break;
      case "cssSelector":
        b.each(e, function(a, b) {
          c.ia(a, b)
        })
    }
    return this
  }, La:function(a) {
    this.d.active && this.Xa(a);
    this.i(b.a.event.La)
  }, Xa:function(a) {
    this.c.d.b.css({width:a.width, height:a.height})
  }, W:function() {
    if(this.status.g) {
      this.status.g = !1;
      this.e.media.src = this.status.src;
      try {
        this.e.media.load()
      }catch(a) {
      }
    }
    clearTimeout(this.c.P)
  }, Ta:function(a) {
    var b = this;
    this.W();
    this.e.media.play();
    if(!isNaN(a)) {
      try {
        this.e.media.currentTime = a
      }catch(c) {
        this.c.P = setTimeout(function() {
          b.play(a)
        }, 100);
        return
      }
    }
    this.ka()
  }, Ca:function(a) {
    var b = this;
    a > 0 ? this.W() : clearTimeout(this.c.P);
    this.e.media.pause();
    if(!isNaN(a)) {
      try {
        this.e.media.currentTime = a
      }catch(c) {
        this.c.P = setTimeout(function() {
          b.pause(a)
        }, 100);
        return
      }
    }
    a > 0 && this.ka()
  }, Ua:function(a) {
    var b = this;
    this.W();
    try {
      if(typeof this.e.media.seekable === "object" && this.e.media.seekable.length > 0) {
        this.e.media.currentTime = a * this.e.media.seekable.end(this.e.media.seekable.length - 1) / 100
      }else {
        if(this.e.media.duration > 0 && !isNaN(this.e.media.duration)) {
          this.e.media.currentTime = a * this.e.media.duration / 100
        }else {
          throw"e";
        }
      }
    }catch(c) {
      this.c.P = setTimeout(function() {
        b.Ha(a)
      }, 100);
      return
    }
    this.status.g || this.ka()
  }, ka:function() {
    if(this.status.D) {
      this.status.D = !1, this.css.b.o.length && this.css.b.o.hide(), this.status.f && (this.c.poster.b.hide(), this.c.f.b.css({width:this.status.width, height:this.status.height}))
    }
  }, Va:function(a) {
    if(this.html.h.l) {
      this.e.h.volume = a
    }
    if(this.html.f.l) {
      this.e.f.volume = a
    }
  }, Ba:function(a) {
    if(this.html.h.l) {
      this.e.h.muted = a
    }
    if(this.html.f.l) {
      this.e.f.muted = a
    }
  }, Pa:function() {
    try {
      this.z().Db()
    }catch(a) {
      this.w(a)
    }
    this.status.g = !1
  }, Qa:function(a) {
    try {
      this.z().Gb(a)
    }catch(b) {
      this.w(b)
    }
    this.status.g = !1;
    this.ja()
  }, Aa:function(a) {
    try {
      this.z().Fb(a)
    }catch(b) {
      this.w(b)
    }
    if(a > 0) {
      this.status.g = !1, this.ja()
    }
  }, Ra:function(a) {
    try {
      this.z().Hb(a)
    }catch(b) {
      this.w(b)
    }
    this.status.g || this.ja()
  }, ja:function() {
    if(this.status.D) {
      this.status.D = !1, this.css.b.o.length && this.css.b.o.hide(), this.status.f && (this.c.poster.b.hide(), this.c.d.b.css({width:this.status.width, height:this.status.height}))
    }
  }, Sa:function(a) {
    try {
      this.z().Ib(a)
    }catch(b) {
      this.w(b)
    }
  }, za:function(a) {
    try {
      this.z().Eb(a)
    }catch(b) {
      this.w(b)
    }
  }, z:function() {
    return document[this.c.d.id]
  }, Oa:function(a) {
    var e = !1, c;
    if(window.ActiveXObject) {
      try {
        new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + a), e = !0
      }catch(f) {
      }
    }else {
      navigator.plugins && navigator.mimeTypes.length > 0 && (c = navigator.plugins["Shockwave Flash"]) && navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1") >= a && (e = !0)
    }
    return b.browser.kb && Number(b.browser.version) >= 9 ? !1 : e
  }, ab:function(a) {
    return a && typeof a === "string"
  }, la:function(a, b, c) {
    return a < b ? b : a > c ? c : a
  }, N:function(a) {
    this.U({type:b.a.error.L, context:a, message:b.a.ba.L, hint:b.a.aa.L})
  }, w:function(a) {
    this.U({type:b.a.error.I, context:this.c.d.ta, message:b.a.ba.I + a.message, hint:b.a.aa.I})
  }, U:function(a) {
    this.i(b.a.event.error, a);
    this.options.oa && this.ya("Error!" + (a.message ? "\n\n" + a.message : "") + (a.hint ? "\n\n" + a.hint : "") + "\n\nContext: " + a.context)
  }, Y:function(a) {
    this.i(b.a.event.v, g, a);
    this.options.oa && this.ya("Warning!" + (a.message ? "\n\n" + a.message : "") + (a.hint ? "\n\n" + a.hint : "") + "\n\nContext: " + a.context)
  }, ya:function(a) {
    alert("jPlayer " + this.version.script + " : id='" + this.c.self.id + "' : " + a)
  }};
  b.a.error = {I:"e_flash", J:"e_no_solution", wa:"e_no_support", URL:"e_url", L:"e_url_not_set", VERSION:"e_version"};
  b.a.ba = {I:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ", J:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.", wa:"It is not possible to play any media format provided in setMedia() on this browser using your current options.", URL:"Media URL could not be loaded.", L:"Attempt to issue media playback commands, while no media url is set.", VERSION:"jPlayer " + b.a.prototype.version.script + 
  " needs Jplayer.swf version " + b.a.prototype.version.lb + " but found "};
  b.a.aa = {I:"Check your swfPath option and that Jplayer.swf is there.", J:"Review the jPlayer options: support and supplied.", wa:"Video or audio formats defined in the supplied option are missing.", URL:"Check media URL is valid.", L:"Use setMedia() to set the media URL.", VERSION:"Update jPlayer files."};
  b.a.v = {F:"e_css_selector_count", G:"e_css_selector_method", H:"e_css_selector_string", K:"e_option_key"};
  b.a.ha = {F:"The number of methodCssSelectors found did not equal one: ", G:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.", H:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.", K:"The option requested in jPlayer('option') is undefined."};
  b.a.ga = {F:"Check your css selector and the ancestor.", G:"Check your method name.", H:"Check your css selector is a string.", K:"Check your option name."}
})(jQuery);

