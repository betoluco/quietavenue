#!/usr/bin/env bash

cd code
npm run dev
cd ..
sam build
sam local start-api -p 8080