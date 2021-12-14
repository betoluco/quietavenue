#!/usr/bin/env bash

cd code
npm run prod
cd ..
sam build
sam deploy