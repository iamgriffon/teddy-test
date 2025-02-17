FROM node:22-alpine

RUN apk update && apk add --no-cache procps

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "pnpm", "start:dev" ]