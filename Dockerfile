FROM node:9.5

RUN mkdir /app

COPY package.json /app
COPY bot.js /app

RUN cd /app && npm install

WORKDIR "/app"

CMD [ "node", "bot.js" ]