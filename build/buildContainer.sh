#!/bin/bash

set -e

function clean() {
    rm -rf /app/node_modules
    rm -f /app/packages-lock.json
}

# build container
function buildContainer() {
    echo "Building Container..."
    docker build -t atomy/discord-bot_2w_playtime:latest --no-cache .
    echo "Building PHP Container... DONE"
}

clean
buildContainer

echo "ALL DONE"
