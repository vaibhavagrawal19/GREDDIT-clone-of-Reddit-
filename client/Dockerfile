FROM node:19.6.0 as build-stage 
WORKDIR /frontend

ENV PATH=/frontend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
COPY . .

RUN npm start

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
# http connection is one-way 
# gotta create web-socket connection
# for 2 way connection