#!/bin/bash

git add .
git commit -m 'deploy script'
git push origin main
npm run deploy
