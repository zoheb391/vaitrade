FROM node:8.4

ADD ./src /usr/src/app

WORKDIR /usr/src/app/

RUN yarn install

EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
