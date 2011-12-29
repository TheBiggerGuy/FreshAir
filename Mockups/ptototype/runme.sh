#!/bin/bash

#jquery-1.6.2.js
#jquery.jplayer.js
#jquery.pulse.js

CLOSURE_COMPILER="lib/Closure_Compiler/compiler.jar"

COMPILER_LEVEL="SIMPLE_OPTIMIZATIONS"
#COMPILER_LEVEL="ADVANCED_OPTIMIZATIONS"

COMPILER_SUMMARY=1

rm -rf build
mkdir build

java -jar $CLOSURE_COMPILER \
  --compilation_level=$COMPILER_LEVEL \
  --summary_detail_level=$COMPILER_SUMMARY \
  --language_in=ECMASCRIPT5_STRICT \
  --js src/live.js \
  --js lib/jQuery.pulse/jquery.pulse.js \
  --js lib/jPlayer/jquery.jplayer.min.js \
  --externs lib/jQuery/jquery-1.7.extern.js \
  --js_output_file build/live.min.js

cp src/index.html src/live.css src/live.php build
cp src/freshair_events.php src/freshair_shows.php src/freshair_nownext.php build
cp lib/jQuery/jquery-1.7.1.min.js build
cp lib/jPlayer/Jplayer.swf build


scp build/* ssh://freshair.web/home/freshair/public_html/radio.freshair.org.uk/

#java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS --js ../live.js --js jquery.pulse.js --js jquery.jplayer.js --js jquery-1.6.2.js --js_output_file  ../live.jquery.min.js

#java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS  --formatting PRETTY_PRINT --js ../live.js --js jquery.pulse.js --js jquery.jplayer.js --externs jquery.min.js --js_output_file  ../live.min.pritty.js

