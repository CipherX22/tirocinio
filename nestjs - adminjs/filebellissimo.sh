sudo docker run -d --name db \
  -p 3000:3000 \
  -e DB_HOST=127.0.0.1 \
  -e DB_PORT=3306 \
  -e DB_USER=francesco \
  -e DB_PASSWORD=password \
  -e DB_DATABASE=Tirocinio \
  -e MARIADB_ROOT_PASSWORD=root \
  mariadb
