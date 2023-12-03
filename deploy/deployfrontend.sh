#!/bin/bash

#run from root
#"npm install -g vercel" should be installed and configured with your render account in your system before running

CUSTOM_ROOT_FOLDER="./frontend/home/"


echo "$CUSTOM_ROOT_FOLDER/" > .renderignore



vercel --prod --confirm


rm -f .vercelignore
