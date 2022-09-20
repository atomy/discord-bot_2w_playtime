FROM node:18-alpine

RUN apk add --update icu-data-full npm
RUN npm install -g npm

RUN mkdir /app

COPY package.json /app
COPY bot.js /app

RUN cd /app && npm install

WORKDIR "/app"

CMD [ "node", "bot.js" ]