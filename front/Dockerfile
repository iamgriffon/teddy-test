FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN rm -rf node_modules

RUN pnpm install

COPY . .

CMD ["pnpm", "dev", "--host", "0.0.0.0"]  