FROM node:lts-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

ARG ENV_FILE=.env
COPY enviroments/${ENV_FILE} ./.env

# Building app

EXPOSE 8080/tcp

# Running the app
CMD [ "npm", "run", "dev" ]
