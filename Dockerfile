FROM node:18-alpine AS build

RUN addgroup --system nonrootgroup
RUN adduser --system nonroot --ingroup nonrootgroup

USER nonroot:nonrootgroup

WORKDIR /app

COPY package.json .

RUN yarn install --ignore-scripts

COPY . /app/

EXPOSE 8080
CMD ["yarn","dev"]