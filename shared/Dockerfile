FROM node:14@sha256:9025a77b2f37fcda3bbd367587367a9f2251d16a756ed544550b8a571e16a653

ENV TZ=Europe/Helsinki

# The base dependencies

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY types ./types

WORKDIR /usr/src/app/types
RUN npm ci && npm run tsc


WORKDIR /usr/src/app
COPY shared ./shared
COPY package.json package-lock.json tsconfig.json ./

RUN npm ci

RUN npm run tsc
