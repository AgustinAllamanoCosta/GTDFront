yarn install
yarn lint-format
yarn test
yarn cy-run-components
docker-compose down
yarn build
docker build . -t "vite-example"
docker-compose up -d
yarn cy-run-e2e
docker-compose down
