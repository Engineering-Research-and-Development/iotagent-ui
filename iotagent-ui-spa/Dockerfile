FROM node:18 as build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/

ARG env
RUN npm run-script build:prod
FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/iotagent-ui-spa /usr/share/nginx/html/

EXPOSE 80

CMD ["/bin/bash", "-c", \
"echo BFF_API_BASE_URL=[$BFF_API_BASE_URL] && \
sed -i s#BFF_API_BASE_URL#$BFF_API_BASE_URL#g /usr/share/nginx/html/main.*.js && \
nginx -g 'daemon off;'"]
