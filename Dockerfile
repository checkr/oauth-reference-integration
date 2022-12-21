FROM node:16.19.0

WORKDIR /usr/src/app

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn heroku-postbuild

EXPOSE 8000
