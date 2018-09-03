#!/bin/sh

rm -rf output
rm -rf build

rsync -av ./ build/ --exclude=build.sh --exclude=.git --exclude=.gitignore --exclude=README.md

mkdir output
cd build
zip -r ../output/release ./

cd ../
rm -rf build
