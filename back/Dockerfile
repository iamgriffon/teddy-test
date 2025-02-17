FROM node:22-slim

RUN apt-get update && apt-get install -y procps

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 8080

CMD [ "pnpm", "start:dev" ]