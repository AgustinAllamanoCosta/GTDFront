FROM node:18-alpine as build

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . /app/

EXPOSE 8080
CMD ["yarn","dev"]