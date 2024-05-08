FROM node:16.19.0

RUN mkdir -p /usr/src/app
RUN chown -R 1001:1001 /usr/src/app

WORKDIR /usr/src/app

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn heroku-postbuild

USER 1001
EXPOSE 8000
