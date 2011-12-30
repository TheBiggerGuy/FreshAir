#!/bin/bash

#jquery-1.6.2.js
#jquery.jplayer.js
#jquery.pulse.js

YUI_COMPRESSOR="lib/YUI_Compressor/yuicompressor-2.4.8pre.jar"

CLOSURE_COMPILER="lib/Closure_Compiler/compiler.jar"

COMPILER_LEVEL="SIMPLE_OPTIMIZATIONS"
#COMPILER_LEVEL="ADVANCED_OPTIMIZATIONS"

COMPILER_SUMMARY=1

rm -rf build
mkdir build

gjslint --strict --custom_jsdoc_tags="version,updated,created" src/live.js

java -jar $CLOSURE_COMPILER \
  --compilation_level=$COMPILER_LEVEL \
  --summary_detail_level=$COMPILER_SUMMARY \
  --language_in=ECMASCRIPT5_STRICT \
  --js src/live.js \
  --js lib/jQuery.pulse/jquery.pulse.js \
  --js lib/jPlayer/jquery.jplayer.min.js \
  --externs lib/Closure_Compiler/jquery-1.7.js \
  --externs lib/Closure_Compiler/webkit_console.js \
  --js_output_file build/live.min.js \
  --define DEBUG

cat src/live.css | java -jar $YUI_COMPRESSOR --type=css -o build/live.min.css

cp src/*.php build
cp src/freshair_events.php src/freshair_shows.php src/freshair_nownext.php build
cp src/htaccess build/.htaccess
cp lib/jQuery/jquery-1.7.1.min.js build
cp lib/jPlayer/Jplayer.swf build

cp assets/live.m3u assets/throbber.gif assets/playbutton.png assets/pausebutton.png assets/header-player.png build

scp build/* freshair.web:/home/freshair/public_html/radio.freshair.org.uk/
scp build/.htaccess freshair.web:/home/freshair/public_html/radio.freshair.org.uk/.htaccess

#java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS --js ../live.js --js jquery.pulse.js --js jquery.jplayer.js --js jquery-1.6.2.js --js_output_file  ../live.jquery.min.js

#java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS  --formatting PRETTY_PRINT --js ../live.js --js jquery.pulse.js --js jquery.jplayer.js --externs jquery.min.js --js_output_file  ../live.min.pritty.js

