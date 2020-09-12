#!/bin/bash
echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
docker tag reminder-api_server "${DOCKER_HUB_USER}/reminder-api_server:last"
docker tag postgres:10.4-alpine "${DOCKER_HUB_USER}/reminder-api_postgres:last"
docker push "${DOCKER_HUB_USER}/reminder-api_server:last"
docker push "${DOCKER_HUB_USER}/reminder-api_postgres:last"

eval $(ssh-agent -s)
echo "$DEPLOY_SERVER_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > ~/.ssh/id_rsa
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh -o StrictHostKeyChecking=no deploy@68.183.73.58 "echo 'success connected' && exit"
