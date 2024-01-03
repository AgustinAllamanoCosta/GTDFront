yarn install
yarn lint-format
yarn test
yarn cy-run-components
docker build . -t "vite-example"
yarn build
docker run -d --name e2eAppTest -p 8080:8080 vite-example
yarn cy-run-e2e
docker container stop e2eAppTest
docker container rm e2eAppTest