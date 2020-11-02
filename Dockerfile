FROM node:10-alpine

WORKDIR /app

RUN apk upgrade -U \
  && apk add ca-certificates ffmpeg libva-intel-driver \
  && rm -rf /var/cache/*

COPY . /app

COPY package.json package.json

COPY yarn.lock yarn.lock

RUN yarn install --silent

RUN yarn global add nodemon

RUN yarn global add pm2

RUN which ffmpeg

EXPOSE 8000

EXPOSE 1935

ENV PM2_PUBLIC_KEY cqbdc12gzntshgl
ENV PM2_SECRET_KEY dc664de7cm1igyk

CMD ["pm2-runtime", "app.js"]