#!/bin/bash

# Backend setup
cd ./back
pnpm install
cp .env.example .env
cd ..

# Frontend setup
cd ./front
pnpm install
cp .env.example .env
cd ..

# Database setup
docker exec -it postgres psql -U sa -d root -c "CREATE DATABASE teddy;"
docker exec -it postgres psql -U sa -d root -c "CREATE DATABASE teddy_test;"

# Force reinstall and restart containers
docker exec -it front sh -c "pnpm install --force" && docker restart front
docker exec -it back sh -c "pnpm install --force" && docker restart back
