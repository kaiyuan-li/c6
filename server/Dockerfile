FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

CMD npm config set cache-min 9999999 && \
    npm install && \
    npm run start:dev