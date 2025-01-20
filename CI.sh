echo '--------------------------'
echo 'Starting local CI pipeline'
echo '--------------------------'
echo '=========================='
echo '=Cleaning environment    ='
echo '=========================='
docker-compose down
docker image rm vite-example
rm -r testCov
rm -r node_modules
rm -r ./dist
echo '=========================='
echo '=Pulling CI configuration='
echo '=========================='
yarn vault-pull CI .env --yes
echo '=========================='
echo '=Installing project dep  ='
echo '=========================='
yarn install
echo '=========================='
echo '=Running linting on code ='
echo '=Running snapshot test   ='
echo '=Running component test  ='
echo '=========================='
yarn lint-format >> format_log &
yarn test >> snapshot_log &
yarn cy-run-components >> component_log &
wait
cat ./format_log
cat ./snapshot_log
cat ./component_log
rm ./format_log
rm ./snapshot_log
rm ./component_log
echo '=========================='
echo '=Creating new build      ='
echo '=========================='
yarn build
docker build . -t "vite-example"
echo '=========================='
echo '=Creating app container  ='
echo '=========================='
docker-compose up -d
echo '=========================='
echo '=Running test e2e        ='
echo '=========================='
yarn cy-run-e2e &
yarn cy-run-e2e-mobile &
wait
echo '=========================='
echo '=Cleaning environment    ='
echo '=========================='
docker-compose down
docker image rm vite-example
yarn vault-pull development .env --yes
rm -r testCov
rm -r ./dist
echo '--------------------------'
echo 'End of execution          '
echo '--------------------------'
