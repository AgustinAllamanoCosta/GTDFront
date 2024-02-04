FROM node:18-alpine AS build

WORKDIR /app

COPY package.json .

RUN yarn install --ignore-scripts

COPY . /app/

EXPOSE 8080
CMD ["yarn","dev"]