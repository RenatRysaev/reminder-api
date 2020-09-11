wget -qO- https://toolbelt.heroku.com/install.sh | sh
docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com
docker tag reminderapi:latest registry.heroku.com/reminderapi/web
docker push registry.heroku.com/reminderapi/web
