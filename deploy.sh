#!/bin/bash
echo "Push images to docker hub"
echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
docker tag reminder-api_server "${DOCKER_HUB_USER}/reminder-api_server:last"
docker tag postgres:10.4-alpine "${DOCKER_HUB_USER}/reminder-api_postgres:last"
docker push "${DOCKER_HUB_USER}/reminder-api_server:last"
docker push "${DOCKER_HUB_USER}/reminder-api_postgres:last"

echo "Connect to VPS and up services"
openssl aes-256-cbc -K $encrypted_db2095f63ba3_key -iv $encrypted_db2095f63ba3_iv -in deploy_rsa.enc -out /tmp/deploy_rsa -d
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa
ssh-add /tmp/deploy_rsa
ssh deploy@68.183.73.58 bash ./up.sh
