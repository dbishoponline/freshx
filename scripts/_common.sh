#!/bin/bash

# function build() {
#   if ! babel --presets @babel/preset-env -d dist/ src/ ; then
#     echo 'Error: Unable to compile the source files to dist/'
#   fi
# }
build() {
  if ! babel src --out-dir dist ; then
    echo 'Error: Unable to compile the source files to dist/'
    exit 1
  fi
}

debug() {
  if ! node --inspect-brk ./dist/index.js ; then
    echo 'Error: Unable to start the debugger...'
    exit 1
  fi
}

test() {
  if ! nyc --reporter=lcov --reporter=text-lcov ava --watch --verbose ; then
    echo 'Error: Unable to start test runner...'
    exit 1
  fi
}
