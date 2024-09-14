#!/bin/bash

brew install awscli
brew install aws-sam-cli

pushd client
npm install
popd

pushd server
npm install
popd
