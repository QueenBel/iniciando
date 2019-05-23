FROM node:latest

RUN mkdir /app
WORKDIR /app
COPY package.json /app/

RUN npm install

RUN npm install mongoose


CMD [ "npm", "start" ]
