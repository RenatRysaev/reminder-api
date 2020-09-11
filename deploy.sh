echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USER --password-stdin
docker tag reminder-api_server "${DOCKER_HUB_USER}/reminder-api_server:last"
docker tag reminder-api_postgres "${DOCKER_HUB_USER}/reminder-api_postgres:last"
docker push "${DOCKER_HUB_USER}/reminder-api_server:last"
docker push "${DOCKER_HUB_USER}/reminder-api_postgres:last"
