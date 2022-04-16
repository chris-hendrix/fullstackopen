FROM node:16

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

CMD npm start

# docker run --name=redis-devel --publish=6379:6379 --hostname=redis --restart=on-failure --detach redis:latest
# docker build -t express-server . && docker run -p 3000:3000 express-server
# https://stackoverflow.com/questions/33675914/redis-docker-connection-refused