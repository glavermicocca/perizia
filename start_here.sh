#!/bin/bash

#generazione immagine docker container
docker build -t glavermi/hyperapi .

#generazione swarm
docker stack deploy -c docker-compose.yml hyperapi_service

# MANUALE
# docker run -p 80:80 -d -it --name hyperapi --restart unless-stopped --log-driver journald glavermi/hyperapi