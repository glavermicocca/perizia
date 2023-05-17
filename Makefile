	
docker:
	docker-compose up --force-recreate --build -d
	docker-compose push
	