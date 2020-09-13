echo 'success connected'
echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
docker-compose -f ./docker-compose.prod.yml up -d
