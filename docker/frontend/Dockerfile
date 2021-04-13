FROM node:15.14.0-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf