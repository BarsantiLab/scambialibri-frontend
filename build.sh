#!/bin/sh

DATE=$(date +"%Y-%m-%d_%H_%M")

rm -rf dist
npm run build
tar czf scambialibri-frontend-$DATE.tar.gz dist/
scp scambialibri-frontend-$DATE.tar.gz root@iamdavi.de:~/projects/scambialibri-frontend/releases
ssh root@iamdavi.de -t "cd ~/projects/scambialibri-frontend/; rm -rf dist; tar xzf ./releases/scambialibri-frontend-$DATE.tar.gz"
rm -f scambialibri-frontend-$DATE.tar.gz