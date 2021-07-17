# C7 - coding 6+

## How to start the dev environment
```
docker-compose up --build
```
Then go to `localhost:3000`.

### To build the production version
```
cd client && npm run dev

cd ../server && npm start
```


### How it works
The server code serves both API and webpage. In development mode, we get the webpage from webpac dev server and call the api server for apis.

#### In dev
Use `docker-compose` to start two docker containers
* client (React dev mode with webpack hot loading source code).
* api (serving apis with nodemon)
* they will communicate with the proxy setting in `client/package.json`. But this is not true for production. In production they communicate without proxy - built code doesn't know proxy.

#### In production
* client code is built with react build
* server code is uploaded to app engine and will serve static files from `client/build`.

## Architecture

client -> api (gateway) -> judger

## Milestones

### 1. A code playground
* Code evaluation (DONE)
* CI/CD
* Language selection
* Code persistence on local storage
* E2E testing
* Deployment

### 2. A online judgement with list of questions
* Online judger - piston container
* Leetcode questions - with test cases

### 3. User authentication with history tracking