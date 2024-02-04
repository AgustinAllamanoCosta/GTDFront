yarn install
yarn lint-format
docker run \
    --rm \
    -v "./:/usr/src" \
    sonarsource/sonar-scanner-cli
yarn test
yarn cy-run-components
docker-compose down
yarn build
docker build . -t "vite-example"
docker-compose up -d
yarn cy-run-e2e
yarn cy-run-e2e-mobile
docker-compose down
