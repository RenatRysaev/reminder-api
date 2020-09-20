#!/bin/bash
#echo "Push images to docker hub"
echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
docker-compose -f docker-compose.yml -f docker-compose.ci.yml build
docker tag reminder-api_server "${DOCKER_HUB_USER}/reminder-api_server:last"
#docker tag postgres:10.4-alpine "${DOCKER_HUB_USER}/reminder-api_postgres:last"

docker push "${DOCKER_HUB_USER}/reminder-api_server:last"
#docker push "${DOCKER_HUB_USER}/reminder-api_postgres:last"

#echo "Connect to VPS and up services"

echo "DOCKER_HUB_USER=${DOCKER_HUB_USER}" > sshenv
echo "DOCKER_HUB_PASSWORD=${DOCKER_HUB_PASSWORD}" >> sshenv

openssl aes-256-cbc -K $encrypted_db2095f63ba3_key -iv $encrypted_db2095f63ba3_iv -in deploy_rsa.enc -out /tmp/deploy_rsa -d
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa
ssh-add /tmp/deploy_rsa
tar -cvzf docker_compose_configs.tar.gz docker-compose.yml docker-compose.prod.yml
scp docker_compose_configs.tar.gz deploy@68.183.73.58:/home/deploy/

ssh deploy@68.183.73.58 bash << EOF
  tar -xzf docker_compose_configs.tar.gz
  echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
EOF

#  git clone https://github.com/RenatRysaev/reminder-api.git && cd reminder-api || cd reminder-api && git pull $TRAVIS_BRANCH
