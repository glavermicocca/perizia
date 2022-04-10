FROM node:lts-slim AS ui-build
WORKDIR /app
COPY ./WebApp/ ./WebApp/
#ARG NODE_OPTIONS=--max_old_space_size=94096
RUN cd WebApp && npm install &&\
    npm cache clean --force &&\ 
    npm run build

FROM node:lts-slim AS server-build
WORKDIR /root

COPY ./ServerApp/package.json /root/ServerApp/
## parte SERVER installa package.json
RUN cd /root/ServerApp &&\
    npm install

COPY --from=ui-build /app/WebApp/build /root/ServerApp/build

## copia il codice sorgente
COPY ./ServerApp/controllers/* /root/ServerApp/controllers/
COPY ./ServerApp/server.js /root/ServerApp/
COPY ./ServerApp/.env /root/ServerApp/

EXPOSE 3000

CMD ["node", "/root/ServerApp/server.js"]
