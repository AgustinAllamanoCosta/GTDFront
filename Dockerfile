FROM node:18-alpine AS build

USER nonroot

WORKDIR /app

COPY package.json .

RUN yarn install --ignore-scripts

COPY . /app/

EXPOSE 8080
CMD ["yarn","dev"]