FROM node:16.19.0

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8000
