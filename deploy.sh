#!/bin/bash
echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
docker tag remider-api_server "${$DOCKER_HUB_USER}/reminder-api_server:last"
docker push "${$DOCKER_HUB_USER}/reminder-api_server:last"
