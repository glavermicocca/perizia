FROM archlinux/base

# Create app directory
WORKDIR /ServerApp

RUN pacman -Syyu --noconfirm && pacman -S --noconfirm nodejs npm

# Bundle app source
COPY ./ServerApp/ .

RUN npm install

EXPOSE 3000
CMD [ "node", "server.js" ]