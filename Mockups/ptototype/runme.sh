#!/bin/bash

#SIMPLE_OPTIMIZATIONS
#ADVANCED_OPTIMIZATIONS

#jquery-1.6.2.js
#jquery.jplayer.js
#jquery.pulse.js

cd lib

java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS --js ../live.js --js jquery.pulse.js --externs jquery.jplayer.min.js --externs jquery.min.js --js_output_file  ../live.min.js

#java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS --js ../live.js --js jquery.pulse.js --js jquery.jplayer.js --js jquery-1.6.2.js --js_output_file  ../live.jquery.min.js

#java -jar compiler.jar  --compilation_level=ADVANCED_OPTIMIZATIONS  --formatting PRETTY_PRINT --js ../live.js --js jquery.pulse.js --js jquery.jplayer.js --externs jquery.min.js --js_output_file  ../live.min.pritty.js

