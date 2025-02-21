cd ./back && pnpm install && cd ../front && pnpm install && cd ..
docker exec -it postgres psql -U sa -d root -c "CREATE DATABASE teddy;"
docker exec -it postgres psql -U sa -d root -c "CREATE DATABASE teddy_test;"
docker exec -it front sh -c "pnpm install --force" && docker restart front
docker exec -it back sh -c "pnpm install --force" && docker restart back