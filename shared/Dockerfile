FROM node:14@sha256:9025a77b2f37fcda3bbd367587367a9f2251d16a756ed544550b8a571e16a653

ENV TZ=Europe/Helsinki

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy and build the types package, needed due to runtime enums
COPY types ./types
WORKDIR /usr/src/app/types
RUN npm ci && npm run tsc

# Copy he base dependency manifests and install dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

# Copy the shared source code
WORKDIR /usr/src/app
COPY shared ./shared

# Copy the different ipc-methods, all of them need to be listed here
COPY benchmark ./benchmark
COPY ipc-http ./ipc-http
COPY ipc-http-express-axios ./ipc-http-express-axios


# Transpile TypeScript to JavaScript
RUN npm run tsc
