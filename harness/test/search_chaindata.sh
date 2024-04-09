#!/bin/bash

cd $(git rev-parse --show-toplevel)

cd harness
source .env

node dist/cli/index.js search --provider $PROVIDER_URI_11155111 --include 5658516 --samples 32 --output ../../output
# node dist/cli/index.js search --provider $PROVIDER_URI_84532 --include 8285121 --output ../../output
