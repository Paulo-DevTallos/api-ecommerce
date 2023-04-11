FROM node:16

WORKDIR /home/app/api-ecommerce

COPY ./package.json .

RUN npm install --production

EXPOSE 3030
