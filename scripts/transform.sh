#!/bin/bash

# include common functions
source "./scripts/_common.sh"

build

# compile the project
node dist/index.js $1
