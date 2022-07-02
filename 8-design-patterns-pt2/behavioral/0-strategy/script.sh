docker run \
  --name postgres \
  -e POSTGRES_USER=vinicius \
  -e POSTGRES_PASSWORD=vinicius \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker logs postgres
docker exec -it postgres psql --username vinicius --password vinicius --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR(255) NOT NULL);
SELECT * FROM warriors;

# mongodb

docker run \
  --name mongodb \
  -e MONGODB_INITDB_ROOT_USERNAME=vinicius \
  -e MONGODB_INITDB_ROOT_PASSWORD=vinicius \
  -p 27017:27017 \
  -d \
  mongo:4

docker logs mongodb