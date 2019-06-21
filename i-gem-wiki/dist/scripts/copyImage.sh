#!/bin/bash
IMGPATH="/mnt/c/Users/Jonas/Informatik/Team_Potsdam_2019/i-gem-wiki/public/"
F1=${2:13:2}
F2=${2:15:3}
mkdir "$IMGPATH/wiki/images/$F1"
mkdir "$IMGPATH/wiki/images/$F1$F2"
cp $1 "$IMGPATH$2"
