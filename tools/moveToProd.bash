#!/bin/bash

# Check if exactly one argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

# Assign the argument to a variable
filename=$1

# Move the species file
mv "./dist/species/${filename}" "../src/cms/content/species"

# Check if any files match the wildcard pattern before moving them
shopt -s nullglob
files=(./dist/pictures/${filename}-*)
shopt -u nullglob

if [ ${#files[@]} -gt 0 ]; then
    mv "${files[@]}" "../static/img"
else
    echo "No files matching ${filename}-* found in ./dist/pictures/"
fi
