FROM node:v18.16.0 AS development
WORKDIR /user/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:v18.16.0 AS production
ARG 
WORKDIR /user/src/app
COPY package.json
RUN npm install --only=prod
COPY . .
RUN npm run build
