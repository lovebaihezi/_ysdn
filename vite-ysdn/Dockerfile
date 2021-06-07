FROM node:latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production && mv node_modules ../
RUN npm install yarn -g
RUN npm install ts-node -g
COPY . .
EXPOSE 3000
CMD ["yarn", "build", "&&", "yarn", "serve"]
