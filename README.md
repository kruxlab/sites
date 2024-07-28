# SITES

To start:

docker network create proxy-network
docker-compose up -d

To stop:

docker-compose down
cd websites/site1 && docker-compose down
docker network rm proxy-network