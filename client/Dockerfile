FROM node:16-alpine

WORKDIR /usr/src/app

EXPOSE 3000

COPY package.json ./
COPY yarn.lock ./

CMD npm config set cache-min 9999999 && npm i && yarn start