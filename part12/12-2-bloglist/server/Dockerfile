FROM node:16

USER node
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

CMD npm start

# docker build -t server . && docker run -p 3003:3003 server