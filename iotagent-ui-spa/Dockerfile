FROM node:18 as build
WORKDIR /app
COPY package.json /app/
RUN npm install --force --no-package-lock
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
echo APP_BASE_HREF=[$APP_BASE_HREF] && \
sed -i s#BFF_API_BASE_URL#$BFF_API_BASE_URL#g /usr/share/nginx/html/main.*.js && \
sed -i s#APP_BASE_HREF#$APP_BASE_HREF#g /usr/share/nginx/html/index.html && \
sed -i s#KEYCLOAK_URL#$KEYCLOAK_URL#g /usr/share/nginx/html/main.*.js && \
sed -i s#KEYCLOAK_REALM#$KEYCLOAK_REALM#g /usr/share/nginx/html/main.*.js && \
sed -i s#KEYCLOAK_CLIENT_ID#$KEYCLOAK_CLIENT_ID#g /usr/share/nginx/html/main.*.js && \
sed -i s#KEYCLOAK_REDIRECT_URI#$KEYCLOAK_REDIRECT_URI#g /usr/share/nginx/html/main.*.js && \
nginx -g 'daemon off;'"]
