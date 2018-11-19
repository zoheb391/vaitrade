FROM node:8.4

ADD ./src /usr/src/app

WORKDIR /usr/src/app/

RUN yarn install

ENTRYPOINT ["yarn", "start"]
