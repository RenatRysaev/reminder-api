#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run start:dev
else
  npm run start:prod
fi
