#!/bin/bash

#run from root
#"npm install @render/cli"  should be installed and configured with your render account in your system before running


CUSTOM_ROOT_FOLDER="./backend/"

CUSTOM_BUILD_COMMAND="node index.js"

echo "$CUSTOM_ROOT_FOLDER/" > .renderignore

$CUSTOM_BUILD_COMMAND

render deploy --build-env NODE_ENV=production

rm -f .renderignore
