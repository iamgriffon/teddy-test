FROM node:22-slim

WORKDIR /app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

CMD ["pnpm", "dev", "--host", "0.0.0.0"]  