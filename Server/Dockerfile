FROM node:18

WORKDIR /server

COPY package*.json .
RUN npm install
COPY . .
CMD node index.js