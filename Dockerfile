FROM node:alpine

COPY public/ /root/public
COPY app/ /root/app
COPY test/ /root/test
COPY package.json /root/package.json

WORKDIR  /root

RUN npm install
RUN npm test

RUN rm -R /root/test

ENTRYPOINT node app
