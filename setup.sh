cd ./back && pnpm install && cp .env.example .env
cd ../front && pnpm install && cp .env.example .env
docker exec -it postgres psql -U sa -d root -c "CREATE DATABASE teddy;"
docker exec -it postgres psql -U sa -d root -c "CREATE DATABASE teddy_test;"
docker exec -it front sh -c "pnpm install --force" && docker restart front
docker exec -it back sh -c "pnpm install --force" && docker restart back