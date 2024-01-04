yarn install
yarn lint-format
yarn test
yarn cy-run-components
docker build . -t "vite-example"
yarn build
docker-compose up -d
yarn cy-run-e2e
docker-compose down
