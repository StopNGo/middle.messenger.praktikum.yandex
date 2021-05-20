# Build stage
FROM ubuntu:20.04 as build-stage
RUN apt update && apt install -y nodejs && apt install -y npm

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


# Production stage
FROM ubuntu:20.04 as production-stage
RUN apt-get update
RUN apt-get install nginx -y

COPY --from=build-stage /app/dist /var/www/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx","-g","daemon off;"]


