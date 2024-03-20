FROM node:21

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000 3306

CMD ["pnpm", "run", "start:dev"]