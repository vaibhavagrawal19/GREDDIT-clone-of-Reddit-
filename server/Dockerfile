FROM node:19.6.0
# set the working directory 
# of the container 
# path from the root dir 
WORKDIR /backend 

ENV PATH=/backend/node_modules/.bin:$PATH

COPY package.json .
RUN node server.js
# copy the files 
COPY . .
# 
EXPOSE 4000
CMD npm start