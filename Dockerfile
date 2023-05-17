# Common build stage
FROM archlinux:base as common-build-stage

RUN pacman -Syyu --noconfirm && pacman -S --noconfirm nodejs-lts-gallium npm

WORKDIR /app

COPY ./Service/package.json /app
RUN npm install
COPY ./Service /app

# ---------------- START HERE ----------------

EXPOSE 3000
WORKDIR /app

CMD ["npm", "start"]
