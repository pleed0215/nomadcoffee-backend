FROM node:14.16.0-alpine
EXPOSE 3000:3000
WORKDIR /home/app
ADD . /home/app/

RUN apk --no-cache add --virtual builds-deps build-base python
RUN apt-get update
RUN apt-get yarn
RUN yarn install

CMD yarn run container
