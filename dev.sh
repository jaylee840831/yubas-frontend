#!/bin/sh

IMAGE_NAME=yubas-frontend
CONTAINER_NAME=yubas-frontend-container
DOCKERFILE=docker_build/Dockerfile.dev

# Git Bash on Windows 必備
export MSYS_NO_PATHCONV=1

echo "Building Docker image..."
docker build -f $DOCKERFILE -t $IMAGE_NAME .

if [ $? -ne 0 ]; then
  echo "Docker build failed"
  exit 1
fi

# 如果 container 已存在就刪掉
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "Removing existing container..."
  docker rm -f $CONTAINER_NAME
fi

echo "Running Angular container..."

docker run -it --rm \
  --name $CONTAINER_NAME \
  -p 4200:4200 \
  -v "$(pwd -W)":/app \
  -v node_modules:/app/node_modules \
  -w /app \
  $IMAGE_NAME \
  sh -c "npm install && ng serve --host 0.0.0.0 --poll 2000"