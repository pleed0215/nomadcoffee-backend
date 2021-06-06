FROM node:14.16.0-alpine
EXPOSE 3000:3000
WORKDIR /home/app
ADD . /home/app/

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --legacy-peer-deps
RUN npx prisma migrate production
RUN npx prisma generate
RUN npm run build

CMD npm start
