#!/bin/bash -eu

echo "Postgresqlを起動します"
(
  docker-compose up -d
)
echo "起動完了しました。"
