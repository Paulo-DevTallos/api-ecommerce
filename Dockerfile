FROM node:16-alpine

WORKDIR /home/app/api-ecommerce

COPY package.json .

RUN npm install

EXPOSE 3030

