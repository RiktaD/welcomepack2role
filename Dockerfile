FROM node:lts-alpine3.14

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY dist/ /usr/src/bot/dist
COPY package-lock.json /usr/src/bot
COPY package.json /usr/src/bot
RUN npm ci
COPY .env* /usr/src/bot

CMD ["node", "dist/index.js"]
