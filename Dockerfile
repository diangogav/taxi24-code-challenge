FROM node:18.16.0-alpine as builder

ADD package.json /usr/src/
ADD package-lock.json /usr/src

WORKDIR /usr/src

RUN npm i

ADD . /usr/src

EXPOSE 3000

CMD ["npm", "start"]