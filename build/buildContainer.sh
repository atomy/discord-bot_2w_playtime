#!/bin/bash

set -e

IS_DEV=0

if [ "" != "${1}" ] ; then
  if [ "dev" == "${1}" ] ; then
    IS_DEV=1
  else
    echo "ERROR: Invalid env \"${1}\" given!"
    exit 1
  fi
fi

function clean() {
    rm -rf /app/node_modules
    rm -f /app/packages-lock.json
}

# build container
function buildContainer() {
  if [ ${IS_DEV} -eq 1 ] ; then
    echo "Building Container (dev)..."
    docker build -t atomy/discord-bot_2w_playtime:latest --no-cache .
    docker run -v "$(pwd):/app" atomy/discord-bot_2w_playtime:latest npm install
    echo "Building PHP Container (dev)... DONE"
  else
    echo "Building Container..."
    docker build -t atomy/discord-bot_2w_playtime:latest --no-cache .
    echo "Building PHP Container... DONE"
  fi
}

clean
buildContainer

echo "ALL DONE"
