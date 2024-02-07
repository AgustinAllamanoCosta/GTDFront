FROM node:18-alpine AS build

RUN addgroup --system nonrootgroup
RUN adduser --system nonroot --ingroup nonrootgroup
WORKDIR /app
RUN chown -R nonroot:nonrootgroup /app
RUN chmod 755 /app

USER nonroot:nonrootgroup

COPY package.json .

RUN yarn install --ignore-scripts

COPY . /app/

EXPOSE 8080
CMD ["yarn","dev"]