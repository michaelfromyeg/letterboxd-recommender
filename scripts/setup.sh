#!/bin/bash

brew install jq
brew install awscli
brew install aws-sam-cli

pushd client
npm install
popd

pushd server
npm install
popd
