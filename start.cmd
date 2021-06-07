echo "---please make sure you have npm and yarn!---"
echo "install dep for each dir"
npm install pm2 -g
echo "build main site"
cd vite-ysdn
yarn && yarn build
cd ..
echo "build server"
cd server
npm i
cd src
"init database, it will take a long time"
ts-node init.ts
cd ..
npm run build
cd ..
echo "build admin site"
cd admin-template
yarn
cd ..
echo "use pm2 to start all"
echo "start main"
cd vite-ysdn && pm2 start yarn --name main -- serve && cd ..
echo "start serve"
cd server && pm2 start npm --name server -- run:prod && cd ..
echo "start admin"
echo "username: administrator, password: adminstrator"
cd admin-template && pm2 start yarn --name admin -- start && cd ..
echo "start success!"
echo "use pm2 to check status"
echo "list pm2 list to list all your app"
echo "pm2 stop all to stop them"
