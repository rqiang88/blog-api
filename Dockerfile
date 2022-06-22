FROM node
RUN rm -rf blog-api && mkdir blog-api
WORKDIR /blog-api

COPY . /blog-api
RUN yarn install
EXPOSE 8086
