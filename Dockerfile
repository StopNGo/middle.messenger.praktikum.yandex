# Build stage
FROM node:alpine as build-stage
RUN apk update && apk add nodejs && apk add npm

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


# Production stage
FROM node:alpine as production-stage
RUN apk update
RUN apk add nginx
RUN mkdir -p /run/nginx

COPY --from=build-stage /app/dist /var/www/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'


