#!/bin/sh

rm -rf output
rm -rf build

rsync -av ./ build/ --exclude=build.sh --exclude=.git --exclude=.gitignore

mkdir output
cd build
zip -r ../output/release ./

cd ../
rm -rf build
