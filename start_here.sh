#!/bin/bash

#generazione immagine docker container
docker build -t glavermi/hyperapi .

#generazione swarm
docker stack deploy -c docker-compose.yml hyperapi_service

# MANUALE
# docker run -p 80:80 -d -it --name hyperapi --restart unless-stopped --log-driver journald glavermi/hyperapi

## build   docker build -t react-perizia .
## run     docker run --name react-perizia-container -p 3000:3000 --rm -i -t react-perizia

# Interagisce con la macchina docker appena runnata
## docker exec -it react-perizia-container bash